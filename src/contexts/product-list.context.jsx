import { createContext, useState } from "react";
import SHOP_DATA from "../shop-data.json";

export const ProductListContext = createContext({ productList: []
});

export const ProductListProvider = ({children}) => {
    const [productList, setProductList] = useState(SHOP_DATA);
    const value = {productList};

    return <ProductListContext.Provider value={value}>{children}</ProductListContext.Provider>
}