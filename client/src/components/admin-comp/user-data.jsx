import { useDispatch, useSelector } from "react-redux";
import AreaChartComponent from "../common/areaChart";
import PieChartComponent from "../common/pieChart";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import {
  getTotalUser,
  getUserMonthlyStats,
  getUserStatus,
} from "@/rtk/admin-slice/admin-board/admin-thunk";
import BarChartComponent from "../common/barChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminUserTabele from "./userData-table";

const UserData = () => {
  const [month, setMonth] = useState("");
  console.log("month", month);
  const dispatch = useDispatch();
  const { userCharData } = useSelector((state) => state.admin);
  console.log("userCharData", userCharData.userMonthlyStats);
  useEffect(() => {
    dispatch(getUserStatus());
    dispatch(getTotalUser());
  }, [dispatch]);

  useEffect(() => {
    if (month) {
      dispatch(getUserMonthlyStats(month));
    }
  }, [month, dispatch]);

  const chartData = [
    { name: "Active Users", value: userCharData.userStatus?.activeUsers },
    {
      name: "Inactive Users",
      value: userCharData.userStatus?.inactiveUsers,
    },
  ];

  //barchart
  const barChartData = userCharData.userMonthlyStats?.map((stat) => ({
    name: `${stat.month}-${stat.year}`,
    user: stat.userCount,
  }));
  return (
    <section>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pt-2 ">
        <Card className="dark:bg-gray-800 flex flex-col p-4 rounded-lg shadow-md">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Total User</h1>
          <div className="flex items-center justify-between w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M29.6 123.2a4 4 0 0 0 5.6-.8a56 56 0 0 1 89.6 0a3.93 3.93 0 0 0 6.38 0a56 56 0 0 1 89.6 0a4 4 0 1 0 6.4-4.8a63.55 63.55 0 0 0-32.5-22.85a36 36 0 1 0-37.4 0a63.4 63.4 0 0 0-29.3 19a63.34 63.34 0 0 0-29.3-19a36 36 0 1 0-37.4 0A63.6 63.6 0 0 0 28.8 117.6a4 4 0 0 0 .8 5.6M148 64a28 28 0 1 1 28 28a28 28 0 0 1-28-28m-96 0a28 28 0 1 1 28 28a28 28 0 0 1-28-28m142.7 134.75a36 36 0 1 0-37.4 0A63.4 63.4 0 0 0 128 217.7a63.34 63.34 0 0 0-29.3-18.95a36 36 0 1 0-37.4 0a63.6 63.6 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a3.93 3.93 0 0 0 6.38 0a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.55 63.55 0 0 0-32.48-22.85M52 168a28 28 0 1 1 28 28a28 28 0 0 1-28-28m96 0a28 28 0 1 1 28 28a28 28 0 0 1-28-28"
              />
            </svg>
            <h2 className="text-9xl font-semibold text-gray-600">
              {userCharData?.totalUser?.totalUser}
            </h2>
          </div>
        </Card>
        <Card className="dark:bg-gray-800 flex flex-col p-4 rounded-lg shadow-md">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Admin User</h1>
          <div className="flex items-center justify-between w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M14.68 14.81a6.76 6.76 0 1 1 6.76-6.75a6.77 6.77 0 0 1-6.76 6.75m0-11.51a4.76 4.76 0 1 0 4.76 4.76a4.76 4.76 0 0 0-4.76-4.76"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="M16.42 31.68A2.14 2.14 0 0 1 15.8 30H4v-5.78a14.8 14.8 0 0 1 11.09-4.68h.72a2.2 2.2 0 0 1 .62-1.85l.12-.11c-.47 0-1-.06-1.46-.06A16.47 16.47 0 0 0 2.2 23.26a1 1 0 0 0-.2.6V30a2 2 0 0 0 2 2h12.7Z"
                class="clr-i-outline clr-i-outline-path-2"
              />
              <path
                fill="currentColor"
                d="M26.87 16.29a.4.4 0 0 1 .15 0a.4.4 0 0 0-.15 0"
                class="clr-i-outline clr-i-outline-path-3"
              />
              <path
                fill="currentColor"
                d="m33.68 23.32l-2-.61a7.2 7.2 0 0 0-.58-1.41l1-1.86A.38.38 0 0 0 32 19l-1.45-1.45a.36.36 0 0 0-.44-.07l-1.84 1a7 7 0 0 0-1.43-.61l-.61-2a.36.36 0 0 0-.36-.24h-2.05a.36.36 0 0 0-.35.26l-.61 2a7 7 0 0 0-1.44.6l-1.82-1a.35.35 0 0 0-.43.07L17.69 19a.38.38 0 0 0-.06.44l1 1.82a6.8 6.8 0 0 0-.63 1.43l-2 .6a.36.36 0 0 0-.26.35v2.05A.35.35 0 0 0 16 26l2 .61a7 7 0 0 0 .6 1.41l-1 1.91a.36.36 0 0 0 .06.43l1.45 1.45a.38.38 0 0 0 .44.07l1.87-1a7 7 0 0 0 1.4.57l.6 2a.38.38 0 0 0 .35.26h2.05a.37.37 0 0 0 .35-.26l.61-2.05a7 7 0 0 0 1.38-.57l1.89 1a.36.36 0 0 0 .43-.07L32 30.4a.35.35 0 0 0 0-.4l-1-1.88a7 7 0 0 0 .58-1.39l2-.61a.36.36 0 0 0 .26-.35v-2.1a.36.36 0 0 0-.16-.35M24.85 28a3.34 3.34 0 1 1 3.33-3.33A3.34 3.34 0 0 1 24.85 28"
                class="clr-i-outline clr-i-outline-path-4"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
            <h2 className="text-9xl font-semibold text-gray-600">
              {userCharData?.totalUser?.adminUser}
            </h2>
          </div>
        </Card>
        <Card className="dark:bg-gray-800 flex flex-col p-4 rounded-lg shadow-md">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Normal User</h1>
          <div className="flex items-center justify-between w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"
              />
            </svg>
            <h2 className="text-9xl font-semibold text-gray-600">
              {userCharData?.totalUser?.normalUser}
            </h2>
          </div>
        </Card>
      </div>
      <div className="md:grid-cols-2 grid-cols-1 gap-4 grid pt-6">
        <Card className="dark:bg-gray-800 flex flex-col justify-center">
          <div className="flex w-full justify-between px-2 rounded-sm">
            <select
              className="w-full mt-0.5 h-10 bg-inherit border border-black rounded-sm dark:bg-gray-600"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
          <BarChartComponent
            data={barChartData}
            xKey="month"
            yKey1="user"
            yKey2="month"
          />
        </Card>
        <Card className="dark:bg-gray-800 flex flex-col justify-center">
          <h2 className="md:text-2xl font-semibold pt-5 pl-4">Active Status</h2>
          <PieChartComponent data={chartData} />
        </Card>
      </div>
      <Card className="mt-4">
        <AdminUserTabele />
      </Card>
    </section>
  );
};

export default UserData;
