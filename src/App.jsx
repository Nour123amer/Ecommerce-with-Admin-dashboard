import { useState } from "react";
import "./App.css";
import Parent from "./components/parent/Parent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/RootLayout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import ProductContextProvider from "./contexts/ProductContext";
import Signup from "./Pages/Signup/Signup";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Control from "./Pages/Control/Control";
import { Toaster } from "react-hot-toast";
import ProductStyleContextProvider from "./contexts/ProductStyle";
import Feedback from "./Pages/Feedback/Feedback";
import ProductRateContextProvider from "./contexts/Rate";
import Setting from "./Pages/Setting/Setting";
import DashboardLayout from "./Layouts/Layout/Layout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import Menu from "./Pages/Menu/Menu";
import Details from "./Pages/Details/Details";
import { FeedbackContextProvider } from "./contexts/FeedbackContext";
import Team from "./Pages/Team/Team";
import Login from "./Pages/Login/Login";
import Cart from "./Pages/Cart/Cart";
import { CounterContextProvider } from "./contexts/CounterContext";
import { CartContextProvider } from "./contexts/CartContext";
import Confirmation from "./components/Confirmation/Confirmation";
import BestSellers from "./components/BestSellers/BestSellers";
import Profile from "./Pages/Profile/Profile";
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ProfileSetting from "./Pages/ProfileSetting/ProfileSetting";
import ProfileNotification from "./Pages/ProfileNotification/ProfileNotification";
import ProductsSale from "./Pages/ProductsSale/ProductsSale";
import Desserts from "./Pages/Desserts/Desserts";
import { ProductCountContextProvider } from "./contexts/ProductCountContext";
import { SettingContextProvider } from "./contexts/SettingContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ThemeColorContextProvider } from "./contexts/ThemeColorContext";
import AddProduct from "./Pages/AddProduct/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
import DeleteProduct from "./Pages/DeleteProduct/DeleteProduct";
import ControlLayout from "./Layouts/ControlLayout/ControlLayout";
import { NumberOfItemsContextProvider } from "./contexts/NumberOfOrders";
import { OrderContextProvider } from "./contexts/OrdersContext";


