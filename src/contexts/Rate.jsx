import { createContext } from "react";
import { FaStar } from "react-icons/fa";

export const ProductRateContext = createContext();

export default function ProductRateContextProvider({ children }) {
  const renderedStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= rate; i++) {
      stars.push(<FaStar className="text-amber-300" key={i} />);
    }

    return stars;
  };

  return (
    <ProductRateContext.Provider value={{ renderedStars }}>
      {children}
    </ProductRateContext.Provider>
  );
}
