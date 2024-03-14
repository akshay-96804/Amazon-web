import logo from './logo.svg';
import './App.css';
import Navbar from './components/Header/Navbar';
import MainComp from './components/Home/MainComp';
import NewNavbar from './components/NewNavbar/NewNavbar';
import Footer from './components/Footer/Footer';
import { Routes,Route} from 'react-router-dom';
import Loginpage from './components/screens/Loginpage';
import RegisterPage from './components/screens/RegisterPage';
import Cart from './components/Cart/Cart';
import Buynow from './components/Buynow/Buynow';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <NewNavbar></NewNavbar>
     <Routes>
      <Route path="/" element={<MainComp></MainComp>}></Route>
      <Route path="/login" element={<Loginpage></Loginpage>}></Route>
      <Route path="/signup" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/getproductsone/:id" element={<Cart></Cart>}></Route>
      <Route path="/buynow" element={<Buynow></Buynow>}></Route>
    </Routes>
    <Footer></Footer>
    </>
  );
}

export default App;
