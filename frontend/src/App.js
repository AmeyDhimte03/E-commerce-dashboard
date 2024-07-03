import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateComponent';
import Profile from './components/Profile';
import ContactUs from './components/ContactUs';
//this project is functional component based

function App() {
  return (
  <div className="App">    
      <BrowserRouter >
      <Nav />
     <Routes>
       <Route element={<PrivateComponent />}>
       <Route path="/" element={<ProductList />} />
       <Route path="/add" element={<AddProduct />} />
       <Route path="/update/:id" element={<UpdateProduct />} />
       <Route path="/logout" element={<h1> Logout Component</h1>} />
       <Route path="/profile" element={<Profile/>} />
       </Route>

       <Route path="/signup" element={<SignUp />} />
       <Route path="/login" element={<Login />} />
      <Route path="/contactus" element={<ContactUs/>}/>
     </Routes>
     </BrowserRouter>
     <Footer />{/*Iske andar routing nhi lagayi thi toh BrowserRouter k bahr rakhdo no issues*/}
    </div>
  );
}

export default App;
