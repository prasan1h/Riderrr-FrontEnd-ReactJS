import React from 'react'
import { useParams } from 'react-router'

const InspectForm = () => {

    const {id} = useParams();

  return (
    <>
    <p>id : {id}</p>
    </>
  )
}

export default InspectForm