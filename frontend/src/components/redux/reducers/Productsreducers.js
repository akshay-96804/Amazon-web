const products = [];

const getProductsreducers = (state={products},action) => {
    switch(action.type){
        case "SUCCESS_GET_PRODUCTS":    
        return {products:action.payload}
        case "FAILURE_GET_PRODUCTS":    
            return {error:action.payload}
         default: return state   
    }
}

export default getProductsreducers;