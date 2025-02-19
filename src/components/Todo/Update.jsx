import React from 'react'

const Update = ({display}) => {
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update '>

     <h3>Update Your Task</h3>
     <input type='text'  className='todo-inputs my-4 p-3 w-100' />
     <textarea  className='p-3 todo-inputs w-100' />
     <div>
     <button className='btn btn-dark my-4'>Update</button>
     <button className='btn btn-danger my-4 mx-3'
     onClick={() => {
       display('none');
     }}
     >Close</button>
     </div>
    
    </div>
  )
}

export default Update
