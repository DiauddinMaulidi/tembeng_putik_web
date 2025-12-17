// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const PDFDocument = require("pdfkit");
const fs = require("fs");
// const authRoutes = require("./routes/auth");

dotenv.config()
const app = express();
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use("/", authRoutes);


const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-yang-sangat-rahasia';

// static file
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// === MULTER UPLOAD STORAGE ===
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public/assets"));
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + file.originalname;
        cb(null, unique);
    }
});

const upload = multer({ storage });


// === MYSQL CONNECTION ===
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_warga",
    dateStrings: true
});

const promiseConn = db.promise();


app.post('/register', async (req, res) => {
    const { nama, username, password } = req.body;

    // 1. Validasi Input Dasar
    if (!nama || !username || !password) {
        return res.status(400).json({ message: 'Harap lengkapi semua field.' });
    }

    try {
        // 2. Cek apakah Username sudah ada (Unique Check)
        const [users] = await promiseConn.query(
            'SELECT username FROM users WHERE username = ?',
            [username]
        );

        if (users.length > 0) {
            return res.status(400).json({ message: 'Username sudah digunakan.' });
        }

        // 3. Hash Password menggunakan bcryptjs
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Simpan Pengguna Baru ke MySQL
        const insertQuery = `
            INSERT INTO users (nama, username, password)
            VALUES (?, ?, ?)
        `;
        const [result] = await promiseConn.query(insertQuery, [
            nama,
            username,
            hashedPassword, // Menyimpan HASH password
        ]);

        // 5. Respon Sukses
        res.status(201).json({
            message: 'Pengguna berhasil terdaftar.',
            userId: result.insertId
        });

    } catch (error) {
        res.status(500).json({ message: 'Kesalahan Server Internal.' });
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Cari pengguna di database
        const [users] = await promiseConn.query(
            'SELECT id, username, password, nama FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const user = users[0];

        // 2. Bandingkan hash password (Menggunakan bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // 3. Jika berhasil, buat JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            // 4. Kirim token kembali ke frontend
            return res.status(200).json({
                message: 'Login berhasil',
                token: token
            });
        } else {
            // 5. Jika password tidak cocok
            return res.status(401).json({
                message: 'Username atau password salah'
            });
        }

    } catch (error) {
        res.status(500).json({ message: 'Kesalahan Server Internal.' });
    }
});

