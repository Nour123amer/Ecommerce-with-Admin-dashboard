// import React, { useContext, useState } from "react";
// import { ProductRateContext } from "../../contexts/Rate";
// import { ProductStyleContext } from "../../contexts/ProductStyle";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { CounterContext } from "../../contexts/CounterContext";
// import { CartContext } from "../../contexts/CartContext";
// import { FaMinus, FaPlus } from "react-icons/fa6";
// import { ProductCountContext } from "./../../contexts/ProductCountContext";
// import toast from "react-hot-toast";
// import { NumberOfItemsContext } from "../../contexts/NumberOfOrders";

// export default function Details() {
//   const [productDetails, setProductDetails] = useState();
//   const { renderedStars } = useContext(ProductRateContext);
//   const { counter, setCounter } = useContext(CounterContext);
//   const { cartItems, setCartItems } = useContext(CartContext);
//   const { productCount } = useContext(ProductCountContext);
//   const {numberOfItems ,setNumberOfItems} = useContext(NumberOfItemsContext);

//   const { fontSize, mealColor, borderRaduis } = useContext(ProductStyleContext);

//   let { id } = useParams();
//   console.log(productDetails);

//   async function getProductDetails() {
//     let res = await fetch(`http://localhost:3000/products/${id}`);
//     let data = await res.json();

//     setProductDetails(data);

//     console.log("product details =>", data);
//   }

//   useEffect(() => {
//     getProductDetails();
//   }, []);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`http://localhost:3000/products/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productDetails),
//       });

//       const updated = await res.json();

//       setProductDetails(updated);

//       toast.success("Product updated successfully!", {
//         duration: 4500,
//       });
//     } catch (error) {
//       console.log("error =>", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setProductDetails((prev) => ({
//       ...prev,
//       [name]: name === "price" ? Number(value) : value,
//     }));
//   };

//    const orderTotal = cartItems?.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   async function addOrderTOCart(
//     userId,
//     productId,
//     numberOfItems,
//     totalPrice,
//     status,
//     date
//   ) {
//     const res = await fetch("http://localhost:3000/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId,
//         productId,
//         numberOfItems,
//         totalPrice: orderTotal,
//         status,
//         date,
//       }),
//     });

//     setCartItems((prev) => [
//       ...prev,
//       {...productDetails,
//         quantity: numberOfItems,
//       totalPrice: orderTotal
//       }
//     ]);
//   }

//   console.log("cart items ==>", cartItems);

//   const increaseOrder = () => {
//     setNumberOfItems((prev) => prev + 1);
//     console.log( "prduct count ==> ", productCount)
//   };

//   const decreaseOrder = () => {
//     setNumberOfItems((prev) => prev - 1);
//   };



//   return (
//     <>
//       <div className="flex justify-between">
//         {productDetails ? (
//           <form
//             onSubmit={handleUpdate}
//             key={productDetails.id}
//             className="sm:w-[90%] sm:mx-auto md:mx-0  md:w-1/2 lg:w-1/4 pb-6  shadow hover:shadow-md transition overflow-hidden"
//             style={{
//               fontSize: `${fontSize}px`,
//               borderRadius: `${borderRaduis}px`,
//             }}
//           >
//             <img
//               src={productDetails.image}
//               alt={productDetails.name}
//               className="w-full h-[300px] object-cover mb-4"
//             />

//             <input
//               disabled={true}
//               className={`   mb-2 mx-3 w-[90%] p-2 text-xl font-semibold `}
//               style={{ color: mealColor.hex }}
//               name="name"
//               value={productDetails.name}
//               onChange={handleChange}
//             />
//             <br />
//             <input
//               disabled={true}
//               className="  mb-2 mx-3 w-[90%] p-2 text-gray-600 text-sm"
//               value={productDetails.description}
//               name="description"
//               onChange={handleChange}
//             />
//             <br />
//             <label className="px-4" htmlFor="">
//               Product Price :
//             </label>
//             <input
//               disabled={true}
//               className="   mb-2 mx-3 w-[40%] p-2 text-xl font-semibold"
//               type="text"
//               name="price"
//               value={productDetails.price}
//               onChange={handleChange}
//             />
//             <br />

//             <div className="flex gap-2 items-center">
//               <span className="px-4" htmlFor="">
//                 Product Rate :
//               </span>

//               <span className="flex gap-1 px-2">
//                 {renderedStars(productDetails.rating)}
//               </span>
//             </div>
//             <br />

//             <div className="flex items-center justify-between px-8">
//               <button
//                 type="button"
//                 className="px-7 py-2 rounded-md bg-green-700 text-white  font-semibold"
//                 onClick={async (e) => {
//                   e.preventDefault();
//                   const newCounter = counter + 1;
//                   setCounter(newCounter);

//                   if(numberOfItems <= 0){
//                     toast.error("Select at least one product!");
//                     return;
//                   }
//                   // setCartItems([...cartItems, {...productDetails ,quantity:numberOfItems}]);
//                   console.log(productDetails.price);
//                   console.log("counter ==>", counter);
//                   try {
//                     await addOrderTOCart(
//                       95,
//                       productDetails.id,
//                       numberOfItems,
//                       productDetails.price,
//                       "pending",
//                       new Date().toISOString().split("T")[0]
//                     );
//                   } catch (error) {
//                     toast.error("failed to add product to cart.");
//                   }
//                 }}
//               >
//                 Order
//               </button>
//               <div className="flex items-center gap-8 text-xl">
//                 <FaMinus
//                   onClick={() => {
//                     decreaseOrder();
//                   }}
//                 />
//                 <span>{numberOfItems}</span>

