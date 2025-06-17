import React from "react";
import { useContext } from "react";
import { FeedbackContext } from "../../contexts/FeedbackContext";
import { ProductRateContext } from "../../contexts/Rate";

export default function About() {
  const { reviews } = useContext(FeedbackContext);
  const { renderedStars } = useContext(ProductRateContext);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 items-center justify-center leading-10 mb-20">
        <div className="sm:col-span-12 md:col-span-6 col-span-6">
          <p className="sm:w-full sm:mb-6 lg:w-[85%] text-xl leading-12">
            Welcome to <span>GOOGFOOD</span>, where great food meets warm
            hospitality. Located in the heart of City, we serve delicious,
            freshly prepared meals made from locally sourced ingredients.
            Whether you're here for a casual lunch, a family dinner, or a
            special occasion, we’re dedicated to making your experience
            memorable. Our chefs blend traditional recipes with modern flavors
            to bring you dishes that are both comforting and exciting. We
            believe food is more than just a meal — it's a way to connect,
            celebrate, and create lasting memories. Come hungry. Leave happy.
          </p>
        </div>

        <div className="sm:col-span-12 md:col-span-6 col-span-6">
          <img
            src="https://i.pinimg.com/736x/f8/a7/01/f8a70144eb881afe78df0164e657e966.jpg"
            className="w-full h-[650px] rounded-xl"
            alt=""
          />
        </div>
      </div>

 <h2 className="text-4xl mt-28 underline">Our clients reviews</h2>
      <div className="sm:px-4 grid grid-cols-12 gap-6 items-center justify-center mt-14 py-18 ">
       
        {reviews
          ? reviews.map((review) => (
              <div key={review.id} className=" sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-4 h-[170px] rounded-md bg-gray-100 flex flex-col justify-center">
                <p>{review.numOfOrders}</p>
                <p className="mb-3">{review.comment}</p>
                <p className="mb-4 flex gap-1">
                 {renderedStars(review.rating)}
                </p>
                <p>{review.date}</p>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
