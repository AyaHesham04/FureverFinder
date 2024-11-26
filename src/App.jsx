import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Signup from './pages/SignUpPage';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetDetails from './pages/PetDetailsPage';
import AddPet from './pages/AddPetPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/add-pet" element={<AddPet />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
