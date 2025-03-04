import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import Users from './pages/UsersPage';
import Product from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;