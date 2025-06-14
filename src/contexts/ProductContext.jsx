import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let res = await fetch("http://localhost:3000/products");
    let data = await res.json();
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
}
