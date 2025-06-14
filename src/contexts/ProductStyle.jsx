import { useEffect } from "react";
import { createContext, useState } from "react";
import { useColor } from "react-color-palette";

export const ProductStyleContext = createContext();

export default function ProductStyleContextProvider({ children }) {
  const loadInitialStyle = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [fontSize, setFontSize] = useState(() =>
    loadInitialStyle("fontSize", 14)
  );

  const [mealColor, setMealColor] = useColor("hex", () =>
    loadInitialStyle("mealColor", { hex: "#6b7280" })
  );

  // const [mealColor, setMealColor] = useColor(loadInitialStyle("mealColor", "#6b7280"));

  const [borderRaduis, setBorderRaduis] = useState(() =>
    loadInitialStyle("borderRaduis", 10)
  );
  const [numOfProductsInRow, setNumOfProductsInRow] = useState(() =>
    loadInitialStyle("numOfProductsInRow", 4)
  );

  useEffect(() => {
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("mealColor", JSON.stringify(mealColor));
  }, [mealColor]);

  useEffect(() => {
    localStorage.setItem("borderRaduis", JSON.stringify(borderRaduis));
  }, [borderRaduis]);

  useEffect(() => {
    localStorage.setItem(
      "numOfProductsInRow",
      JSON.stringify(numOfProductsInRow)
    );
  }, [numOfProductsInRow]);

  return (
    <ProductStyleContext.Provider
      value={{
        fontSize,
        setFontSize,
        mealColor,
        setMealColor,
        borderRaduis,
        setBorderRaduis,
        numOfProductsInRow,
        setNumOfProductsInRow,
      }}
    >
      {children}
    </ProductStyleContext.Provider>
  );
}
