import React, { useEffect, useState } from 'react'

const RequestInspection = () => {

    const [data, setData] = useState([]);
    
    const url = "http://localhost:8080/api/bike/requestInspect";

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
    {
        data.map((bike,index) => (
            <div key={index} className='text-black'>{bike.model}</div>
        ))
    }
    </>
  )
}

export default RequestInspection