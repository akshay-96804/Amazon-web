import {React,useEffect} from 'react'
import Banner from './Banner'
import "./home.css" ;
import Slide from './Slide';
import getProducts from "../redux/actions/action.js" ;
import {useDispatch,useSelector} from "react-redux" ;

const MainComp = () => {
    const { products } = useSelector(state => state.getproductsdata);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])  
    
    

  return (
    <div className="home_section">
    <div className="banner_part">
        <Banner/>
    </div>
    <Slide title="Today's deals" products={products}/>
    {/* <div className="slide_part">
        <div className="left_slide">
            <Slide title="Deal Of The Day" products={products} />
        </div>
    </div>

    {/* <div className="center_img">
        <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
    </div> */}

    <Slide title="Best Seller" products={products}/>
    <Slide title="Upto 80% off" products={products}/>
</div>
  )
}

export default MainComp