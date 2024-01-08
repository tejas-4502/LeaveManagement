import './App.css';
import Home from './components/common/home';
import Login from './components/common/login';
import Register from './components/common/register';
import ApplyLeave from './components/user/applyLeave';
import MyLeave from './components/user/myleave';
import Employees from './components/admin/employees';
import Leavetype from './components/admin/leavetype';
import Leaverequest from './components/admin/leaverequest';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/homeadmin" element={<Home admin />} />
          <Route path="/homeuser" element={<Home user />} />
          <Route path="/home" element={<Home />} />
          <Route path="" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/applyleave" element={<ApplyLeave />} />
          <Route path="/myleave" element={<MyLeave />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leavetype" element={<Leavetype />} />
          <Route path="/leaverequest" element={<Leaverequest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
