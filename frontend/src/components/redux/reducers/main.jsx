import {combineReducers} from "redux"; 
import getProductsreducers from "./Productsreducers.js";

const rootReducers = combineReducers({
    getproductsdata:getProductsreducers
});

export default rootReducers ;