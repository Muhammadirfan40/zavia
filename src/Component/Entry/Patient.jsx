import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./../Entry/Patient.css";
import { toast } from 'react-toastify';
import Print from '../Print/Print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const notify = () => {
    toast('Patient Add successfully!');
};


const CnicInput = ({ value, onChange }) => {

    const formatCnic = (value) => {
        let digits = value.replace(/\D/g, '');
        if (digits.length > 13) {
            digits = digits.slice(0, 13);
        }
        let formatted = '';
        if (digits.length > 5) {
            formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}`;
        } else {
            formatted = digits;
        }
        if (digits.length > 12) {
            formatted += `-${digits.slice(12, 13)}`;
        }
        return formatted;
    };

    const handleChange = (e) => {
        const value = e.target.value;
        onChange(formatCnic(value));
    };

    return (
        <div className="col-md-4">
            <label className="form-label text-secondary">CNIC No *</label>
            <input
                type="text"
                className="form-control bg-white text-dark"
                value={value}
                onChange={handleChange}
                maxLength="15"
                required
            />
        </div>
    );

};

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

    const createUser = async () => {
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

        try {
            await axios.post('https://back-end-seven-xi.vercel.app/api/patient/register', patientData);
            // await axios.post('http://localhost:4000/api/patient/register', patientData);
            notify()

            // Clear form fields
            setName("");
            setDob("");
            setGender("");
            setPhone('');
            setDepartment("");
            setCnic("");
            setMaritalStatus("");
            setCity("");
            setRoomnumber("");

            generateAndPrintPDF();
        } catch (error) {
            console.error("There was an error registering the patient!", error);
            alert("An error occurred while registering the patient.");
        }
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        if (input.length <= 11) {
            setPhone(input);
        }
    };


    const printRef = useRef();

    // Function to generate and auto-print the PDF
    const generateAndPrintPDF = () => {
        const input = printRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Calculate width and height to maintain aspect ratio
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add the canvas image (HTML content) to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Open print dialog after PDF is created
            window.open(pdf.output('bloburl'), '_blank').print();
        }).catch((err) => {
            console.error('Error generating PDF', err);
        });
    };

    return (

        <div className="container">

            <div className='p-5 patientcolor'>

                <h1 className='text-center text-black fw-bold mb-5'>Add New Patient</h1>

                <form onSubmit={(e) => { e.preventDefault(); createUser(); }} className="row g-3 p-3 border rounded bg-light p-5">

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
                            className="form-select bg-white"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>

                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label text-secondary">Phone *</label>
                        <input
                            type="text"
                            className="form-control bg-white text-dark"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength="11"
                            placeholder="03123456789"
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label text-secondary">Department</label>
                        <select
                            className="form-select bg-white"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            <option value="Cardiology">1-Cardiologist</option>
                            <option value="Chest">2-Chest</option>
                            <option value="Child-Specialist">3-Child Specialist</option>
                            <option value="Dentist">4-Dentist</option>
                            <option value="Dietitian-nutritionist">5-Dietitian and Nutritionist</option>
                            <option value="Drugs-psychiatry">6-Drugs and Psychiatry</option>
                            <option value="Ent">7-ENT</option>
                            <option value="Eye">8-Eye</option>
                            <option value="General-physician">9-General Physician</option>
                            <option value="General-surgery">10-General Surgery</option>
                            <option value="Gynecological">11-Gynecological</option>
                            <option value="Hijama">12-Hijama</option>
                            <option value="Homeopathic">13-Homeopathic</option>
                            <option value="Medicine">14-Medicine</option>
                            <option value="Neurologist">15-Neurologist</option>
                            <option value="Orthopedic">16-Orthopedic</option>
                            <option value="Pathology">17-Pathology</option>
                            <option value="Physiotherapy">18-Physiotherapy</option>
                            <option value="Rheumatologists">19-Rheumatologists</option>
                            <option value="Skin">20-Skin</option>
                            <option value="Trauma">21-Trauma</option>
                            <option value="Ultrasound">22-Ultrasound</option>
                            <option value="Urology">23-Urology</option>
                        </select>
                    </div>


                    <CnicInput value={cnic} onChange={setCnic} />

                    <div className="col-md-4">
                        <label className="form-label text-secondary">Marital Status</label>
                        <select
                            className="form-select bg-white"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
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
                        <button type="submit" className="btn btn-primary mb-2">Save and Print</button>
                        <Link to="/dashboard" className="btn btn-dark ms-2 mb-2">Dashboard</Link>
                    </div>
                </form>

            </div>
            {/* <button onClick={generateAndPrintPDF} style={{ marginTop: '20px' }}>
                Generate PDF and Print
            </button>
 */}

            <div id="print-content" className='hidden-content' ref={printRef}>
                <Print name={name} dob={dob} gender={gender} phone={phone} department={department} cnic={cnic} maritalStatus={maritalStatus} city={city} roomnumber={roomnumber} />
            </div>

        </div>
    );
};

export default AddPatientForm;
