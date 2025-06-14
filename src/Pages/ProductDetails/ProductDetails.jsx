import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Circle from "../../components/ColorPalette/ColorPalette";
import { useContext } from "react";
import { ProductStyleContext } from "../../contexts/ProductStyle";
import { ProductRateContext } from "../../contexts/Rate";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState();
  const { renderedStars } = useContext(ProductRateContext);
  const {
    fontSize,
    setFontSize,
    mealColor,
    setMealColor,
    borderRaduis,
    setBorderRaduis,
    numOfProductsInRow,
    setNumOfProductsInRow,
  } = useContext(ProductStyleContext);

  let { id } = useParams();
  console.log(productDetails);

  async function getProductDetails() {
    let res = await fetch(`http://localhost:3001/products/${id}`);
    let data = await res.json();

    setProductDetails(data);

    console.log("product details =>", data);
  }

  // const renderedStars = (rate) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(<FaStar className="text-amber-300" key={i} />);
  //   }

  //   return stars;
  // };

  useEffect(() => {
    getProductDetails();
  }, []);

  function increaseFontSize() {
    setFontSize((prev) => prev + 2);
  }

  function decreaseFontSize() {
    setFontSize((prev) => prev - 2);
  }

  function increaseBorderRaduis() {
    setBorderRaduis((prev) => prev + 1);
  }

  function decreaseBorderRaduis() {
    setBorderRaduis((prev) => prev - 1);
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });

      const updated = await res.json();

      setProductDetails(updated);

      toast.success("Product updated successfully!", {
        duration: 4500,
      });
    } catch (error) {
      console.log("error =>", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleColorChange = (newColor) => {
    console.log("Color changing to:", newColor);
    setMealColor(newColor);
  };
  // function setTextColor(){
  //   localStorage.setItem("mealColor", JSON.stringify(mealColor))
  // }
  return (
    <>
      <div className="flex justify-between">
        {productDetails ? (
          <form
            onSubmit={handleUpdate}
            key={productDetails.id}
            className=" border w-1/4 border-gray-200 h-[680px] bg-white shadow hover:shadow-md transition overflow-hidden"
            style={{
              fontSize: `${fontSize}px`,
              borderRadius: `${borderRaduis}px`,
            }}
          >
            <img
              src={productDetails.image}
              alt={productDetails.name}
              className="w-full h-[300px] object-cover rounded-md mb-4"
            />
            <label className="p-2">Image URL:</label>
            <input
              name="image"
              type="text"
              value={productDetails.image}
              onChange={handleChange}
              className="border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2"
            />
            <br />
            <input
              className={` border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2 text-xl font-semibold `}
              style={{ color: mealColor.hex }}
              name="name"
              value={productDetails.name}
              onChange={handleChange}
            />
            <br />
            <input
              className="border border-gray-200 rounded-md mb-2 mx-3 w-[90%] p-2 text-gray-600 text-sm"
              value={productDetails.description}
              name="description"
              onChange={handleChange}
            />
            <br />
            <label className="p-2" htmlFor="">
              Product Price :{" "}
            </label>
            <input
              className="border border-gray-200 rounded-md mb-2 mx-3 w-[40%] p-2 text-xl font-semibold"
              type="text"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
            />
            <br />
            <label className="p-2" htmlFor="">
              Number of orders :{" "}
            </label>
            <input
              className="border border-gray-200 rounded-md mb-2 mx-3  p-2"
              name="numOfOrders"
              type="number"
              value={productDetails.numOfOrders}
            />
            {/* <br />
          <span className="p-2" htmlFor="">
            Product Rate :{" "}
          </span>
        
          <span className="flex gap-1 px-2">
            {renderedStars(productDetails.rating)}
          </span> */}
            <br />

            <button
              type="submit"
              className="bg-amber-300 text-white rounded-md px-3 py-1 mt-3 mx-2 "
            >
              {" "}
              Update
            </button>
          </form>
        ) : (
          "loading..."
        )}

        <div className=" w-1/4">
          <h2 className="mb-4 text-xl">Font Size :</h2>
          <div className="flex justify-between items-center mb-14 w-1/2">
            <FaPlus
              onClick={() => {
                increaseFontSize();
              }}
              className="bg-blue-300 text-white w-[40px] h-[40px] p-2 rounded-md "
            />
            <p className="text-xl"> {fontSize} </p>
            <FaMinus
              onClick={() => {
                decreaseFontSize();
              }}
              className="bg-blue-300 text-white w-[40px] h-[40px]  p-2 rounded-md "
            />
          </div>

          <h2 className="text-xl mb-4"> Border Raduis</h2>
          <div className="flex justify-between items-center mb-14 w-1/2">
            <FaPlus
              onClick={() => {
                increaseBorderRaduis();
              }}
              className="bg-blue-300 text-white w-[40px] h-[40px] p-2 rounded-md "
            />
            <p className="text-xl"> {borderRaduis} </p>
            <FaMinus
              onClick={() => {
                decreaseBorderRaduis();
              }}
              className="bg-blue-300 text-white w-[40px] h-[40px]  p-2 rounded-md "
            />
          </div>

          <h2 className="text-xl"> Title Color</h2>
          <Circle color={mealColor.hex} onChange={handleColorChange} />

          <h2 className="text-xl mb-4 mt-12">
            {" "}
            Number of products in each row :
          </h2>

          <div className="flex justify-between items-center mb-14 w-1/2">
            <p
              onClick={() => {
                setNumOfProductsInRow(1);
              }}
              className="bg-blue-300 text-white text-lg font-semibold w-[40px] h-[40px] p-2 rounded-md flex items-center justify-center "
            >
              1
            </p>
            <p
              onClick={() => {
                setNumOfProductsInRow(2);
              }}
              className="bg-blue-300 text-white text-lg font-semibold w-[40px] h-[40px] p-2 rounded-md flex items-center justify-center "
            >
              2
            </p>
            <p
              onClick={() => {
                setNumOfProductsInRow(3);
              }}
              className="bg-blue-300 text-white text-lg font-semibold w-[40px] h-[40px] p-2 rounded-md flex items-center justify-center "
            >
              3
            </p>
            <p
              onClick={() => {
                setNumOfProductsInRow(4);
              }}
              className="bg-blue-300 text-white text-lg font-semibold w-[40px] h-[40px] p-2 rounded-md flex items-center justify-center "
            >
              4
            </p>

            <p
              onClick={() => {
                setNumOfProductsInRow(6);
              }}
              className="bg-blue-300 text-white text-lg font-semibold w-[40px] h-[40px] p-2 rounded-md flex items-center justify-center "
            >
              6
            </p>

            <p className="text-xl ml-4"> {numOfProductsInRow} </p>
          </div>
        </div>
      </div>
    </>
  );
}
