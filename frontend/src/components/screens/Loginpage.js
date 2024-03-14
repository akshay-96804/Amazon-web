import { useState,useContext } from 'react';
import React from 'react' ;
import '../screens/sign.css' ;
import { NavLink, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Logincontext } from '../../context/ContextProvider';


const Loginpage = () => {
    const {account,setAccount} = useContext(Logincontext);

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });


    const adddata = (e) => {
        const { name, value } = e.target;

        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const submitData = async(e)=>{
        e.preventDefault();

        const { email, password } = logdata;
        
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ ...logdata, email: "", password: "" })
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }
    }
  return (
    <section>
    <div className="sign_container">
        {/* <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="signupimg" />
        </div> */}
        <div className="sign_form">
            <form method='POST' onSubmit={submitData}>
                <h1>Sign-In</h1>

                <div className="form_data">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"
                        onChange={adddata}
                        value={logdata.email}
                        id="email" />
                </div>
                <div className="form_data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"
                        onChange={adddata}
                        value={logdata.password}
                        id="password" placeholder="At least 6 characters" />
                </div>
                <button type="submit" className="signin_btn">Continue</button>
            </form>
            <ToastContainer />
        </div>
        <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <NavLink to="/signup"><button> Create your Amazon Account</button></NavLink>
        </div>
    </div>

</section>
  )
}

export default Loginpage