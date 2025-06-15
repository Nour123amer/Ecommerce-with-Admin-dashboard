import { useContext, useEffect } from "react";
import { useState } from "react";
import { ProductRateContext } from "../../contexts/Rate";
import { RiFeedbackFill } from "react-icons/ri";
import { FeedbackContext } from "../../contexts/FeedbackContext";

export default function Feedback() {

    const {renderedStars} = useContext(ProductRateContext);
    const {reviews} = useContext(FeedbackContext);

  return (
    <>
     <h2 className='text-2xl mb-8 flex gap-3'>
       <RiFeedbackFill className="text-[#B0C3CC] text-[32px]" />
            Feedback </h2>
      <div className="grid grid-cols-12 gap-4  ">
        {reviews
          ? reviews.map((review) => (
              <div className=" shadow-md rounded-lg lg:col-span-3 p-6 w-full max-w-md mx-auto border border-gray-100">
               <h2 className="mb-4">{review.comment}</h2>
               <p className="mb-4">{review.date}</p>
               <p className="mb-4 flex gap-1"> {renderedStars(review.rating)}</p>

              </div>
            ))
          : "Loading..."}
      </div>
    </>
  );
}
