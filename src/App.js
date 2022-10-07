import { Routes , Route } from 'react-router-dom';
// import "./App.css";
import Login from "./Auth/Login";
import VerifyOtp from "./Auth/VerifyOtp";
import DynamicInput from './DynamicInput';
import Home from './Home';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/verifyotp" element={<VerifyOtp />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/dinput" element={<DynamicInput />}/>
      </Routes>
    </>
  );
}

export default App;
