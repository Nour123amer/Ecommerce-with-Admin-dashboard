import { MdRestaurantMenu } from "react-icons/md";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Products() {
  let { products ,setProducts} = useContext(ProductContext);
  const [isOpen ,setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown =() =>{
    setIsOpen(!isOpen);
  }

  function filterByPrice(){
    let filtered = [...products].sort((a,b)=> b.price - a.price);
    setProducts(filtered);
  }

    function filterByName(){
    let filtered = [...products].sort((a,b)=> a.name.localeCompare(b.name));
    setProducts(filtered);
  }


 async function deleteProduct(id){

  try{
    let res = await fetch(`http://localhost:3000/products/${id}`,{
      method:"DELETE",
    })
        let filtered = [...products].filter((product)=>product.id !== id);
    setProducts(filtered);
    toast.success("Product deleted from the menu successfully!")
    setProducts(data);
  }catch(error){
    toast.error("Delete product failed!");
  }

  }
  

  return (
    <>
      <div className="bg-gray-50  px-8 py-6">
        <div className="flex justify-between ">
        <h2 className='text-2xl mb-8 flex gap-3'>
               <MdRestaurantMenu className="text-[#B0C3CC] text-[32px]" />
                    Products </h2>
        <div className="dropdown">
          <div tabIndex={0} role="button" onClick={()=>{toggleDropdown()}} className="btn m-1  bg-blue-200 text-blue-600 text-xl px-4 py-2 rounded-md ">
            Filter By
          </div>
         {isOpen &&  <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={()=>{filterByPrice()}}>Price</a>
            </li>
            <li>
              <a onClick={()=>{filterByName()}}>Name</a>
            </li>
          </ul>}
        </div>
      </div>

      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr className="p-2 border-b-2 border-gray-50 bg-white rounded-lg mb-4">
            <th className="w-1/10 p-6">Id</th>
            <th className="w-1/10 p-6">Name</th>
            <th className="w-1/10 p-6">Price</th>
            <th className="w-1/10 p-6">Category</th>
            <th className="w-1/10 p-6">quantity</th>
            <th className="w-1/10 p-6">Sale</th>
            <th className="w-1/10 p-6">Image</th>
            <th className="w-1/10 p-6">Update</th>
            <th className="w-1/10 p-6">Delete</th>
           
          </tr>
        </thead>
        <tbody className="w-full">
          {products
            ? products.map((product) => (
                <tr key={product.id} className="p-6  border-gray-50 bg-white ">
                  <td className="w-1/10 text-center p-4">{product.id}</td>
                  <td className="w-1/10 text-center p-4">{product.name}</td>
                  <td className="w-1/10 text-center p-4">{product.price}</td>
                  <td className="w-1/10 text-center p-4">{product.category}</td>
                   <td className="w-1/10 text-center p-4">{product.quantity}</td>
                    <td className="w-1/10 text-center p-4">{product.sale}</td>
                  <td className="w-1/10 text-center p-4"><img src={product.image} className=" h-[120px] w-full" alt="" /></td>
                  <td className="w-1/10 text-center p-4 ">
                    <Link
                      className="text-white  bg-amber-400 hover:border-0 px-2.5 py-1.5 text-lg rounded-md"
                      to={`/dashboard/products/${product.id}`}
                    >
                      
                      Update
                    </Link>
                  </td>
                
                  <td className="w-1/10 text-center p-4">
                    <button 
                    onClick={()=>{deleteProduct(product.id)}}
                    className="text-white bg-red-600 hover:border-0 px-2.5 py-1.5 text-lg rounded-md">
                      Delete
                    </button>
                  </td>
                  
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      </div>
    </>
  );
}
