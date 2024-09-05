
import React, { useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const AddPatientForm = () => {
    const [userid, setUserid] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [cnic, setCnic] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [city, setCity] = useState('');
    const [roomnumber, setRoomnumber] = useState('');
    const [getData, setGetData] = useState([]);

    const createUser = () => {

        alert("User register Succussfully !")

        const patientData = {
            userid,
            name,
            dob,
            gender,
            phone,
            department,
            cnic,
            maritalStatus,
            city,
            roomnumber,
        };


        axios.post('https://back-end-seven-xi.vercel.app/api/patient/register', patientData).then((res) => {
            console.log(res.data);
        }).then(() => {
            setName("");
            setDob("");
            setGender("");
            setPhone('');
            setDepartment("");
            setCnic("");
            setMaritalStatus("");
            setCity("");
            setRoomnumber("");
        })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                console.log(getData)
            })
    }

    return (

        <div className="container p-5">

            <form onSubmit={e => e.preventDefault()} className="row g-3 p-3 border rounded bg-light p-5">

                {/* <div className="col-md-4">
                    <label className="form-label text-secondary">Patient Id *</label>
                    <input
                        type="text"
                        className="form-control bg-white text-dark  "
                        value={userid}
                        onChange={(e) => setUserid(setGetData.length + 1)}
                        required
                    />
                </div> */}

                <div className="col-md-4">
                    <label className="form-label text-secondary">Name *</label>
                    <input
                        type="text"
                        className="form-control bg-white text-dark"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">Date of Birth *</label>
                    <input
                        type="date"
                        className="form-control bg-white text-dark"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">Gender *</label>
                    <select
                        className="form-select bg-white "
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">Phone *</label>
                    <input
                        type="number"
                        className="form-control bg-white text-dark"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">Department</label>
                    <select
                        className="form-select bg-white "
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        <option value="cardiology">1-Cardialogist</option>
                        <option value="Chest">2-Chest</option>
                        <option value="ChildSpecialist ">Child Specialist</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Dietitian and Nutritionist">Dietitian and Nutritionist</option>
                        <option value="Drugs and psychiatry">Drugs and psychiatry</option>
                        <option value="ENT">ENT</option>
                        <option value="Eye">Eye</option>
                        <option value="General Physician">General Physician</option>
                        <option value="General Surgery">General Surgery</option>
                        <option value="Gynecological ">Gynecological</option>
                        <option value="Hijama">Hijama</option>
                        <option value="Homeopathic">Homeopathic</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Orthopedic">Orthopedic</option>
                        <option value="Pathology">Pathology</option>
                        <option value="Phusiotherapy">Phusiotherapy</option>
                        <option value="Rheumatologists">Rheumatologists</option>
                        <option value="Skin">Skin</option>
                        <option value="Trauma">Trauma</option>
                        <option value="Ultrasound">Ultrasound</option>
                        <option value="Urology">Urology</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">CNIC No *</label>
                    <input
                        type="number"
                        className="form-control bg-white text-dark"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">Marital Status</label>
                    <select
                        className="form-select bg-white "
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">City</label>
                    <input
                        type="text"
                        className="form-control bg-white text-dark"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label text-secondary">Room No</label>
                    <input
                        type="number"
                        className="form-control bg-white text-dark"
                        value={roomnumber}
                        onChange={(e) => setRoomnumber(e.target.value)}
                    />
                </div>

                <div className="col-12 text-center mt-3">
                    <button onClick={() => { createUser() }} type="submit" className="btn btn-primary mb-2">Save and Print</button>
                    <button type="button" className="btn btn-secondary ms-2 mb-2" onClick={() => console.log('Cancelled')}>Cancel</button>
                    <Link to="/dashboard" className="btn btn-dark ms-2 mb-2">Dashborad</Link>
                </div>

            </form>

        </div>

    );

};

export default AddPatientForm;
