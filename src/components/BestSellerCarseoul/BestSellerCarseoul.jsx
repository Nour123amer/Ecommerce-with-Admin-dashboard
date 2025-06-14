import { useContext } from "react";
import { ProductContext } from "./../../contexts/ProductContext";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

export default function BestSellerCarseoul() {
  const { products } = useContext(ProductContext);
  const bestSellers = products.filter((product) => product.numOfOrders > 250);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef ,slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
<>
    <div className="w-full px-6">
        <h2 className="text-3xl my-6 text-blue-950 mb-8 ">Best Sellers </h2>
      {bestSellers && bestSellers.length > 0 ? (
        <div ref={sliderRef} className="keen-slider">
          {bestSellers.map((product) => (
            <div className="keen-slider__slide" key={product.id}>
              <div className="p-4 rounded-lg shadow bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                <p className="text-blue-950 text-center">{product.description}</p>
                <p className="text-center text-sm text-gray-500">price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl text-gray-600">Loading...</h2>
      )}
    </div>

     {/* Bullets */}
          <div className="flex justify-center my-4 gap-2">

            {bestSellers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => slider.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === idx
                    ? "bg-green-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>

          </>

  );
}
