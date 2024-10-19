import "./App.css";
import ConsultantRegister from "./Component/ConsultantRegister";
import ConsultantSignUp from "./Component/ConsultantSignUp";
import ConsultantDashboard from "./Component/ConsultantDashboard";
import VendorSignin from "./Component/VendorSignin";
import VendorSignup from "./Component/VendorSignup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const { isLoggedIn } = useSelector((state) => state);

  return (
    <Router>
      <div>
        {!isLoggedIn ? (
          <Routes>
            <Route path="/" element={<ConsultantRegister />} />
            <Route path="/signup" element={<ConsultantSignUp />} />
            <Route path="/vsignin" element={<VendorSignin />} />
            <Route path="/vsignup" element={<VendorSignup />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <ConsultantDashboard /> : <Navigate to="/" />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
