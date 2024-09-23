import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../DataTable/DataTable.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';


const notify = () => {
    toast('Patient Delete successfully!');
};



export default function DataTable() {
    const params = useParams()
    const ctx = useContext(AuthContext)
    console.log(ctx);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    let n = 1;
    const columns = [
        {
            field: 'serialNumber', headerName: 'Sr', width: 10,
            // renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
        },
        // { field: '_id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'First name', width: 120 },
        { field: 'dob', headerName: 'Date of Birth', width: 95 },
        { field: 'gender', headerName: 'Gender', width: 65 },
        { field: 'phone', headerName: 'Phone #', width: 110 },
        { field: 'cnic', headerName: 'CNIC', width: 140 },
        { field: 'department', headerName: 'Department', width: 180 },
        { field: 'maritalStatus', headerName: 'Martial Status', width: 110 },
        { field: 'city', headerName: 'City', width: 75 },
        { field: 'roomnumber', headerName: 'Room num', width: 80 },
        {
            field: "actions", headerName: "Actions", width: 105, renderCell: (value, row) => {
                return <span>
                    <Link to={`/editpatient/${value.id}`} class='btn btn-info btn-sm me-1'><i class="ri-pencil-line "></i></Link>
                    <button onClick={() => PatientDelete(value.id)} class='btn btn-danger btn-sm'><i class="ri-delete-bin-line"></i></button>
                </span>;
            },
        }
    ];

    const navigate = useNavigate()

    const fetchData = async () => {

        try {
            const response = await axios.get('https://back-end-seven-xi.vercel.app/api/patient/getallpatient');
            // const response = await axios.get('http://localhost:4000/api/patient/getallpatient');

            console.log(response.data.Patients)
            setData(response.data.Patients);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // const EditPatient = (id) => {
    //     try {
    //         axios.put(`http://localhost:4000/api/patient/update/${id}`)
    //     } catch (error) {
    //         console.log(error.message);

    //     }
    //     console.log(id)
    // };

    const PatientDelete = async (id) => {

        try {
            axios.delete(`https://back-end-seven-xi.vercel.app/api/patient/delete/${id}`).then(res => {
                // axios.delete(`http://localhost:4000/api/patient/delete/${id}`).then(res => {
                notify()

                if (res.status == 200) {
                    console.log(res);
                    fetchData();
                }
            })


        } catch (error) {
            console.log(error.message);

        }

    };

    // Filter the data based on the search term
    const filteredData = data.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.cnic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="container">

            <div className="py-5 dasboard">

                <h1 className='text-center mb-3 text-body-secondary fw-bold'>Dashboard</h1>

                <div className="row px-3">

                    <div className="col-md-4 mb-sm-2">
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

                    <div className="col-md-4 mb-sm-2">
                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center" style={{ height: "100px" }}>
                                <div>
                                    <h5 className="card-title">Register New Patient</h5>
                                </div>
                                <div>
                                    <Link to="/addPatient" className="btn bg-success text-white">
                                        ADD NEW
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-sm-2">
                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center" style={{ height: "100px" }}>
                                <div>
                                    <h5 className="card-title">User Logout</h5>
                                </div>
                                <div>
                                    <button onClick={() => { ctx.logout() }} className="btn btn-danger">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-12 col-xxl-12 mx-auto">

                        <form className="d-flex flex-column flex-sm-row">
                            <input
                                className="form-control mb-2 mb-sm-0 me-sm-2 flex-grow-1 bg-white text-dark border-dark-subtle"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}

                            />
                            {/* <button className="btn btn-primary" type="submit">
                                Search
                            </button> */}
                        </form>

                    </div>

                    <div className='mt-2' style={{ height: 400, width: '100%' }}>

                        {/* for data table style */}
                        {/* <div style={{ height: 400, width: '100%' }}></div> */}

                        <DataGrid

                            rows={filteredData}
                            getRowId={(r) => r._id}

                            columns={columns}

                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 100 },
                                },
                            }}

                            pageSizeOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10000]}

                            sx={{ overflow: 'clip' }}

                        />

                    </div>

                </div>

            </div>

        </div>
    );


}