function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("bbbb");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with USB receiver.",
      price: 19.99,
      category: "Electronics",
      image: "https://via.placeholder.com/150?text=Mouse",
    },
    {
      id: 2,
      name: "Bluetooth Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 49.99,
      category: "Electronics",
      image: "https://via.placeholder.com/150?text=Headphones",
    },
    {
      id: 3,
      name: "Office Chair",
      description: "Comfortable mesh office chair with adjustable height.",
      price: 89.99,
      category: "Furniture",
      image: "https://via.placeholder.com/150?text=Chair",
    },
    {
      id: 4,
      name: "Standing Desk",
      description: "Height-adjustable standing desk.",
      price: 229.99,
      category: "Furniture",
      image: "https://via.placeholder.com/150?text=Desk",
    },
    {
      id: 5,
      name: "Water Bottle",
      description: "Insulated stainless steel water bottle.",
      price: 14.99,
      category: "Accessories",
      image: "https://via.placeholder.com/150?text=Bottle",
    },
    {
      id: 6,
      name: "Yoga Mat",
      description: "Non-slip yoga mat with carrying strap.",
      price: 24.99,
      category: "Fitness",
      image: "https://via.placeholder.com/150?text=Yoga+Mat",
    },
    {
      id: 7,
      name: "Running Shoes",
      description: "Lightweight running shoes for men.",
      price: 59.99,
      category: "Footwear",
      image: "https://via.placeholder.com/150?text=Shoes",
    },
    {
      id: 8,
      name: "Smart Watch",
      description: "Water-resistant smartwatch with fitness tracking.",
      price: 129.99,
      category: "Electronics",
      image: "https://via.placeholder.com/150?text=Smart+Watch",
    },
    {
      id: 9,
      name: "Gaming Keyboard",
      description: "Mechanical RGB keyboard for gamers.",
      price: 74.99,
      category: "Electronics",
      image: "https://via.placeholder.com/150?text=Keyboard",
    },
    {
      id: 10,
      name: "Backpack",
      description: "Durable backpack with laptop compartment.",
      price: 39.99,
      category: "Accessories",
      image: "https://via.placeholder.com/150?text=Backpack",
    },
    {
      id: 11,
      name: "LED Desk Lamp",
      description: "Adjustable LED lamp with touch controls.",
      price: 22.99,
      category: "Home",
      image: "https://via.placeholder.com/150?text=Lamp",
    },
    {
      id: 12,
      name: "Sunglasses",
      description: "Polarized UV-protection sunglasses.",
      price: 29.99,
      category: "Accessories",
      image: "https://via.placeholder.com/150?text=Sunglasses",
    },
  ]);

  let paths = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "blog", element: <Blog /> },
         { path: "blog/:id", element: <Details /> },
        { path: "menu", element: <Menu /> },
        { path: "team", element: <Team /> },
        { path: "cart", element: <Cart /> },
        {path:"Confirmation" ,element : <Confirmation />},
        { path: "productsSale", element: <ProductsSale /> },
        { path: "desserts", element: <Desserts /> },
        { path: "signup", element: <Signup /> },
        { path: "profile",element :<ProfileLayout />, children:[
          { index: true, element: <Profile /> },
          {path: "profilesetting", element: <ProfileSetting />},
          {path:"profilenotification", element: <ProfileNotification />}
        ] },
        { path: "login", element: <Login /> },
        { path:"bestSellers" ,element: <BestSellers />},
        { path :"confirmation" ,element: <Confirmation />},
        { path: "*", element: <h2>not found</h2> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "Parent", element: <Parent /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "orders", element: <Orders /> },
        { path: "users", element: <Users /> },
        { path: "control", element: <ControlLayout />,
          children: [
            {index: true, element: <AddProduct /> },
            {path: "addproduct", element: <AddProduct /> },
            { path: "updateproduct", element: <UpdateProduct /> },
            { path: "deleteproduct", element: <DeleteProduct /> },
          ]
         },
        { path: "feedback", element: <Feedback /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "setting", element: <Setting /> },
        { path: "profile", element: <Profile />},
        { path: "profilenotification", element: <ProfileNotification />},
      ],
    },
    
  ]
,
);

  function deleteProduct(id) {
    let myProducts = structuredClone(products);
    let filtered = myProducts.filter((p) => p.id !== id);
    console.log(filtered);
    setProducts(filtered);
  }

  function updateProduct(index) {
    let myProducts = structuredClone(products);
    myProducts[index].price += 20;
    setProducts(myProducts);
  }

  console.log(name, count);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000, // default
          },
          style: {
            marginTop: "110px",
            background: "#e0f2fe",
            color: "#0c4a6e",
          },
        }}
        reverseOrder={false}
      />

      {/* <Parent userDetails={name} products={products} deleteProduct={deleteProduct} updateProduct={updateProduct} /> */}
      <ProductStyleContextProvider>
        <ProductContextProvider>
          <ProductRateContextProvider>
            <FeedbackContextProvider>
              <CounterContextProvider>
                <CartContextProvider>
                  <ProductCountContextProvider>
                    <SettingContextProvider>
                      <ThemeContextProvider>
                        <ThemeColorContextProvider>
                            <OrderContextProvider>
                              <NumberOfItemsContextProvider>
                             <RouterProvider router={paths}></RouterProvider> 
                              </NumberOfItemsContextProvider> 
                            </OrderContextProvider>
                        </ThemeColorContextProvider>
                      </ThemeContextProvider>
                    </SettingContextProvider>
                  </ProductCountContextProvider>
                </CartContextProvider>
              </CounterContextProvider>
            </FeedbackContextProvider>
          </ProductRateContextProvider>
        </ProductContextProvider>
      </ProductStyleContextProvider>
    </>
  );
}

export default App;
