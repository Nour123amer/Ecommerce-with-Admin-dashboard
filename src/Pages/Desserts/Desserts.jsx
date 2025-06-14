import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';

export default function Desserts() {
    //   const [productSale ,setProductSale] = useState([]);
        const {products} = useContext(ProductContext);
    
        console.log(products)
        const dessertProduct = products.filter((product)=> product.category=== "Desserts" ? product : null);
        console.log(dessertProduct);
    
        // useEffect(()=>{
        //     setProductSale(dessertProduct)
        // }
        // ,[])
        

  return (
    <>
      <div className='grid grid-cols-12 gap-4'> 
    {
        dessertProduct && dessertProduct.map((product)=> 
        
              <Link to={`/blog/${product.id}`}
              key={product.id}
              className="border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden col-span-3"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2
                  className="text-xl font-semibold"
                >
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p>Price : {product.price}</p>
                <p>Discount : {product.sale}</p>
              </div>
            </Link>
        )
    }
    </div>
    </>
  )
}