app.get("/me", require("./middleware/verifyToken"), async (req, res) => {
    try {
        const [users] = await promiseConn.query(
            "SELECT id, username, nama FROM users WHERE id = ?",
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// =========================================
//              CRUD PENDUDUK
// =========================================

// GET semua penduduk
app.get("/penduduk_tembeng", (req, res) => {
    db.query("SELECT * FROM penduduk_tembeng", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get("/penduduk_tembeng/perPendidikan", (req, res) => {
    db.query("SELECT PENDIDIKAN_TERAKHIR as pendidikan, COUNT(*) AS jumlah FROM penduduk_tembeng GROUP BY PENDIDIKAN_TERAKHIR", (err, result) => {
        if (err) throw err;
        const data = result.map(item => ({
            name: item.pendidikan,
            value: item.jumlah
        }));

        res.json(data);
    });
});

app.get("/penduduk_tembeng/perPekerjaan", (req, res) => {
    db.query("SELECT PEKERJAAN as pekerjaan, COUNT(*) AS jumlah FROM penduduk_tembeng GROUP BY PEKERJAAN ORDER BY jumlah DESC", (err, result) => {
        if (err) throw err;
        const data = result.map(item => ({
            name: item.pekerjaan,
            value: item.jumlah
        }));

        res.json(data);
    });
});

app.get("/penduduk_tembeng/perPerkawinan", (req, res) => {
    db.query("SELECT STATUS_PERKAWINAN as status, COUNT(*) AS jumlah FROM penduduk_tembeng GROUP BY STATUS_PERKAWINAN", (err, result) => {
        if (err) throw err;
        const data = result.map(item => ({
            name: item.status,
            value: item.jumlah
        }));

        res.json(data);
    });
});


// summary
app.get("/penduduk_tembeng/sum", (req, res) => {
    db.query("SELECT KEDUDUKAN_DALAM_KELUARGA, JENIS_KELAMIN, NOMOR_KK FROM penduduk_tembeng", (err, result) => {
        if (err) throw err;

        const totalPenduduk = result.length;
        const totalKK = new Set(result.map(r => r["NOMOR_KK"])).size;
        const totalLaki = result.filter(r => r["JENIS_KELAMIN"] === "LAKI-LAKI").length;
        const totalPr = result.filter(r => r["JENIS_KELAMIN"] === "PEREMPUAN").length;

        res.json({
            totalPenduduk: totalPenduduk.toLocaleString("id-ID"),
            totalKK: totalKK.toLocaleString("id-ID"),
            totalLaki: totalLaki.toLocaleString("id-ID"),
            totalPr: totalPr.toLocaleString("id-ID")
        });
    });
});


// GET edit table data penduduk
app.get("/penduduk_tembeng/edit/:id", (req, res) => {
    db.query("SELECT * FROM penduduk_tembeng WHERE id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.json(result[0]);
    });
});

// POST penduduk
app.post("/penduduk_tembeng", (req, res) => {
    const {
        nama, jenisKelamin, statusPerkawinan, tempatLahir, tanggalLahir,
        agama, pendidikan, pekerjaan, kewarganegaraan, alamat,
        kedudukan, nik, nomorKK, ket
    } = req.body;

    db.query(
        `INSERT INTO penduduk_tembeng (
            NAMA_LENGKAP, JENIS_KELAMIN, STATUS_PERKAWINAN, TEMPAT_LAHIR,
            TANGGAL_LAHIR, AGAMA, PENDIDIKAN_TERAKHIR, PEKERJAAN,
            KEWARGANEGARAAN, ALAMAT_LENGKAP, KEDUDUKAN_DALAM_KELUARGA,
            NIK, NOMOR_KK, KETERANGAN
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nama, jenisKelamin, statusPerkawinan, tempatLahir, tanggalLahir,
            agama, pendidikan, pekerjaan, kewarganegaraan, alamat,
            kedudukan, nik, nomorKK, ket
        ],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId });
        }
    );
});

// PUT update penduduk
app.put("/penduduk_tembeng/:id", (req, res) => {
    const {
        nama, jenisKelamin, statusPerkawinan, tempatLahir, tanggalLahir,
        agama, pendidikan, pekerjaan, kewarganegaraan, alamat,
        kedudukan, nik, nomorKK, ket
    } = req.body;

    db.query(
        `UPDATE penduduk_tembeng SET
            NAMA_LENGKAP=?, JENIS_KELAMIN=?, STATUS_PERKAWINAN=?,
            TEMPAT_LAHIR=?, TANGGAL_LAHIR=?, AGAMA=?, PENDIDIKAN_TERAKHIR=?,
            PEKERJAAN=?, KEWARGANEGARAAN=?, ALAMAT_LENGKAP=?, KEDUDUKAN_DALAM_KELUARGA=?,
            NIK=?, NOMOR_KK=?, KETERANGAN=?
         WHERE id=?`,
        [
            nama, jenisKelamin, statusPerkawinan, tempatLahir, tanggalLahir,
            agama, pendidikan, pekerjaan, kewarganegaraan, alamat,
            kedudukan, nik, nomorKK, ket, req.params.id
        ],
        (err) => {
            if (err) throw err;
            res.json({ success: true });
        }
    );
});

// DELETE penduduk
app.delete("/penduduk_tembeng/:id", (req, res) => {
    db.query("DELETE FROM penduduk_tembeng WHERE id=?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// =========================================
//                 PENDIDIKAN
// =========================================

app.get("/pendidikan", (req, res) => {
    db.query("SELECT * FROM pendidikan", (err, result) => {
        if (err) alert("sekolah kosong")
        res.json(result)
    })
})

app.get("/pendidikan/sum", (req, res) => {
    db.query("SELECT nama_sekolah FROM pendidikan", (err, result) => {
        if (err) throw err;

        const totalSekolah = result.length;

        res.json(totalSekolah);
    })
})

app.get("/pendidikan/edit/:id", (req, res) => {
    db.query("SELECT * FROM pendidikan WHERE id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: "Data sekolah tidak ditemukan" });
        }
        res.json(result[0]);
    });
});

app.post("/pendidikan", (req, res) => {
    const { namaSekolah, kepsek, totalSiswa, totalLaki, totalPr, statusSekolah, jumlahGuru } = req.body;

    db.query("INSERT INTO pendidikan ( nama_sekolah, kepsek, total_siswa, total_laki, total_perempuan, status_sekolah, jumlah_guru ) VALUES (?, ?, ?, ?, ?, ?, ?)", [namaSekolah, kepsek, totalSiswa, totalLaki, totalPr, statusSekolah, jumlahGuru], (err, result) => {
        if (err) throw err;
        res.json({ id: result.id })
    })
})

app.put("/pendidikan/edit/:id", (req, res) => {
    const {
        namaSekolah, kepsek, totalSiswa, totalLaki, totalPerempuan, statusSekolah, jumlahGuru
    } = req.body;

    db.query(
        `UPDATE pendidikan SET
            nama_sekolah=?, kepsek=?, total_siswa=?, total_laki=?, total_perempuan=?, status_sekolah=?, jumlah_guru=?
         WHERE id=?`,
        [
            namaSekolah, kepsek, totalSiswa, totalLaki, totalPerempuan, statusSekolah, jumlahGuru, req.params.id
        ],
        (err) => {
            if (err) throw err;
            res.json({ success: true });
        }
    );
});

app.delete("/pendidikan/:id", (req, res) => {
    db.query("DELETE FROM pendidikan WHERE id=?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// =========================================
//                CRUD KESEHATAN
// =========================================
app.get("/kesehatan/admin", (req, res) => {
    db.query(
        "SELECT * FROM kesehatan",
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
});

app.get("/kesehatan", (req, res) => {
    const sql = `SELECT jenis_data, nama_dusun, total FROM kesehatan ORDER BY jenis_data
  `;

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json(err);

        const grouped = {};

        rows.forEach(r => {
            if (!grouped[r.jenis_data]) {
                grouped[r.jenis_data] = {
                    nama: r.jenis_data,
                    jumlah: 0,
                    dusun: []
                };
            }

            grouped[r.jenis_data].jumlah += r.total;
            grouped[r.jenis_data].dusun.push({
                name: r.nama_dusun,
                value: r.total
            });
        });

        res.json(Object.values(grouped));
    });
});

app.get("/kesehatan/sum", (req, res) => {
    db.query("SELECT DISTINCT jenis_data FROM kesehatan", (err, result) => {
        if (err) throw err;

        const totalDataKesehatan = result.length;

        res.json(totalDataKesehatan);
    })
})

app.post("/kesehatan", (req, res) => {
    const { jenisKesehatan, namaDusun, jumlah } = req.body;

    db.query("INSERT INTO kesehatan ( jenis_data, nama_dusun, total ) VALUES (?, ?, ?)", [jenisKesehatan, namaDusun, jumlah], (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

app.get("/kesehatan/edit/:id", (req, res) => {
    db.query("SELECT * FROM kesehatan WHERE id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({ message: "Data kesehatan tidak ditemukan" });
        }
        res.json(result[0]);
    });
});

app.delete("/kesehatan/:id", (req, res) => {
    db.query(
        "DELETE FROM kesehatan WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Data berhasil dihapus" });
        }
    );
});


// =========================================
//                CRUD DUSUN
// =========================================

app.get("/penduduk_tembeng/dusun", (req, res) => {
    db.query(`
        SELECT dusun.id, dusun.dusun,
               penduduk_tembeng.NAMA_LENGKAP AS kepala_dusun,
               penduduk_tembeng.nik
        FROM dusun
        LEFT JOIN penduduk_tembeng ON dusun.kepala_dusun_id = penduduk_tembeng.id
        ORDER BY dusun.id ASC
    `, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get("/penduduk_tembeng/dusun/sum", (req, res) => {
    db.query("SELECT * FROM dusun", (err, result) => {
        if (err) throw err;
        res.json(result.length);
    });
});

app.get("/penduduk_tembeng/dusun/edit/:id", (req, res) => {
    db.query(`
        SELECT dusun.id, dusun.dusun,
               penduduk_tembeng.NAMA_LENGKAP AS kepala_dusun,
               penduduk_tembeng.nik
        FROM dusun
        LEFT JOIN penduduk_tembeng ON dusun.kepala_dusun_id = penduduk_tembeng.id
        WHERE dusun.id=?
    `, [req.params.id], (err, result) => {
        if (err) throw err;
        if (!result.length) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(result[0]);
    });
});

app.put("/penduduk_tembeng/dusun/:id", (req, res) => {
    const { dusun, kepala_dusun_id } = req.body;

    db.query(
        "UPDATE dusun SET dusun=?, kepala_dusun_id=? WHERE id=?",
        [dusun, kepala_dusun_id, req.params.id],
        (err) => {
            if (err) throw err;
            res.json({ message: "Data dusun berhasil diperbarui" });
        }
    );
});

app.get("/penduduk_tembeng/dusun/jumlah", (req, res) => {
    const dataDusun = [
        "Tembeng Putik Timuk I",
        "Tembeng Putik Timuk II",
        "Tembeng Putik Baret I",
        "Tembeng Putik Baret II",
        "Lengkok Lendang",
    ];

    const sql = `
    SELECT ALAMAT_LENGKAP AS dusun, COUNT(*) AS jumlah FROM penduduk_tembeng WHERE ALAMAT_LENGKAP IN (?) GROUP BY ALAMAT_LENGKAP
  `;

    db.query(sql, [dataDusun], (err, result) => {
        if (err) return res.status(500).json(err);

        const data = result.map(item => ({
            name: item.dusun,
            value: item.jumlah
        }));

        res.json(data);
    });
});


// =========================================
//          KELUARGA GROUPING
// =========================================

app.get("/penduduk_tembeng/keluarga", (req, res) => {
    const query = `
        SELECT ROW_NUMBER() OVER (ORDER BY NOMOR_KK) AS no,
               id, NOMOR_KK, NAMA_LENGKAP, KEDUDUKAN_DALAM_KELUARGA,
               NIK, JENIS_KELAMIN, ALAMAT_LENGKAP, jumlah_anggota
        FROM (
            SELECT *,
                ROW_NUMBER() OVER(
                    PARTITION BY NOMOR_KK
                    ORDER BY
                        CASE
                            WHEN KEDUDUKAN_DALAM_KELUARGA = 'KEPALA KELUARGA' THEN 1
                            WHEN KEDUDUKAN_DALAM_KELUARGA = 'ISTRI' THEN 2
                            ELSE 3
                        END
                ) AS rn,
                COUNT(*) OVER (PARTITION BY NOMOR_KK) AS jumlah_anggota
            FROM penduduk_tembeng
        ) merged
        WHERE rn = 1
        ORDER BY NOMOR_KK ASC
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json({ hasil: result, jumlah: result.length });
    });
});

app.get("/penduduk_tembeng/keluarga/detail/:id", (req, res) => {
    db.query(
        "SELECT id, NOMOR_KK, NAMA_LENGKAP, KEDUDUKAN_DALAM_KELUARGA, NIK, JENIS_KELAMIN, ALAMAT_LENGKAP FROM penduduk_tembeng WHERE id=?",
        [req.params.id],
        (err, headResult) => {
            if (err) throw err;
            if (!headResult.length) return res.json({ message: "Data tidak ditemukan" });

            const nomorKK = headResult[0].NOMOR_KK;

            db.query(
                "SELECT id, NAMA_LENGKAP, KEDUDUKAN_DALAM_KELUARGA, JENIS_KELAMIN, TANGGAL_LAHIR, NIK FROM penduduk_tembeng WHERE NOMOR_KK=?",
                [nomorKK],
                (err, memberResult) => {
                    if (err) throw err;
                    res.json({
                        kepala_keluarga: headResult[0],
                        jumlah_anggota: memberResult.length,
                        anggota_keluarga: memberResult
                    });
                }
            );
        }
    );
});


// =========================================
//                 CRUD BERITA
// =========================================
app.get("/berita", (req, res) => {
    const sql = "SELECT * FROM berita ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const baseUrl = "http://localhost:5000/assets/";

        const formatted = results.map(item => ({
            ...item,
            images: item.images ? baseUrl + item.images : null
        }));

        res.json(formatted);
    });
});

app.post("/berita", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "File gambar tidak diterima server" });

    const { title, penulis, subtitle } = req.body;
    const filename = req.file.filename;

    db.query(
        "INSERT INTO berita (judul, penulis, subJudul, images) VALUES (?, ?, ?, ?)",
        [title, penulis, subtitle, filename],
        (err) => {
            if (err) return res.status(500).json({ error: err });

            res.json({
                message: "Berita berhasil ditambahkan",
                imageUrl: "http://localhost:5000/assets/" + filename
            });
        }
    );
});

