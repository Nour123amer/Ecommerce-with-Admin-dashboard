// import React from "react";
// import { useContext } from "react";
// import { FeedbackContext } from "../../contexts/FeedbackContext";
// import { ProductRateContext } from "../../contexts/Rate";

// export default function About() {
//   const { reviews } = useContext(FeedbackContext);
//   const { renderedStars } = useContext(ProductRateContext);

//   return (
//     <>
//       <div className="grid grid-cols-12 gap-6 items-center justify-center leading-10 mb-20">
//         <div className="sm:col-span-12 md:col-span-6 col-span-6">
//           <p className="sm:w-full sm:mb-6 lg:w-[85%] text-xl leading-12">
//             Welcome to <span>GOOGFOOD</span>, where great food meets warm
//             hospitality. Located in the heart of City, we serve delicious,
//             freshly prepared meals made from locally sourced ingredients.
//             Whether you're here for a casual lunch, a family dinner, or a
//             special occasion, we’re dedicated to making your experience
//             memorable. Our chefs blend traditional recipes with modern flavors
//             to bring you dishes that are both comforting and exciting. We
//             believe food is more than just a meal — it's a way to connect,
//             celebrate, and create lasting memories. Come hungry. Leave happy.
//           </p>
//         </div>

//         <div className="sm:col-span-12 md:col-span-6 col-span-6">
//           <img
//             src="https://i.pinimg.com/736x/f8/a7/01/f8a70144eb881afe78df0164e657e966.jpg"
//             className="w-full h-[650px] rounded-xl"
//             alt=""
//           />
//         </div>
//       </div>

//  <h2 className="text-4xl mt-28 underline">Our clients reviews</h2>
//       <div className="sm:px-4 grid grid-cols-12 gap-6 items-center justify-center mt-14 py-18 ">
       
//         {reviews
//           ? reviews.map((review) => (
//               <div key={review.id} className=" sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-4 h-[170px] rounded-md bg-gray-100 flex flex-col justify-center">
//                 <p>{review.numOfOrders}</p>
//                 <p className="mb-3">{review.comment}</p>
//                 <p className="mb-4 flex gap-1">
//                  {renderedStars(review.rating)}
//                 </p>
//                 <p>{review.date}</p>
//               </div>
//             ))
//           : ""}
//       </div>
//     </>
//   );
// }

"use client"

import { useContext } from "react"
import { FeedbackContext } from "../../contexts/FeedbackContext"
import { ProductRateContext } from "../../contexts/Rate"
import { FiMapPin, FiClock, FiPhone, FiMail, FiUsers, FiAward, FiHeart } from "react-icons/fi"
import { BiRestaurant } from "react-icons/bi"

export default function About() {
  const { reviews } = useContext(FeedbackContext)
  const { renderedStars } = useContext(ProductRateContext)

  const stats = [
    { icon: FiUsers, label: "Happy Customers", value: "10,000+", color: "bg-blue-500" },
    { icon: BiRestaurant, label: "Dishes Served", value: "50,000+", color: "bg-green-500" },
    { icon: FiAward, label: "Awards Won", value: "15+", color: "bg-yellow-500" },
    { icon: FiHeart, label: "Years of Service", value: "8+", color: "bg-red-500" },
  ]

  const features = [
    {
      icon: "🌱",
      title: "Fresh Ingredients",
      description: "Locally sourced, organic ingredients delivered daily to ensure maximum freshness and quality.",
    },
    {
      icon: "👨‍🍳",
      title: "Expert Chefs",
      description: "Our experienced chefs bring passion and creativity to every dish they prepare.",
    },
    {
      icon: "🏆",
      title: "Award Winning",
      description: "Recognized for excellence in food quality, service, and customer satisfaction.",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to bring our delicious food right to your door.",
    },
  ]

  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About GOOGFOOD</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Where great food meets warm hospitality in the heart of the city
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                Our Story
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Crafting Culinary Excellence Since 2016
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to <span className="font-bold text-orange-600">GOOGFOOD</span>, where great food meets warm
              hospitality. Located in the heart of the city, we serve delicious, freshly prepared meals made from
              locally sourced ingredients.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're here for a casual lunch, a family dinner, or a special occasion, we're dedicated to making
              your experience memorable. Our chefs blend traditional recipes with modern flavors to bring you dishes
              that are both comforting and exciting.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe food is more than just a meal — it's a way to connect, celebrate, and create lasting memories.{" "}
              <span className="font-semibold text-orange-600">Come hungry. Leave happy.</span>
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiMapPin className="text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-600">Downtown City Center</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiClock className="text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Hours</p>
                  <p className="text-gray-600">9 AM - 11 PM Daily</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiPhone className="text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiMail className="text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">hello@googfood.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl opacity-20"></div>
            <img
              src="https://i.pinimg.com/736x/f8/a7/01/f8a70144eb881afe78df0164e657e966.jpg"
              className="relative w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              alt="Restaurant interior"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">4.8</p>
                <div className="flex justify-center my-2">{renderedStars(5)}</div>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex p-4 rounded-2xl ${stat.color} mb-4`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-6">What Makes Us Special</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing an exceptional dining experience through quality, service, and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-6">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers about their experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews && reviews.length > 0 ? (
              reviews.slice(0, 6).map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Quote Icon */}
                  <div className="text-orange-500 text-4xl mb-4">"</div>

                  {/* Review Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{review.comment}"</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">{renderedStars(review.rating)}</div>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {review.customerName ? review.customerName.charAt(0).toUpperCase() : "A"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{review.customerName || "Anonymous Customer"}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Order Count */}
                  {review.numOfOrders && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {review.numOfOrders} orders
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FiUsers size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600">No reviews available yet.</p>
              </div>
            )}
          </div>

          {/* View All Reviews Button */}
          {reviews && reviews.length > 6 && (
            <div className="text-center mt-12">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors">
                View All Reviews
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience GOOGFOOD?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover why we're the city's favorite restaurant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Order Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors">
              Make Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

