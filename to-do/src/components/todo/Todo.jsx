import { useEffect, useState } from 'react';
import './Todo.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Todo = () => {
  let monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function getStoredTodos() {
    let data = localStorage.getItem("todos")
    let json = JSON.parse(data)

    if (json) {
      return json
    } 
    return []
  }

  function getStoredCompletedTodos() {
    let completedData = localStorage.getItem("completedTodos")
    let json = JSON.parse(completedData)

    if (json) {
      return json
    } 
    return []
  }

  const [todos, setTodos] = useState(getStoredTodos())
  const [showAddModal, setShowAddModal] = useState(false)
  const [isCompleted, setCompleted] = useState(false)
  const [completedTodos, setCompletedTodos] = useState(getStoredCompletedTodos())
 
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  
  const [showEditModal, setShowEditModal] = useState(false)
  
  const [editTask, setEditTask] = useState('')
  const [editTaskOriginal, setEditTaskOriginal] = useState(null)


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
  }, [completedTodos])

  function AddTask(event) {
    event.preventDefault()

    let task = event.target.task.value
    let dateCreated = new Date()
    let day = dateCreated.getDate()
    let month = dateCreated.getMonth()
    let year = dateCreated.getFullYear()
    let hour = dateCreated.getHours()
    let minute = dateCreated.getMinutes()

    let detectAmPm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour? hour : 12

    minute = minute < 10 ? '0' + minute : minute

    month = monthNames[month]
    let createdOn = month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute + detectAmPm

    if (!task) {
      toast.error("Please input a task", {
        icon: <i className="bi bi-exclamation-circle-fill h4" style={{color: "#F4512C"}}></i>,
      })
      return
    }

    setTodos([...todos, {task:task, completed: false, createdOn, completedOn: ""}])

    toast.success("New task added on " + createdOn, {
    icon: <i className="bi bi-emoji-laughing-fill h4" style={{color: "#5E1B89"}}></i>
    })

    event.target.reset()
    setShowAddModal(false)
    
  }

  function changeTaskStatus(task) {
    let newTodos = [...todos]
    let newCompletedTodos = [...completedTodos]

    let todo = newTodos.find(t => t.task === task)
    if (todo) {
      todo.completed = !todo.completed
      setTodos(newTodos)

      if (todo.completed) {
        handleCompleted(task)
      } else {
          let completedTodoIndex = newCompletedTodos.findIndex(t => t.task === task)
          if (completedTodoIndex !== -1) {
            newCompletedTodos.splice(completedTodoIndex, 1)
            setCompletedTodos(newCompletedTodos)
          }
        }
    } else {
        let completedTodo = newCompletedTodos.find(t => t.task === task)
        if (completedTodo) {
          completedTodo.completed = !completedTodo.completed
          newTodos.push(completedTodo)
          setTodos(newTodos)

          let completedTodoIndex = newCompletedTodos.findIndex(t => t.task === task)
          if (completedTodoIndex !== -1) {
            newCompletedTodos.splice(completedTodoIndex, 1)
            setCompletedTodos(newCompletedTodos)
          }
        }
    }
  }

  function checkAll() {
    let newTodos = [...todos]

    let dateCompleted = new Date()
    let dayCompleted = dateCompleted.getDate()
    let monthCompleted = dateCompleted.getMonth()
    let yearCompleted = dateCompleted.getFullYear()
    let hourCompleted = dateCompleted.getHours()
    let minuteCompleted = dateCompleted.getMinutes()

    monthCompleted = monthNames[monthCompleted]
    let detectAmPm = hourCompleted >= 12 ? 'PM' : 'AM'
    hourCompleted = hourCompleted % 12
    hourCompleted = hourCompleted ? hourCompleted : 12
    minuteCompleted = minuteCompleted < 10 ? '0' + minuteCompleted : minuteCompleted

    let completedOn = monthCompleted + ' ' + dayCompleted + ', ' + yearCompleted + ' ' + hourCompleted + ':' + minuteCompleted + detectAmPm

    for (let i = 0; i < newTodos.length; i++) {
      if (!newTodos[i].completed) {
        newTodos[i].completed = true
        newTodos[i].completedOn = completedOn
      }
    }

    setTodos(newTodos)
    setCompletedTodos(newTodos.filter(todo => todo.completed))
    
    if (newTodos.length === 0) {
      toast.success("No task to be marked done", {
      icon: <i className="bi bi-clipboard-check-fill h3" style={{color: "#5E1B89"}}></i>
      })
    } else {
      toast.success("All tasks are marked done", {
      icon: <i className="bi bi-clipboard-check-fill h3" style={{color: "#5E1B89"}}></i>
      })
    }
  }

  function handleCompleted(task) {
    let dateCompleted = new Date()
    let dayCompleted = dateCompleted.getDate()
    let monthCompleted = dateCompleted.getMonth()
    let yearCompleted = dateCompleted.getFullYear()
    let hourCompleted = dateCompleted.getHours()
    let minuteCompleted = dateCompleted.getMinutes()

    monthCompleted = monthNames[monthCompleted]

    let detectAmPm = hourCompleted >= 12 ? 'PM' : 'AM'
    hourCompleted = hourCompleted % 12
    hourCompleted = hourCompleted ? hourCompleted : 12

    minuteCompleted = minuteCompleted < 10 ? '0' + minuteCompleted : minuteCompleted

    let completedOn = monthCompleted + ' ' + dayCompleted + ', ' + yearCompleted + ' ' + hourCompleted + ':' + minuteCompleted + detectAmPm
    let newCompletedTodos = [...completedTodos]
    let todo = todos.find(t => t.task === task)
    
    if (todo) {
      let filteredItem = {
        ...todo,
        completedOn: completedOn
      };
      
      newCompletedTodos.push(filteredItem)
      setCompletedTodos(newCompletedTodos)
    }
  }

  function openEditModal(task) {
    setEditTask(task)
    setEditTaskOriginal(task)
    setShowEditModal(true)
  }

  function handleSaveTask() {
    let updatedTodos = todos.map(todo => 
        todo.task === editTaskOriginal.task ? { ...todo, task: editTask.task } : todo
    );
    setTodos(updatedTodos)

    let updatedCompletedTodos = completedTodos.map(todo => 
        todo.task === editTaskOriginal.task ? { ...todo, task: editTask.task } : todo
    );
    setCompletedTodos(updatedCompletedTodos)

    setShowEditModal(false)
    setEditTask('')
    setEditTaskOriginal(null)
    toast.success("Task Updated", {
    icon: <i className="bi bi-hand-thumbs-up-fill h3" style={{color: "#5E1B89"}}></i>
    })
  }

  function confirmDelete(task) {
    setSelectedTask(task)
    setShowDeleteModal(true)
  }

  function handleDeleteConfirmed() {
    let newTodos = todos.filter(t => t.task !== selectedTask)
    deleteCompleted(selectedTask)
    setTodos(newTodos);
    setShowDeleteModal(false)
    setSelectedTask(null)
    toast.success("Task Deleted", {
    icon: <i className="bi bi-trash3-fill h4" style={{color: "#5E1B89"}}></i>
    })
  }

  function deleteCompleted(task) {
    let newCompletedTodos = completedTodos.filter(t => t.task !== task)
    setCompletedTodos(newCompletedTodos)
  }

  function deleteAll() {
    let newTodos = [...todos]
    setTodos([])
    deleteAllCompleted()
    
    if (newTodos.length === 0) {
      toast.success("No task to be deleted", {
      icon: <i className="bi bi-emoji-grimace h3" style={{color: "#5E1B89"}}></i>
      })
    } else {
      toast.success("All tasks deleted", {
      icon: <i className="bi bi-emoji-grimace h3" style={{color: "#5E1B89"}}></i>
      })
    }
  }

  function deleteAllCompleted() {
    setCompletedTodos([])
  }

  return (
    <div style={{width: "100%"}}> {/* The Todo List*/}
      <ToastContainer />
      {/* The navbar */}
      <nav className="navbar navbar-expand-sm mb-4 row" style={{width: "100%"}}>
        <div className="row m-1 me-0 pe-0">
          <div className="navbar-brand text-white me-0 col-sm-7" style={{ textAlign: "center", fontWeight: "bold", 
          border: "solid white 2px", borderTopRightRadius: "10px", borderBottom: "transparent", position:"relative"}}>
            TODO LIST
          </div>

          <div className="collapse navbar-collapse col-sm-4 m-0 p-0" id="navbarSupportedContent" 
          style={{justifyContent: "start", borderBottom: "solid white 2px"}}>
            <ul className="nav" style={{width: "100%", display: "grid", gridTemplateColumns: "50% 50%"}}>
              <li className={`nav-item ${isCompleted=== false && 'active'}`} onClick={() => setCompleted(false)} style={{width: "100%"}}>
                <a className="nav-link text-white" aria-current="page">All</a>
              </li>
              <li className={`nav-item ${isCompleted=== true && 'active'}`} onClick={() => setCompleted(true)} style={{width: "100%"}}>
                <a className="nav-link text-white">Completed</a>
              </li>
            </ul>
          </div>
          
          {/* The Add Task button */}
          <div className="col-sm-1 pe-0" style={{alignContent: "center", justifyItems: "end"}}>
              <button className="btn btn-outline-light p-0" style={{width: "100%"}} 
              onClick={() => setShowAddModal(true)} data-bs-toggle="tooltip" data-bs-placement="top" title="Add Task">
                <i className="bi bi-plus h2"></i>
              </button>
          </div>

        </div>
      </nav>
      
      {/* When the list is empty */}
      {
        isCompleted === false && todos.length === 0 && (
        <div className="text-center mt-4" style={{color: "rgba(245, 245, 245, 0.822)", 
        textTransform: "uppercase", minHeight: "200px", alignContent: "center"}}>
          Todo list is empty
        </div>)
      }

      {
        isCompleted === true && completedTodos.length === 0 && (
        <div className="text-center mt-4" style={{color: "rgba(245, 245, 245, 0.822)", 
        textTransform: "uppercase", minHeight: "200px", alignContent: "center"}}>
          No completed task
        </div>)
      }

      {/* All Tab */}
      {
        isCompleted === false && todos.map((todo, index) => {
          return (
            <div key={index} className='rounded mt-2 p-1' style={{backgroundColor: todo.completed ? "#9D71BC" : "transparent", 
            border: todo.completed ? "solid white 1px" : "solid white 2px",
            color: "white", display: "grid", gridTemplateColumns: "80% 20%"}}>

              <div className='me-auto' style={{width: "100%", display: "grid", gridTemplateColumns: "5% 93%", textDecoration: todo.completed ? "line-through" : "none"}}>
                <div style={{width: "100%", alignContent: "center"}}>
                  <i className= {"me-2 h5 " + (todo.completed ? "bi bi-check-square-fill" : "bi bi-square")} style={{cursor: "pointer", 
                  fontStyle: "normal", textTransform: "uppercase"}} 
                  onClick={() => changeTaskStatus(todo.task)}> </i> 
                </div>

                <div style={{fontSize: "12px", width: "100%", textAlign: "left",
                  display: "grid", gridTemplateRows: "45% 40%", marginLeft: "1%", alignContent: "center"
                }}>
                  <div style={{height: "100%", textTransform: "uppercase", cursor: "pointer"}} onClick={() => openEditModal(todo)}>
                    <i><h5>{todo.task}</h5></i>
                  </div>
                  <div style={{height: "100%", color: "rgba(245, 245, 245, 0.822)", marginLeft: "4px"}}>
                    {"Created On: " + todo.createdOn}
                  </div>
                </div>
              </div>

              <div style={{textAlign: "end", alignContent: "center"}}>
                <i className="bi bi-pencil-square me-2 h5" style={{cursor: "pointer"}}  onClick={() => openEditModal(todo)}></i>

                <i className="bi bi-trash3 h5 me-2" style={{cursor: "pointer"}} 
                onClick={() => confirmDelete(todo.task)}></i>
              </div>

            </div>
          )})
      }
      
      {/* Completed Tab */}
      {
        isCompleted === true && completedTodos.map((todo, index) => {
          return (
            <div key={index} className='rounded m-2 p-1 row text-white' style={{backgroundColor: todo.completed ? "#9D71BC" : "transparent", 
            border: todo.completed ? "solid white 1px" : "solid white 2px", textAlign: "left"}}>

              <div className='me-auto col-sm-8 text-uppercase letter-spacing' style={{alignContent: "center"}}>
                <i className= {"me-2 h5" + (todo.completed ? "bi bi-check-square-fill" : "bi bi-square")} 
                style={{cursor: "pointer", fontStyle: "normal", 
                textDecoration: todo.completed ? "line-through" : "none"}} 
                onClick={() => changeTaskStatus(todo.task)}> {todo.task}</i>
              </div>
                  
              <div className="d-grid col-sm-4" style={{height: "100%", gridTemplateRows: "50% 50%", fontSize: "12px", 
                textAlign: "left", justifyContent: "end"}}>
                <div style={{width: "100%"}}>
                  {"Created On: " + todo.createdOn}
                </div>

                <div style={{width: "100%"}}>
                  {"Completed On: " + todo.completedOn}
                </div>
          
              </div>     
            </div>
          )})
      }

      {/* Modals */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddTask}>
            <FloatingLabel controlId="floatingInput" label="Enter a task here" className="mb-3 text-secondary">
            <Form.Control type="text" placeholder="Todo" name="task"/>
            </FloatingLabel>
            <Modal.Footer className='mt-3'>
              <Button type="submit" style={{backgroundColor: "#5E1B89", border: "transparent"}}>Add</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary h3">Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={editTask.task} 
          onChange={(e) => setEditTask({ ...editTask, task: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" style={{backgroundColor: "#5E1B89", border: "transparent"}} onClick={handleSaveTask}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-secondary">
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: "#5E1B89", border: "transparent"}} data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={handleDeleteConfirmed}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4 position-relative">
        <button className="btn btn-outline-light me-4 p-0" onClick={() => checkAll()} style={{width: "100px"}}>
          <i className="bi bi-list-check h3"></i>
        </button>
        <button className="btn btn-outline-light p-1" style={{width: "100px"}} data-bs-toggle="modal" data-bs-target="#deleteAllModal">
          <i className="bi bi-trash3 h5 p-1"></i> All
        </button>
            
        <div className="modal fade text-secondary" id="deleteAllModal" tabindex="-1" aria-labelledby="deleteAllModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 classNAme="modal-title fs-5" id="exampleModalLabel">Delete All Tasks</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body text-start">
                Are you sure you want to delete all tasks?
              </div>

              <div class="modal-footer">
                <button type="button" className="btn text-white" style={{backgroundColor: "#5E1B89"}} 
                onClick={() => deleteAll()} data-bs-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>    
  )
}

export default Todo