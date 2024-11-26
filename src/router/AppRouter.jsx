import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from '../pages/StartPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import PetDetailsPage from '../pages/PetDetailsPage';
import AddPetPage from '../pages/AddPetPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pet/:id" element={<PetDetailsPage />} />
        <Route path="/add-pet" element={<AddPetPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
