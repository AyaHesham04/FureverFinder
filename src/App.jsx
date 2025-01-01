import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PetDetails from "./pages/PetDetailsPage";
import AddPet from "./pages/AddPetPage";
import UpdatePet from "./pages/UpdatePetPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-pet"
            element={
              <ProtectedRoute>
                <AddPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-pet"
            element={
              <ProtectedRoute>
                <UpdatePet />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
