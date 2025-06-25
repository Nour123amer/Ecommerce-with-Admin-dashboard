import { useNavigate } from "react-router-dom";
import BestSellerCarseoul from "../../components/BestSellerCarseoul/BestSellerCarseoul";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center  items-center">
        <div className=" text-4xl w-3/4 mx-auto text-center min-h-screen text-white pt-58 leading-16">
          <h2 className="text-5xl font-extrabold mb-6">
            Savor the Flavors of Italy
          </h2>
          <p className="mb-12">
            Experience authentic Italian cuisine in a warm and inviting
            atmosphere. From classic pasta dishes to wood-fired pizzas, our menu
            offers a taste of Italy's finest.
          </p>

          <button
            onClick={() => {
              navigate("/blog");
            }}
            className="bg-white px-8 py-4 rounded-full text-3xl text-black hover:bg-black hover:text-white transition-all "
          >
            View Menu
          </button>
        </div>
      </div>
      <BestSellerCarseoul />
    </>
  );
}
