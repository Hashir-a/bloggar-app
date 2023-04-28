import './App.css';
import Navbar from './components/layout/Navbar';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Landing from './components/Landing';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='login' Component={Signin} />
          <Route path='register' Component={Signup} />
          <Route path='landing' Component={Landing} />
          <Route path='dashboard' Component={Dashboard} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
