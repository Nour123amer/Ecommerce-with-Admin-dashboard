import React from "react";
import ColumnGraph from "../../components/ColumnGraph/ColumnGraph";
import PieChartGraph from "../../components/PieChart/PieChar";
import { useState } from "react";
import { useEffect } from "react";
import LineGraph from "../../components/LineChart/LineChart.jsx";
import WeeklyReport from "../WeeklyReport/WeeklyReport.jsx";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrdersContext.jsx";
export default function Dashboard() {
  const [mostOrdered, setMostOrdered] = useState([]);
  const [hygiene, setHygiene] = useState();
  const [fastFood, setFastFood] = useState();
  const [packaging, setPackaging] = useState();
  const [showReport, setShowReport] = useState(false);
  const [weekRevenu ,setWeekRevenu]= useState(null);
    const [revenueData, setRevenueData] = useState([]);
  const {orders} = useContext(OrderContext);
  async function getMostOrdered() {
    let res = await fetch("http://localhost:3000/products");
    let data = await res.json();
    console.log(data);
    let filtered = data.filter((item) =>
      item.mostOrdered === true ? item : ""
    );
    console.log("most=>", filtered);
    setMostOrdered(filtered);
  }

  async function getHygieneRate() {
    const res = await fetch("http://localhost:3000/ratings");
    const data = await res.json();
    console.log("hygiene =>", data);
    // console.log("****",data.category["Hygiene"].percentage);
    let filtered = data.map((item) =>
      item.category === "Hygiene" ? item.percentage : ""
    );
    console.log(filtered);
    setHygiene(filtered);
  }

  async function getWeekRevenu() {
     const res = await fetch("http://localhost:3000/revenueData");
    const data = await res.json();
    let filtered = data.map((item) =>
      item.day === "06" ? (((item.thisWeek)/(item.lastWeek)).toFixed(2)): ""
    );
    console.log(filtered);
    setWeekRevenu(filtered);
    
  }

  useEffect(()=>{
    getWeekRevenu();
  },[])

  async function getFoodTasteRate() {
    const res = await fetch("http://localhost:3000/ratings");
    const data = await res.json();
    console.log("hygiene =>", data);
    let filtered = data.map((item) =>
      item.category === "Food Taste" ? item.percentage : ""
    );
    console.log(filtered);
    setFastFood(filtered);
  }

  async function getPackagingRate() {
    const res = await fetch("http://localhost:3000/ratings");
    const data = await res.json();
    console.log("Packaging =>", data);
    // console.log("****",data.category["Hygiene"].percentage);
    let filtered = data.map((item) =>
      item.category === "Packaging" ? item.percentage : ""
    );
    console.log(filtered);
    setPackaging(filtered);
  }

    async function getFoodTasteRate() {
    try {
      const res = await fetch("http://localhost:3000/ratings")
      const data = await res.json()
      const filtered = data.find((item) => item.category === "Food Taste")
      setFastFood(filtered?.percentage || 0)
    } catch (error) {
      console.error("Error fetching food taste rate:", error)
    }
  }


  useEffect(() => {
    getMostOrdered();
    getHygieneRate();
    getFoodTasteRate();
    getPackagingRate();
  }, []);


  const reportData = {
    revenue: {
      current:weekRevenu,
      data: revenueData
    },
    ratings: {
      hygiene,
      fastFood,
      packaging
    },
    mostOrdered,
    orders,
    totalOrders: orders.length,
    averageRating: ((hygiene + fastFood + packaging) / 3).toFixed(1)
  }
  return (
    <>
      <div className="h-full">
        <div className="flex justify-between items-center mb-10">
          <h2 className="  text-2xl">Dashboard</h2>
          <span
            onClick={() => setShowReport(true)}
            className="bg-blue-500 rounded-md px-3 w-[220px] text-center py-2 font-semibold text-white block ml-auto"
          >
            Create a weekly report
          </span>
        </div>

        <WeeklyReport
          isVisible={showReport}
          data={reportData}
          onClose={() => setShowReport(false)}
        />

        {/* Revenue */}
        <div className=" h-[calc(100%-50px)]">
          <div className="flex h-[60%]">
            <div className="p-5 w-[65%]  border-r-2 border-gray-400 h-full border-b-2">
              <h3 className="text-[16px] text-xl"> Revenue</h3>
              <p className="text-[16px] text-xl"><span className="text-gray-500">{weekRevenu}</span> IDR</p>
              <p className="text-[16px] text-xl"> vs last week</p>
              <p className="mb-8 text-[16px] text-xl text-gray-500"> Sales from 1-12 may 2025</p>

              <ColumnGraph className=" h-[80%] " />
              <ul className=" flex gap-5 items-center text-[#121212] pl-16">
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Last 6 days
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Last week{" "}
                </li>
              </ul>
            </div>
            <div className="p-5 w-[35%]   border-gray-400 h-full border-b-2 ">
              <h2>Order Time</h2>
              <p className="text-gray-500"> From 1-6 May 2025</p>

              <PieChartGraph />

              <ul className=" flex justify-between items-center text-[#121212] w-[75%] mx-auto">
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Afternoon
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Evening{" "}
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Morning
                </li>
              </ul>
            </div>
          </div>

          <div className="flex h-[40%]">
            <div className="flex w-[65%]  border-r-2 border-gray-200 h-full  ">
              <div className="p-5 w-1/2 border-r-2 border-gray-400 ">
                <h2 className="text-2xl">Your Rating</h2>
                <p className="text-[18px]">Lorem ipsum dolor sit amet.</p>
                <div className="relative">
                  <p className="absolute top-6 z-2 left-28 w-[120px] h-[120px] rounded-full border-2 border-[#6463D6]  bg-[#6463D6] text-white flex justify-center items-center">
                    {hygiene}%
                  </p>
                  <p className="absolute top-[110px] z-1 left-[30px] w-[150px] h-[150px] rounded-full bg-[#2FBFDE] text-white flex justify-center items-center">
                    {fastFood}%
                  </p>
                  <p className="absolute top-[110px] z-0  right-[230px] w-[170px] h-[170px] rounded-full bg-[#F99C30] text-white flex justify-center items-center">
                    {packaging}%
                  </p>
                </div>
              </div>

              <div className="p-5 w-1/2 border-r-2  border-gray-400 ">
                <h2>Most ordered food</h2>
                <p className="mb-3">Lorem ipsum dolor sit amet consectetur.</p>
                {mostOrdered
                  ? mostOrdered.map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center border-b-2 border-gray-200 mb-4 p-2 "
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[40px] h-[40px] rounded-full"
                            src={order.image}
                            alt=""
                          />
                          <h2 className="text-lg ">{order.name}</h2>
                        </div>
                        <p>IDR {order.price}</p>
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            <div className="p-5 w-[35%]   border-gray-400 h-full ">
              <h2 className="text-2xl">Order</h2>
              <p className="text-[18px]"> vs last week</p>
              <p>Sales from 1-6 May, 2025</p>
              <LineGraph />
              <ul className=" flex gap-5 items-center text-[#121212] pl-16">
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Last 6 days
                </li>
                <li className="flex items-center gap-2">
                  {" "}
                  <div className="w-[15px] h-[15px] rounded-full bg-[#5A6ACF]"></div>{" "}
                  Last week{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
