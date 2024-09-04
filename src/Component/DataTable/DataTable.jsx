import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../DataTable/DataTable.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import { useContext } from 'react';



export default function DataTable() {

    const ctx = useContext(AuthContext)
    console.log(ctx);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let n = 1;
    const columns = [
        {
            field: 'sr', headerName: 'Sr', width: 70,

            renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,

        },
        // { field: '_id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'First name', width: 130 },
        { field: 'dob', headerName: 'Date of Birth', width: 130 },
        { field: 'gender', headerName: 'Gender', width: 130 },
        { field: 'phone', headerName: 'Phone #', width: 130 },
        { field: 'cnic', headerName: 'CNIC', width: 130 },
        { field: 'department', headerName: 'Department', width: 130 },
        { field: 'maritalStatus', headerName: 'Martial Status', width: 130 },
        { field: 'city', headerName: 'City', width: 130 },
        { field: 'roomnumber', headerName: 'Room num', width: 130 },

    ];

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get('https://back-end-seven-xi.vercel.app/api/patient/getallpatient');
                console.log(response.data.Patients)
                setData(response.data.Patients);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const EditPatient = () => {

        alert("Patient Edit !")

    };

    const PatientDelete = () => {

        alert("Patient Delete !")

    };

    return (

        <div className="container">

            <div className="py-5">

                <div className="row g-3">

                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center" style={{ height: "100px" }}>
                                <div>
                                    <h5 className="card-title">Total Registered Patients</h5>
                                    <h3 className="card-text">{data.length}</h3>
                                </div>
                                <div>
                                    <i
                                        className="bi bi-people"
                                        style={{ fontSize: "2rem", color: "#007bff" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center" style={{ height: "100px" }}>
                                <div>
                                    <h5 className="card-title">Register New Patient</h5>
                                </div>
                                <div>
                                    <Link to="/addPatient" className="btn bg-secondary text-white px-4">
                                        ADD NEW
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data}
                            getRowId={(r) => r._id}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                        
                            pageSizeOptions={[5, 10, 20]}

                            sx={{ overflow: 'clip' }}
                        />
                    </div>

                    <div className='className="col-12 text-center mt-3"'>
                        <button onClick={() => { EditPatient() }} className="btn btn-primary">Edit</button>
                        <button onClick={() => { PatientDelete() }} className="btn btn-secondary ms-2">Delete</button>

                    </div>
                    <button onClick={() => { ctx.logout() }} className="btn btn-secondary">Logout</button>
                </div>

            </div>

        </div>
    );


}
