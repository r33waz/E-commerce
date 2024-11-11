import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ data, xKey, yKey1, yKey2 }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={xKey} />
        <YAxis 
          hide={false} 
          tickFormatter={(value) => new Intl.NumberFormat().format(value)} 
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "black",
            border: "1px solid #ccc",
          }}
        />
        <Legend />
        <Bar dataKey={yKey1} fill="#8884d8" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
