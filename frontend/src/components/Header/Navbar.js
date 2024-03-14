import {React} from 'react' 
import "./navbar.css" ;
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../../context/ContextProvider';
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import logo from "./amazon.png" ;



const Navbar = () => {
    const {account,setAccount} = useContext(Logincontext);



    const history = useNavigate();

    const [text, setText] = useState();
    const [liopen, setLiopen] = useState(true);

    console.log(text);

    // only for search
    const { products } = useSelector(state => state.getproductsdata);
    // console.log("it is"+account);

    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("first login");
        } else {
            setAccount(data);
        }
    }

    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (!res2.status === 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            
            // setOpen(false)
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            setAccount(false);
            history("/");
        }
    }

    useEffect(() => {
       getdetailsvaliduser();
    }, [])

    const getText = (e)=>{
        setText(e.target.value);
        setLiopen(false);
    }
    


  return (
    <header>
        <nav>
            <div className="left">
            <div className="navlogo">
                        <NavLink to="/"> <img src={logo} alt="logo" /> </NavLink>
                    </div>
                <div className="nav_searchbaar">
                    <input type="text" placeholder='Search your products' onChange={getText} value={text}/>
                    <div className="search_icon">
                        <SearchIcon/>
                    </div>
                    {text && <List className='extrasearch' hidden={liopen}>
                        {
                              products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                <ListItem>
                                    <NavLink to={`/getproductsone/${product.id}`} onClick={()=>{
                                        setLiopen(true)
                                        setText("")
                                    }}>
                                        {product.title.longTitle}
                                    </NavLink>
                                </ListItem>
                            ))
                        }
                        </List>}
                </div>
            </div>
            <div className="right">
                <div className='nav_btn'>
                    {/* {account?<NavLink ></NavLink>} */}
                {account ?<Button variant="outlined" onClick={logoutuser}>Sign out</Button>
:<Link to = "/login" href="">Sign in</Link>}
                </div>
                <div className="cart_btn">
               {account?
               <NavLink to="/buynow">
               {account.carts?<Badge badgeContent={account.carts.length} color="primary" >
                    <ShoppingCartIcon id="icon" />
                </Badge>:<Badge badgeContent={0} color="primary" >
                    <ShoppingCartIcon id="icon" />
                </Badge>}
               </NavLink>
               :<NavLink to="/login">
               <Badge color="primary" >
                    <ShoppingCartIcon id="icon" />
                </Badge>
               </NavLink>}
                 
                </div>
                {account?
                 <Avatar className="avtar2"
                 onClick={()=>{}} title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                <Avatar className="avtar"
                onClick={()=>{}} />
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar