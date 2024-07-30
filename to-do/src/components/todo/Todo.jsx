import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

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
    
    
  }

  function changeTaskStatus(index) {
    let newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
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
  
  return (
    <div className='container my-5'>
      <div className='mx-auto p-4' style={{width: "800px", backgroundColor: "transparent", border: "solid white 4px", borderRadius: "12px"}}>
          <img className="mb-5" src="logo.png" alt="" style={{height:50, width:200}}/>
          {/* <p className='text-white mb-5'>TODO APP</p> */}

          <form className="d-flex mb-5" onSubmit={AddTask}>
            <input className="form-control me-2" placeholder="Add a Task" name='task'/>
            <button className="btn btn-outline-light me-2" type="submit"><i className="bi bi-plus-lg"></i></button>
            <button className="btn btn-outline-light"><i className="bi bi-bookmarks-fill"></i></button>
          </form>

          {
            todos.map((todo, index) => {
              return (
                <div key={index} className='rounded mt-2 p-2 d-flex' style={{backgroundColor: todo.completed ? "#FF7F4D" : "transparent", 
                border: todo.completed ? "solid white 1px" : "solid white 2px",
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
                    <i className="bi bi-trash3 h5" style={{cursor: "pointer"}} onClick={() => deleteTask(index)}></i>
                  </div>
                </div>
              )
            })
          }
      </div>
    </div>
    
  )
}

export default Todo