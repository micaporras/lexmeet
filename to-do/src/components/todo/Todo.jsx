import { useState } from 'react';


const Todo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className='container my-5'>
      <div className='mx-auto rounded border p-4' style={{width: "600px", backgroundImage: "linear-gradient(#5E1B89, #9D71BC, #FF7F4D, #F4512C)"}}>
          <h2 className='text-white mb-5'>ToDo App</h2>

          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
      </div>
    </div>
    
  )
}

export default Todo