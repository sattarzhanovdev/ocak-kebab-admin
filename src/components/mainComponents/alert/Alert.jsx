import React from 'react'
import Swal from 'sweetalert2'

const Alert = ({item}) => {
  return (
    Swal.fire(
      item.title,
      '', 
      item.icon
    )
  )
}

export default Alert