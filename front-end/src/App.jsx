import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import Users from './pages/UsersPage';
import Product from './pages/ProductsPage';
import LogOut from './pages/LogoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Product />} />
        <Route path='/logout' element={<LogOut />} />
      </Routes>
    </Router>
  );
}

export default App;