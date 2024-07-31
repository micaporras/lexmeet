import { useEffect, useState } from 'react';
import './Todo.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const Todo = () => {


  function getStoredTodos() {
    let data = localStorage.getItem("todos")
    let json = JSON.parse(data)

    if (json) {
      return json
    } 
    return []
  }

  const [todos, setTodos] = useState(getStoredTodos())
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function AddTask(event) {
    event.preventDefault()

    let task = event.target.task.value

    if (!task) {
        alert("Please input a task")
        return
    }

    setTodos([...todos, {task:task, completed: false}])

    alert("New task added")

    event.target.reset()

    return [
    <div className="modal fade text-white" tabindex="-1">
                      <div className="modal-dialog position-fixed bottom-1 end-0 p-4">
                        <div className="modal-content" style={{backgroundColor: "#9D71BC"}}>
                          <div className="modal-body" style={{backgroundColor: "#9D71BC", borderRadius: "10px", width: "300px"}}>
                            Task Deleted
                          </div>
                        </div>
                      </div>
    </div>
    ]
    
    
  }

  function changeTaskStatus(index) {
    let newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  function checkAll() {
    let newTodos = [...todos]
    let index = 0
    let checkValue = newTodos.length
    while (checkValue > -1) {
      index += 1
      let check = newTodos[index].completed
      let check1 = newTodos[0].completed
      if (check === false || check1 === false) {
        newTodos[index].completed = true
        newTodos[0].completed = true
      }
      setTodos(newTodos)
    }
    
  }

  function changeBookmarkStatus(index) {
    let newTodos = [...todos]
    newTodos[index].bookmarked = !newTodos[index].bookmarked
    setTodos(newTodos)
  }

  function deleteTask(index) {
    let newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  function deleteAll() {
    let newTodos = [...todos]
    newTodos.length = 0
    setTodos(newTodos)
  }

  
  return (
          <div>
            <nav className="navbar navbar-expand-lg mb-3">
            <div className="d-flex">
              <div className="navbar-brand text-white me-0" style={{width: "435px", textAlign: "left", fontWeight: "bold", borderBottom: "solid white 1px"}}>TODO LIST</div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav nav-tabs me-3">
                  <li className={`nav-item ${isCompleted=== false && 'active'}`} onClick={() => setCompleted(false)}>
                    <a className="nav-link text-white" aria-current="page" href="/">All</a>
                  </li>
                  <li className={`nav-item ${isCompleted=== true && 'active'}`} onClick={() => setCompleted(true)}>
                    <a className="nav-link text-white">Completed</a>
                  </li>
              </ul>
                <button className="btn btn-outline-light"><i className="bi bi-bookmarks-fill"></i></button>
              </div>
            </div>
            </nav>
          <form className="d-flex mb-4" onSubmit={AddTask} style={{width: "100%"}}>
              <input className="form-control me-2 " placeholder="Add a Task" name='task'/>
              <button className="btn btn-outline-light me-2 p-1" style={{width: "60px"}} type="submit"><i className="bi bi-check-lg h4"></i></button>
              {/* <button className="btn btn-outline-light"><i className="bi bi-bookmarks-fill"></i></button> */}
          </form>

          {
            todos.map((todo, index) => {
              return (
                <div key={index} className='rounded mt-2 p-2 d-flex' style={{backgroundColor: todo.completed ? "#9D71BC" : "transparent", 
                border: todo.completed ? "solid #9D71BC 1px" : "solid white 2px",
                color: "white"}}>
                  <div className='me-auto' style={{cursor: "pointer"}}>
                    <i className= {"me-2 h5 " + (todo.completed ? "bi bi-check-square-fill" : "bi bi-square")} style={{cursor: "pointer"}}
                    onClick={() => changeTaskStatus(index)}></i>
                    {todo.task}
                  </div>
      
                  <div>
                    <i className= {"me-2 h5 " + (todo.bookmarked ? "bi bi-bookmark-fill me-2 h5" : "bi bi-bookmark me-2 h5")} style={{cursor: "pointer"}}
                    onClick={() => changeBookmarkStatus(index)}></i>
                    <i className="bi bi-pencil-square me-2 h5" style={{cursor: "pointer"}}></i>
                    <i className="bi bi-trash3 h5" style={{cursor: "pointer"}} 
                    data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => deleteTask(index)}></i>

                    <div className="modal fade text-white" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                      <div className="modal-dialog position-fixed bottom-1 end-0 p-4">
                        <div className="modal-content" style={{backgroundColor: "#9D71BC"}}>
                          <div className="modal-body" style={{backgroundColor: "#9D71BC", borderRadius: "10px", width: "300px"}}>
                            Task Deleted
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })
          }

          <div className="mt-4 position-relative">
            <button className="btn btn-outline-light me-4 p-0" onClick={() => checkAll()} style={{width: "100px"}}><i className="bi bi-list-check h3"></i></button>
            <button className="btn btn-outline-light p-1" style={{width: "100px"}} data-bs-toggle="modal" data-bs-target="#deleteAllModal"><i class="bi bi-trash3 h5 p-1"></i> All</button>

            <div className="modal fade" id="deleteAllModal" tabindex="-1" aria-labelledby="deleteAllModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 classNAme="modal-title fs-5" id="exampleModalLabel">Delete All Tasks</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    All the tasks will be deleted. Confirm?
                  </div>
                  <div class="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn text-white" style={{backgroundColor: "#5E1B89"}} onClick={() => deleteAll()} data-bs-dismiss="modal">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          
  )
}

export default Todo