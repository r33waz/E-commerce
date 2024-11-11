import { getProductNumChart } from "@/rtk/admin-slice/admin-board/admin-thunk";
import { useDispatch, useSelector } from "react-redux";
import PieChartComponent from "../common/pieChart";
import LineChartComponent from "../common/lineChart";
import AreaChartComponent from "../common/areaChart";
import { Card } from "../ui/card";
import { useEffect } from "react";

const ProductData = () => {
  const dispatch = useDispatch();
  const { prodCatChart, error, isLoading } = useSelector(
    (state) => state.admin
  );

  const formattedData =
    prodCatChart?.labels?.map((label, index) => ({
      name: label,
      value: prodCatChart.data[index],
      color: ["#8884d8", "#82ca9d", "#ffc658"][index % 3],
    })) || [];

  useEffect(() => {
    dispatch(getProductNumChart());
  }, [dispatch]);
  return (
    <>
      <div className="md:grid-cols-3 grid-cols-1 gap-4 grid pl-2">
        <Card className="dark:bg-gray-800 flex flex-col  justify-center">
          <h2 className="md:text-2xl font-semibold pt-5 pl-4">
            Product length
          </h2>
          <AreaChartComponent data={formattedData} />
        </Card>
        <div className="col-md-12">
          <h1>Admin Dashboard</h1>
          <LineChartComponent />
        </div>
        <div className="col-md-12">
          <h1>Admin Dashboard</h1>
          <LineChartComponent />
        </div>
      </div>
      <div className="  grid md:grid-cols-2 grid-cols-1">
        <div>
          <PieChartComponent width={600} height={500} data={formattedData} />
        </div>
        <Card className="dark:bg-gray-800 flex flex-col  justify-center">
          <h2 className="md:text-2xl font-semibold pt-5 pl-4">
            Product Categories
          </h2>
          <PieChartComponent
            width={600}
            height={500}
            inradius={100}
            outradius={100}
            data={formattedData}
            cy="50%"
          />
        </Card>
      </div>
    </>
  );
};

export default ProductData;
