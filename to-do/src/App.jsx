import './App.css'
import Todo from './components/todo/Todo'



function App() {

  return (
    <div className='container my-4'>
      <div div className='mx-auto p-4' style={{width: "800px", backgroundColor: "transparent", border: "solid white 4px", borderRadius: "12px"}}>
        <img className="mb-3" src="logo1.png" alt="" style={{height:55, width:230}}/>
        
      <Todo />
      
      </div>

      <div className='position-relative bottom-0 mt-4 text-white text-center'> 
        <div className='mb-2'>
          All Rights Reserved. © 2016 LexMeet, Inc.
        </div> 
        <a className='text-white me-2' href="https://www.facebook.com/LexMeet" target="_blank"><i className="bi bi-facebook h5"></i></a>
        <a className='text-white me-2' href="https://x.com/LexMeet" target="_blank"><i className="bi bi-twitter-x h5"></i></a>
        <a className='text-white me-2' href="https://www.linkedin.com/company/13284634/" target="_blank"><i className="bi bi-linkedin h5"></i></a>
        <a className='text-white me-2' href="https://www.instagram.com/lexmeet.legal.help/?hl=en" target="_blank"><i className="bi bi-instagram h5"></i></a>
        <a className='text-white me-2' href="https://www.youtube.com/results?search_query=lexmeet" target="_blank"><i className="bi bi-youtube h5"></i></a>
      </div>
    
    </div>
  )
}

export default App
