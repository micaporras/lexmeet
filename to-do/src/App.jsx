import './App.css'
import Todo from './components/todo/Todo'



function App() {

  return (
    <div className='container my-4'>
      <div div className='mx-auto p-4' style={{width: "800px", backgroundColor: "transparent", border: "solid white 4px", borderRadius: "12px"}}>
        <img className="mb-3" src="logo1.png" alt="" style={{height:55, width:230}}/>
        
      <Todo />
      
      </div>
    
    </div>
  )
}

export default App
