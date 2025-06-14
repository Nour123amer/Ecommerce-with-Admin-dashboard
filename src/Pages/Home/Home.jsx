import BestSellerCarseoul from "../../components/BestSellerCarseoul/BestSellerCarseoul";

export default function Home() {
  return (
    <>
    <div className="flex justify-center  items-center">
     <p className=" text-4xl w-3/4 mx-auto text-center min-h-screen text-white pt-58 leading-16"> Welcome to GOOGFOOD restaurant — where every bite tells a story.
       Experience fresh ingredients, bold flavors, and warm hospitality in a cozy, 
       modern atmosphere. Whether you're craving a quick lunch or a romantic dinner,
        we serve comfort and taste on every plate.
</p>
    </div>
    <BestSellerCarseoul />
    </>
  )
}

