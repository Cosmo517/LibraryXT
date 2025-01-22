import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/common/Navbar';
import { Search } from "./pages/search/Search";
import { Home } from "./pages/home/Home"
import { Create } from './pages/create/Create';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </Router>
  )
}

export default App
