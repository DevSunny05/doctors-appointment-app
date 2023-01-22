import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import Booking from "./pages/Booking";
import Appointment from "./pages/Appointment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="/apply-doctor" element={<ProtectedRoutes><ApplyDoctor /></ProtectedRoutes>} />
            <Route path="/notification" element={<ProtectedRoutes><Notification /></ProtectedRoutes>} />
            <Route path="/admin/users" element={<ProtectedRoutes><Users /></ProtectedRoutes>} />
            <Route path="/admin/doctors" element={<ProtectedRoutes><Doctors /></ProtectedRoutes>} />
            <Route path="/doctor/profile/:id" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path="/doctor/book-appointment/:doctorId" element={<ProtectedRoutes><Booking /></ProtectedRoutes>} />
            <Route path="/appointments" element={<ProtectedRoutes><Appointment /></ProtectedRoutes>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