//                 <FaPlus
//                   onClick={() => {
//                     increaseOrder();
//                   }}
//                 />
//               </div>
//             </div>
//           </form>
//         ) : (
//           "loading..."
//         )}
//       </div>
//     </>
//   );
// }


"use client"

import { useContext, useState } from "react"
import { ProductRateContext } from "../../contexts/Rate"
import { ProductStyleContext } from "../../contexts/ProductStyle"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { CounterContext } from "../../contexts/CounterContext"
import { CartContext } from "../../contexts/CartContext"
import { FaMinus, FaPlus } from "react-icons/fa6"
import toast from "react-hot-toast"
import { NumberOfItemsContext } from "../../contexts/NumberOfOrders"

export default function Details() {
  const [productDetails, setProductDetails] = useState()
  const { renderedStars } = useContext(ProductRateContext)
  const { counter, setCounter } = useContext(CounterContext)
  const { cartItems, setCartItems } = useContext(CartContext)
  const { numberOfItems, setNumberOfItems } = useContext(NumberOfItemsContext)

  const { fontSize, mealColor, borderRaduis } = useContext(ProductStyleContext)

  const { id } = useParams()

  async function getProductDetails() {
    const res = await fetch(`http://localhost:3000/products/${id}`)
    const data = await res.json()
    setProductDetails(data)
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      })

      const updated = await res.json()
      setProductDetails(updated)
      toast.success("Product updated successfully!", {
        duration: 4500,
      })
    } catch (error) {
      console.log("error =>", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setProductDetails((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  async function addOrderTOCart(userId, productId, numberOfItems, totalPrice, status, date) {
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        numberOfItems,
        totalPrice: totalPrice * numberOfItems,
        status,
        date,
      }),
    })

    setCartItems((prev) => [
      ...prev,
      {
        ...productDetails,
        quantity: numberOfItems,
      },
    ])
  }

  const increaseOrder = () => {
    setNumberOfItems((prev) => prev + 1)
  }

  const decreaseOrder = () => {
    if (numberOfItems > 1) {
      setNumberOfItems((prev) => prev - 1)
    }
  }

  return (
    <>
      <div className="flex justify-between">
        {productDetails ? (
          <form
            onSubmit={handleUpdate}
            key={productDetails.id}
            className="sm:w-[90%] sm:mx-auto md:mx-0 md:w-1/2 lg:w-1/4 pb-6 shadow hover:shadow-md transition overflow-hidden"
            style={{
              fontSize: `${fontSize}px`,
              borderRadius: `${borderRaduis}px`,
            }}
          >
            <img
              src={productDetails.image || "/placeholder.svg"}
              alt={productDetails.name}
              className="w-full h-[300px] object-cover mb-4"
            />

            <input
              disabled={true}
              className="mb-2 mx-3 w-[90%] p-2 text-xl font-semibold"
              style={{ color: mealColor.hex }}
              name="name"
              value={productDetails.name}
              onChange={handleChange}
            />
            <br />
            <input
              disabled={true}
              className="mb-2 mx-3 w-[90%] p-2 text-gray-600 text-sm"
              value={productDetails.description}
              name="description"
              onChange={handleChange}
            />
            <br />
            <label className="px-4" htmlFor="">
              Product Price :
            </label>
            <input
              disabled={true}
              className="mb-2 mx-3 w-[40%] p-2 text-xl font-semibold"
              type="text"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
            />
            <br />

            <div className="flex gap-2 items-center">
              <span className="px-4" htmlFor="">
                Product Rate :
              </span>
              <span className="flex gap-1 px-2">{renderedStars(productDetails.rating)}</span>
            </div>
            <br />

            <div className="flex items-center justify-between px-8">
              <button
                type="button"
                className="px-7 py-2 rounded-md bg-green-700 text-white font-semibold"
                onClick={async (e) => {
                  e.preventDefault()

                  // Prevent adding items with 0 quantity
                  if (numberOfItems <= 0) {
                    toast.error("Please select at least 1 item")
                    return
                  }

                  const newCounter = counter + 1
                  setCounter(newCounter)

                  try {
                    await addOrderTOCart(
                      95,
                      productDetails.id,
                      numberOfItems, // ✅ Fixed: Use numberOfItems instead of productCount
                      productDetails.price,
                      "pending",
                      new Date().toISOString().split("T")[0],
                    )
                    toast.success("Product added to cart!")
                  } catch (error) {
                    toast.error("Failed to add product to cart.")
                  }
                }}
              >
                Order
              </button>
              <div className="flex items-center gap-8 text-xl">
                <FaMinus className="cursor-pointer" onClick={decreaseOrder} />
                <span>{numberOfItems}</span>
                <FaPlus className="cursor-pointer" onClick={increaseOrder} />
              </div>
            </div>
          </form>
        ) : (
          "loading..."
        )}
      </div>
    </>
  )
}
