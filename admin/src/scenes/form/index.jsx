import React, { useEffect, useState } from 'react';
import AddUser from './addUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const Form = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    const loadData = async () => {
        const res = await axios.get("http://localhost:5000/penduduk_tembeng/users");
        setData(res.data);
        setFilteredData(res.data);
    };

    useEffect(() => {
        loadData();
    }, [data]);

    // KOLOM UNTUK DATA GRID
    const columns = [
        { field: "id", headerName: "No", width: 70 },

        {
            field: "aksi",
            headerName: "AKSI",
            width: 180,
            renderCell: (params) => (
                <div>
                    <button
                        onClick={() => navigate(`/user/edit/${params.row.id}`)}
                        style={{
                            background: "#3498db",
                            color: "#fff",
                            padding: "5px 10px",
                            marginRight: "5px",
                            borderRadius: "5px",
                            border: "none",
                        }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteData(params.row.id)}
                        style={{
                            background: "#e74c3c",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            border: "none",
                        }}
                    >
                        Hapus
                    </button>
                </div>
            ),
        },

        { field: "nama", headerName: "NAMA", width: 200, },
        { field: "username", headerName: "USERNAME", width: 200, },
        // { field: "password", headerName: "PASSWORD", width: 180 },
        // { field: "role", headerName: "ROLE", width: 180 },
    ];

    return (
        <div>
            <h2 className="title">User Management</h2>
            <div className="ml-5">
                <button className="btn-tambah" onClick={() => navigate("/form/tambah")}>
                    Tambah User
                </button>
            </div>
            <div className="w-full h-[400px] px-[20px]">
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 0
                            }
                        }
                    }}
                    checkboxSelection={false}
                />
            </div>
        </div>
    )
}

export default Form