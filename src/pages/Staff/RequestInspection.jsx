import React, { useEffect, useState } from 'react'

import BikeCard from '../../components/Staff/BikeCard';
import StaffNav from '../../components/StaffNav'

const RequestInspection = () => {

    const [data, setData] = useState([]);
    const url = "http://localhost:8080/api/bike/all";

    const fetchData = () => {
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            setData(data);
            console.log(data);
        })
        .catch(e => console.log("error", e));
    }

    useEffect(() => {
        fetchData();
    },[]);

  return (
    <>
    <StaffNav/>
    <div className='relative w-full'>
    <div className='absolute flex justify-center flex-wrap bg-blue-100 left-64'>
    {
      
        data.map((bike,index) => (
                <BikeCard bike={bike} key={index} />
            
        ))
    }
    </div>
    </div>
    </>
  )
}

export default RequestInspection