app.get("/penduduk_tembeng/berita/edit/:id", (req, res) => {
    db.query("SELECT * from berita WHERE id=?", [req.params.id], (err, result) => {
        if (err) throw err;

        if (result.length === 0)
            return res.status(404).json({ message: "Data tidak ditemukan" });

        res.json(result[0]);
    })
})

app.put("/penduduk_tembeng/berita/:id", upload.single("images"), (req, res) => {
    const { judul, subJudul, penulis } = req.body;
    const image = req.file ? req.file.filename : null

    let sql = "UPDATE berita SET judul=?, subJudul=?, penulis=?";
    const params = [judul, subJudul, penulis];

    if (image) {
        sql += ", images=?";
        params.push(image);
    }

    sql += " WHERE id=?";
    params.push(req.params.id);

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        res.json({ message: "Berita Berhasil di perbarui" });
    })
})

app.delete("/berita/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM berita WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ message: "Berhasil dihapus" });
    });
});


// =========================================
//                  UMKM
// =========================================
app.get("/penduduk_tembeng/umkm", (req, res) => {
    db.query("SELECT * FROM umkm ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const formatted = results.map(item => ({
            ...item,
            images: item.images ? JSON.parse(item.images) : []
        }));

        res.json(formatted);
    })
})

app.get("/penduduk_tembeng/umkm/edit/:id", (req, res) => {
    db.query("SELECT * from umkm WHERE id=?", [req.params.id], (err, result) => {
        if (err) throw err;

        if (result.length === 0)
            return res.status(404).json({ message: "Data tidak ditemukan" });

        res.json(result[0]);
    })
})

