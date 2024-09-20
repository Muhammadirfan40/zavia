import React, { useRef } from 'react';
import '../Print/Print.css'
import zaviatop from '../../Images/zavia-top.jpg'
import zaviabottem from '../../Images/zavia-bottem.jpg'



const Print = ({ printRef, name, dob, gender, phone, department, cnic, maritalStatus, city, roomnumber }) => {





  return (
    <>

      <div ref={printRef} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <div className='mainpage'>

          <div className="">
            <img src={zaviatop} alt="" className='topimage' />
          </div>

          <hr className='hr' />

          <div className='data'>

            <div className="dataform">

              <div>
                <p ><span className='textname'>Name : </span><span className='textoutput'>{name}</span></p>
                <p className='Dob'><span className='textname'>DOB : </span><span className='textoutput'>{dob}</span></p>
                <p><span className='textname'>GENDER : </span><span className='textoutput'>{gender}</span></p>
              </div>

              <div>
                <p><span className='textname'>PHONE : </span> <span className='textoutput'>{phone}</span></p>
                <p><span className='textname'>DEPARTMENT : </span><span className='textoutput'>{department}</span></p>
                <p><span className='textname'>CNIC : </span> <span className='textoutput'>{cnic}</span></p>
              </div>

              <div>
                <p><span className='textname'>M-STATUS : </span><span className='textoutput'>{maritalStatus}</span></p>
                <p><span className='textname'>CITY : </span><span className='textoutput'>{city}</span></p>
                <p><span className='textname'>ROOM NUMBER : </span><span className='textoutput'>{roomnumber}</span></p>

              </div>
            </div>

          </div>

          <hr className='hr' />

          <div className='leftmargin'>

            <div className='imn'>
              <p className='imn2'>Investigantion:</p>
              <p className='imn2'>Medical Advice:</p>
              <p className='imn2'>Notes:</p>
            </div>

            <div className="bottomImg" style={{ marginTop: "360px" }}>
              <img src={zaviabottem} alt="" className='topimage' />
            </div>

          </div>
        </div>
      </div>



    </>
  )
}

export default Print