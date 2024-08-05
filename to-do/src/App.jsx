import './App.css'
import Todo from './components/todo/Todo'



function App() {

  return (
    <div className='container my-4'> {/* The whole container */}
      {/* The LexMeet logo */}
      <div div className='mx-auto p-4' style={{width: "90%", backgroundColor: "transparent", border: "solid white 4px", borderRadius: "12px"}}>
        <a href="https://lexmeet.com/" target="_blank"><img className="mb-3" src="logo1.png" style={{height:50, width:230, cursor: "pointer"}}/></a>
        
        <Todo /> 

        {/* Footer */}
        <div className='position-relative bottom-0 mt-5 text-white text-center p-2' style={{borderTop: "solid white 3px"}}> 
          <div className='mt-2 mb-2'>
            LexMeet, Inc.
          </div>
          
          <a className='text-white me-2' href="https://www.facebook.com/LexMeet" target="_blank"><i className="bi bi-facebook h5"></i></a>
          <a className='text-white me-2' href="https://x.com/LexMeet" target="_blank"><i className="bi bi-twitter-x h5"></i></a>
          <a className='text-white me-2' href="https://www.linkedin.com/company/13284634/" target="_blank"><i className="bi bi-linkedin h5"></i></a>
          <a className='text-white me-2' href="https://www.instagram.com/lexmeet.legal.help/?hl=en" target="_blank"><i className="bi bi-instagram h5"></i></a>
          <a className='text-white me-2' href="https://www.youtube.com/results?search_query=lexmeet" target="_blank"><i className="bi bi-youtube h5"></i></a>
          
          <div className='mt-2'>
            All Rights Reserved.
          </div> 
        </div>
      
      </div>
    </div>
  )
}

export default App
