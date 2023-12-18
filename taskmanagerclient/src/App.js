import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashbrd from './components/Dashbrd';

function App() {
  
  return (
   <>
   <div >
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Home/>}/>
      <Route path='/dash' element={<Dashbrd/>}/>
      
    </Routes>
    </BrowserRouter>
   </div>
   </>
  );
}

export default App;
