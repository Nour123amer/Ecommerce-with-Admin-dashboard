import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { ProductStyleContext } from "../../contexts/ProductStyle";

export default function Child() {
  let { products } = useContext(ProductContext);
  const { fontSize, mealColor, borderRaduis, numOfProductsInRow } =
    useContext(ProductStyleContext);
  const gridColsMap = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };

  return (
    <>
      <div className="w-[95%] mx-auto px-4 py-4">
        <h1 className="text-3xl mb-6">About Our Products</h1>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridColsMap[numOfProductsInRow]} gap-6 `}
          style={{ borderRadius: borderRaduis, fontSize: fontSize }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: mealColor.hex }}
                >
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
