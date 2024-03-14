import React, { useState } from 'react' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterPage = () => {
    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
    });

    // console.log(udata);

    const adddata = (e) => {
        const { name, value } = e.target;

        setUdata((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const submitData = async(e)=>{
        e.preventDefault();

        const { fname, email, mobile, password} = udata;
        
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password
                })
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setUdata({
                    ...udata, fname: "", email: "",
                    mobile: "", password: ""
                });
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("front end ka catch error hai" + error.message);
        }
    }


  return (
    <section>
    <div className="sign_container">
        {/* <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="signupimg" />
        </div> */}
        <div className="sign_form">
            <form onSubmit={submitData}>
                <h1>Register</h1>

                <div className="form_data">
                <label htmlFor="Your name">Name</label>
                    <input type="text" name="fname"
                        onChange={adddata}
                        value={udata.fname}
                        id="fname" />
                  </div>
                  <div className="form_data">     
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"
                        onChange={adddata}
                        value={udata.email}
                        id="email" />
                </div>
                <div className="form_data">     
                    <label htmlFor="number">Mobile</label>
                    <input type="text" name="mobile"
                        onChange={adddata}
                        value={udata.mobile}
                        id="contact" />
                </div>
                <div className="form_data">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"
                        onChange={adddata}
                        value={udata.password}
                        id="password" placeholder="At least 6 characters" />
                </div>
                <button type="submit" className="signin_btn">Continue</button>
            </form>
            <ToastContainer />
        </div>
    </div>

</section>
  )
}

export default RegisterPage