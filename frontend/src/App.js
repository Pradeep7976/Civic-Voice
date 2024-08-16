// eslint-disable-next-line
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

////////////////////////////////

import Home from "./components/Home_Page/Home";
import Loginp from "./components/login/Loginp";
import SignUp from "./components/Sign_up/Signup";
import LOP from "./components/List_of_Problems/LOP";
import LOD from "./components/List_of_Departments/LOD";
import Profile from "./components/Edit_Profile/Edit_Profile";
import Temp from "./components/Temp/Temp";
import Pdetails from "./components/Problem_Details/Pdetails";
import Thank from "./components/Thank_You/Thank_You";
import Department from "./components/Department_Page/Department";
import Probdetails from "./components/Department_Problem_Details/DepProbDetails";
import DeptLogin from "./components/Department_login/Loginp";
import UserProblems from "./components/User_Problems/UserProblem";
import Popup from "./components/Problem_Details/PopUp/Popup";
import Rating from "./components/Feedback/form/Rating";
import Feedback from "./components/Feedback/show/Feedback";
/////////////////////////////////
function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Loginp />} />
            <Route path="/regester" element={<SignUp />} />
            <Route path="/reportprob" element={<LOP />} />
            <Route path="/reportprob/:probname" element={<LOD />} />
            <Route path="/reportprob/:probname/:dept" element={<Pdetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/greet/:id" element={<Thank />} />
            <Route path="/dept/:department" element={<Department />} />
            <Route path="/probdetails/:pid" element={<Probdetails />} />
            <Route path="/dept/login" element={<DeptLogin />} />
            <Route path="/userproblems/:uid" element={<UserProblems />} />
            <Route path="/feedback" element={<Rating />} />
            <Route path="/feedback/all" element={<Feedback />} />
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}
export default App;
