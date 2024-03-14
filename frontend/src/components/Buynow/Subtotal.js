import React from 'react'
import { useEffect,useState } from 'react';

const Subtotal = ({items}) => {
    const [price, setPrice] = useState(0);


    const totalAmount = () => {
        let price = 0
        items.map((item) => {
            price += item.price.cost
        });
        setPrice(price)
    }

    
    useEffect(() => {
        totalAmount();
    }, [items]);

    return (
        <div className="sub_item">
            {/* {price} */}
            <h3>Subtotal ({items.length} items):<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>
        </div>
    )
}

export default Subtotal