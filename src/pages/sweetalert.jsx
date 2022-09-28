import React from 'react'
import Swal from 'sweetalert2'

const sweetalert = async() => {
    let res
    const alert = await Swal.fire({
        text: `Are you sure you want to delete the employee:  ?`,
        icon: 'question',
        confirmButtonColor: "#D32F2F",
        showCancelButton: true,
        showCloseButton: true,
      }).then(response => {
        if (response.isConfirmed){
          res = true
        }
      })
  return (
    <>{alert}</>
  )
}

export default sweetalert