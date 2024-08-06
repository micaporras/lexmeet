import { useEffect, useState } from 'react';
import './Todo.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';





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
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const [isCompleted, setCompleted] = useState(false)
  const [completedTodos, setCompletedTodos] = useState(getStoredCompletedTodos())
 
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  
  const [editTask, setEditTask] = useState({ task: '', deadlineOn: new Date() })
  const [editTaskOriginal, setEditTaskOriginal] = useState(null)
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null)


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
    let createdOn = formatDate(dateCreated)
    let deadlineOn = formatDate(selectedDate)

    if (!task) {
      toast.error("Please input a task", {
        icon: <i className="bi bi-exclamation-circle-fill h4" style={{color: "#F4512C"}}></i>,
      })
      return
    }

    setTodos([...todos, {task:task, completed: false, createdOn, deadlineOn, completedOn: ""}])

    toast.success("New task added on " + createdOn, {
    icon: <i className="bi bi-emoji-laughing-fill h4" style={{color: "#5E1B89"}}></i>
    })

    event.target.reset()
    setShowAddModal(false)
    
  }

  function formatDate(date) {
    let day = date.getDate()
    let month = monthNames[date.getMonth()]
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let detectAmPm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12
    minute = minute < 10 ? '0' + minute : minute
    return `${month} ${day}, ${year} ${hour}:${minute} ${detectAmPm}`
  }

  function openDetailsModal(task) {
    setSelectedTaskDetails(task);
    setShowDetailsModal(true);
  }

  function changeTaskStatus(task) {
    let newTodos = [...todos];
    let newCompletedTodos = [...completedTodos];
  
    let todo = newTodos.find(t => t.task === task);
  
    if (todo) {
      if (!todo.completed) {
        todo.completed = true;
        todo.completedOn = formatDate(new Date());
        setTodos(newTodos);
  
        handleCompleted(task);
      } else {
        todo.completed = false;
        todo.completedOn = "";
        setTodos(newTodos);
  
        let completedTodoIndex = newCompletedTodos.findIndex(t => t.task === task);
        if (completedTodoIndex !== -1) {
          newCompletedTodos.splice(completedTodoIndex, 1);
          setCompletedTodos(newCompletedTodos);
        }
      }
    } else {
      let completedTodo = newCompletedTodos.find(t => t.task === task);
      if (completedTodo) {
        completedTodo.completed = !completedTodo.completed;
        if (completedTodo.completed) {
          completedTodo.completedOn = formatDate(new Date());
          newTodos.push(completedTodo);
          setTodos(newTodos);
        } else {
          let completedTodoIndex = newCompletedTodos.findIndex(t => t.task === task);
          if (completedTodoIndex !== -1) {
            newCompletedTodos.splice(completedTodoIndex, 1);
            setCompletedTodos(newCompletedTodos);
          }
        }
      }
    }
    toast.success("Task Updated", {
      icon: <i className="bi bi-hand-thumbs-up-fill h3" style={{color: "#5E1B89"}}></i>
      })
  }
  

  function checkAll() {
    let newTodos = [...todos]

    let completedOn = formatDate(new Date())

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
    let completedOn = formatDate(new Date());
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
    setEditTask({ task: task.task, deadlineOn: new Date(task.deadlineOn) })
    setEditTaskOriginal(task)
    setShowEditModal(true)
  }

  function handleSaveTask() {
    let updatedTodos = todos.map(todo => 
        todo.task === editTaskOriginal.task ? { ...todo, task: editTask.task, deadlineOn: formatDate(editTask.deadlineOn) } : todo
    );
    setTodos(updatedTodos)

    let updatedCompletedTodos = completedTodos.map(todo => 
        todo.task === editTaskOriginal.task ? { ...todo, task: editTask.task, deadlineOn: formatDate(editTask.deadlineOn) } : todo
    );
    setCompletedTodos(updatedCompletedTodos)

    setShowEditModal(false)
    setEditTask({ task: '', deadlineOn: new Date() })
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
        <div className="row m-1 me-0 pe-0 w-100">
          <div className="navbar-brand text-white me-0 col-sm-7" style={{ textAlign: "center", fontWeight: "bold", 
          border: "solid white 2px", borderTopRightRadius: "10px", borderBottom: "transparent", position:"relative"}}>
            TODO LIST
          </div>

          <div className="collapse navbar-collapse col-sm-4 m-0 p-0" id="navbarSupportedContent" 
          style={{justifyContent: "start", borderBottom: "solid white 2px"}}>
            <ul className="nav w-100" style={{width: "100%", display: "grid", gridTemplateColumns: "50% 50%"}}>
              <li className={`nav-item ${isCompleted=== false && 'active'}`} onClick={() => setCompleted(false)} style={{width: "100%"}}>
                <a className="nav-link text-white" aria-current="page">All</a>
              </li>
              <li className={`nav-item ${isCompleted=== true && 'active'}`} onClick={() => setCompleted(true)} style={{width: "100%"}}>
                <a className="nav-link text-white">Completed</a>
              </li>
            </ul>
          </div>
          
          {/* The Add Task button */}
          <div className="col-sm-1 pe-0 btn-add-task-container" style={{alignContent: "center", justifyItems: "end"}}>
              <button className="btn btn-outline-light p-0 btn-add-task" style={{width: "100%"}} 
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
            <div key={index} className='rounded mt-2 p-1' style={{backgroundColor: todo.completed ? "#5E1B89" : "transparent", 
            border: todo.completed ? "solid white 1px" : "solid white 2px",
            color: "white", display: "grid", gridTemplateColumns: "80% 20%"}}>

              <div className='me-auto todo-item-content' style={{width: "100%", display: "grid", gridTemplateColumns: "5% 93%", textDecoration: todo.completed ? "line-through" : "none"}}>
                <div style={{width: "100%", alignContent: "center"}}>
                  <i className= {"me-2 h5 " + (todo.completed ? "bi bi-check-square-fill" : "bi bi-square")} style={{cursor: "pointer", 
                  fontStyle: "normal"}} 
                  onClick={() => changeTaskStatus(todo.task)}> </i> 
                </div>

                <div className="todo-container" style={{fontSize: "12px", width: "100%", textAlign: "left",
                  display: "grid", gridTemplateRows: "50% 40%", marginLeft: "1%", alignContent: "center"
                }}>
                  <div className="todo-item-details" style={{height: "100%", cursor: "pointer"}} onClick={() => openDetailsModal(todo)}>
                    <i><h5>{todo.task}</h5></i> 
                  </div>
                  <div className="todo-item-details" style={{height: "100%", color: "rgba(245, 245, 245, 0.822)"}}>
                    <div>{"Deadline: " + todo.deadlineOn}</div>
                    
                  </div>
                </div>
              </div>

              <div className="todo-item-icons" style={{textAlign: "end", alignContent: "center"}}>
                <i className="bi bi-info-circle me-2 h5" style={{cursor: "pointer"}} onClick={() => openDetailsModal(todo)}></i>
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
            <div key={index} className='rounded m-2 p-1 row text-white todo-container1' style={{backgroundColor: todo.completed ? "#5E1B89" : "transparent", 
            border: todo.completed ? "solid white 1px" : "solid white 2px", textAlign: "left"}}>

              <div className='me-auto col-sm-8 letter-spacing' style={{alignContent: "center"}}>
                <i className= {"me-2 h5" + (todo.completed ? "bi bi-check-square-fill" : "bi bi-square")} 
                style={{cursor: "pointer", fontStyle: "normal", 
                textDecoration: todo.completed ? "line-through" : "none"}} 
                onClick={() => changeTaskStatus(todo.task)}> {todo.task}</i>
              </div>
                  
              <div className="d-grid col-sm-4 todo-item-details1" style={{height: "100%", gridTemplateRows: "50% 50%", fontSize: "12px", 
                textAlign: "left", justifyContent: "end"}}>
                <div style={{width: "100%"}}>
                  {"Created on: " + todo.createdOn}
                </div>

                <div style={{width: "100%"}}>
                  {"Completed on: " + todo.completedOn}
                </div>
          
              </div>     
            </div>
          )})
      }

      <div className="mt-4 position-relative">
        <button className="btn btn-outline-light me-4 p-0" onClick={() => checkAll()} style={{width: "100px"}}>
          <i className="bi bi-list-check h3"></i>
        </button>
        <button className="btn btn-outline-light p-1" style={{width: "100px"}} data-bs-toggle="modal" data-bs-target="#deleteAllModal">
          <i className="bi bi-trash3 h5 p-1"></i> All
        </button>
      </div>

      {/* Modals */}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddTask}>
            <FloatingLabel controlId="floatingInput" label="Enter a task here" className="mb-3 text-secondary">
              <Form.Control type="text" placeholder="Todo" name="task" />
            </FloatingLabel>
            <label className="text-secondary ms-1 me-2">Deadline</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              todayButton = "Today"
              className="form-control text-secondary"
              onCalendarClose={() => {
                if (selectedDate.toDateString() === new Date().toDateString()) {
                  setSelectedDate(new Date());
                }
              }}
            />
            <Modal.Footer className='mt-3'>
              <Button type="submit" style={{ backgroundColor: "#5E1B89", border: "transparent" }}>Add</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-secondary">Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-secondary">
          {selectedTaskDetails && (
            <>
              <h3 className="mb-3 text-center"><strong>{selectedTaskDetails.task}</strong></h3>
              <p><strong>Date Created:</strong> {selectedTaskDetails.createdOn}</p>
              <p><strong>Deadline:</strong> {selectedTaskDetails.deadlineOn}</p>
              {selectedTaskDetails.completed && (
                <p><strong>Status:</strong> Completed on {selectedTaskDetails.completedOn}</p>
              )} 
              {!selectedTaskDetails.completed && (
                <p><strong>Status:</strong> Not Completed</p>
              )
                
              }
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Modal className="text-secondary"show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title >Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control text-secondary mb-2 fw-bold" value={editTask.task} 
          onChange={(e) => setEditTask({ ...editTask, task: e.target.value })} />
          <label className="text-secondary ms-1 me-2">Deadline</label>
          <DatePicker
              selected={editTask.deadlineOn}
              onChange={(date) => setEditTask({ ...editTask, deadlineOn: date })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="form-control mb-3 text-secondary"
            />
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

      <div className="modal fade text-secondary modal-fade" id="deleteAllModal" tabindex="-1" aria-labelledby="deleteAllModalLabel" aria-hidden="true">
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
  )
}

export default Todo