import { useContext } from "react";
import React from 'react';
import { Logincontext } from "../../context/ContextProvider";
import { ToastContainer, toast } from 'react-toastify';

const Option = ({removedata,id}) => {
const { account, setAccount } = useContext(Logincontext);

const deleteData = async()=>{
    console.log(id);

    try {
        const res = await fetch(`remove/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status === 400 || !data) {
            console.log("error in removing");
        } else {
            setAccount(data)
            toast.success("Item remove from cart 😃!", {
                position: "top-center"
            });

            removedata();
        }
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div className="add_remove_select" key={id}>
    <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <p onClick={() => deleteData()} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
    <p className="forremovemedia">Save Or Later</p><span>|</span>
    <p className="forremovemedia">See More like this</p>
    <ToastContainer />
</div>
  )
}

export default Option