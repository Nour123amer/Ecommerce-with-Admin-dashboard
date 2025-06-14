// import { useContext } from "react";
// import { ProductContext } from "./../../contexts/ProductContext";
// import BestSellerCarseoul from "../BestSellerCarseoul/BestSellerCarseoul";
// import { useKeenSlider } from "keen-slider/react"; 
// import "keen-slider/keen-slider.min.css";

// export default function BestSellers() {
//   const { products } = useContext(ProductContext);
//   const bestSellers = products.filter((product) => product.numOfOrders > 250);
//   const [sliderRef] = useKeenSlider({
//     loop: true,
//     slides: {
//       perView: 3,
//       spacing: 15,
//     },
//   });

//   return (
//     <>
//       {/* {bestSellers ? (
//         bestSellers.map((seller) => (
//           <div key={seller.id}>
//             <img src={seller.image} alt="" />
//               <BestSellerCarseoul />
//           </div>
        
//         ))
//       ) : (
//         <h2>Loading... </h2>
//       )} */}

//        <div ref={sliderRef} className="keen-slider">
//       {bestSellers.map((product) => (
//         <div className="keen-slider__slide" key={product.id}>
//           <div className="p-4 rounded-lg shadow bg-white">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-md mb-2"
//             />
//             <h3 className="text-lg font-semibold text-center">{product.name}</h3>
//             <p className="text-center text-sm text-gray-500">${product.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// }


import { useContext } from "react";
import { ProductContext } from "./../../contexts/ProductContext";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function BestSellers() {
  const { products } = useContext(ProductContext);
  const bestSellers = products.filter((product) => product.numOfOrders > 250);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
  });

  return (
    <div className="w-full px-6">
      {bestSellers && bestSellers.length > 0 ? (
        <div ref={sliderRef} className="keen-slider">
          {bestSellers.map((product) => (
            <div className="keen-slider__slide" key={product.id}>
              <div className="p-4 rounded-lg shadow bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                <p className="text-center text-sm text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl text-gray-600">Loading...</h2>
      )}
    </div>
  );
}