app.post("/penduduk_tembeng/umkm", upload.array("images", 5), (req, res) => {
    const { judul, subJudul, harga, no_wa } = req.body;

    const images = req.files.map(
        (file) => `${file.filename}`
    );

    const sql = `
    INSERT INTO umkm (judul, images, subJudul, harga, no_wa)
    VALUES (?, ?, ?, ?, ?)
  `;

    db.query(
        sql,
        [judul, JSON.stringify(images), subJudul, harga, no_wa],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "UMKM berhasil ditambahkan" });
        }
    );
});

app.put(
    "/penduduk_tembeng/umkm/:id",
    upload.array("images", 5),
    (req, res) => {
        const { id } = req.params;

        db.query(
            "SELECT images FROM umkm WHERE id = ?",
            [id],
            (err, rows) => {
                if (err) return res.status(500).json(err);
                if (!rows.length)
                    return res.status(404).json({ message: "Data tidak ditemukan" });

                let oldImages = [];
                try {
                    oldImages = JSON.parse(rows[0].images || "[]");
                } catch {
                    oldImages = [];
                }

                if (req.files && req.files.length > 0) {
                    oldImages.forEach((img) => {
                        const filePath = path.join("public/assets", img);

                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    });
                }

                const newImages =
                    req.files && req.files.length > 0
                        ? req.files.map((f) => f.filename)
                        : oldImages;

                db.query(
                    `UPDATE umkm
           SET judul=?, subJudul=?, harga=?, no_wa=?, images=?
           WHERE id=?`,
                    [
                        req.body.judul,
                        req.body.subJudul,
                        req.body.harga,
                        req.body.no_wa,
                        JSON.stringify(newImages),
                        id,
                    ],
                    (err2) => {
                        if (err2) return res.status(500).json(err2);
                        res.json({ message: "UMKM berhasil diperbarui" });
                    }
                );
            }
        );
    }
);


