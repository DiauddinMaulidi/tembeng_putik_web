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

dotenv.config()
const app = express();
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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
            'SELECT id, username, password FROM users WHERE username = ?',
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

    // 1. Ambil data gambar dulu
    db.query("SELECT images FROM gallery WHERE id=?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        // contoh: /uploads/gallery/abc.jpg
        const imagePath = rows[0].images;
        // res.json(imagePath)


        // 2. Hapus file dari folder
        const fullPath = path.join(__dirname, `public/assets/${imagePath}`);

        fs.unlink(fullPath, (err) => {
            // 3. Hapus data dari database
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
//                 SURAT SKTM
// =========================================

// get last nomor surat
app.get("/penduduk_tembeng/surat/number", (req, res) => {
    db.query("SELECT * FROM tabel_surat", (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const last = result
        res.json(last);
    });
});

// insert surat SKTM
app.post("/surat/sktm", (req, res) => {
    const { nomor_surat, pemohon_id, keperluan, berlaku_dari, berlaku_sampai, penanda_tangan } = req.body;

    const q = `
        INSERT INTO desa_surat
        (nomor_surat, pemohon_id, keperluan, berlaku_dari, berlaku_sampai, penanda_tangan)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        q,
        [nomor_surat, pemohon_id, keperluan, berlaku_dari, berlaku_sampai, penanda_tangan],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ status: "success", id: result.insertId });
        }
    );
});

// get detail surat SKTM
app.get("/surat/sktm/:id", (req, res) => {
    const q = `
        SELECT s.*,
               p.NIK, p.NAMA_LENGKAP, p.TEMPAT_LAHIR, p.TANGGAL_LAHIR,
               p.JENIS_KELAMIN, p.AGAMA, p.STATUS_PERKAWINAN,
               p.PEKERJAAN, p.ALAMAT_LENGKAP
        FROM desa_surat s
        LEFT JOIN penduduk_tembeng p ON s.pemohon_id = p.id
        WHERE s.id = ?
    `;

    db.query(q, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (!result.length) return res.status(404).json({ message: "Data tidak ditemukan" });

        res.json(result[0]);
    });
});


// =========================================
//               START SERVER
// =========================================
app.listen(5000, () => console.log("Server running on port 5000"));