app.delete("/penduduk_tembeng/umkm/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM umkm WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" })
        }

        res.json({ message: "Berhasil dihapus" });

    })

})


// =========================================
//                 GALLERY
// =========================================
app.get("/penduduk_tembeng/gallery", (req, res) => {
    db.query("SELECT * FROM gallery", (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const baseUrl = "http://localhost:5000/assets/";

        const formatted = results.map(item => ({
            ...item,
            images: item.images ? baseUrl + item.images : null
        }));

        res.json(formatted);
    })
})
app.post("/penduduk_tembeng/gallery", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(404).json({ error: "File gambar tidak ditemukan" });

    const { nama } = req.body;
    const filename = req.file.filename
    db.query("INSERT INTO gallery (nama, images) VALUES (?, ?)", [nama, filename], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.json({
            message: "berhasil menyimpan",
            imageUrl: "http://localhost:5000/assets/" + filename
        })
    })
})

app.delete("/penduduk_tembeng/gallery/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT images FROM gallery WHERE id=?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        const imagePath = rows[0].images;


        const fullPath = path.join(__dirname, `public/assets/${imagePath}`);

        fs.unlink(fullPath, (err) => {
            db.query("DELETE FROM gallery WHERE id=?", [id], (err, result) => {
                if (err) return res.status(500).json({ error: err });

                res.json({ message: "Data dan file berhasil dihapus" });
            }
            );
            if (err) {
                console.error("Gagal hapus file:", err);
            }
        });
    }
    );
});

// =========================================
//               START SERVER
// =========================================
app.listen(5000, () => console.log("Server running on port 5000"));
