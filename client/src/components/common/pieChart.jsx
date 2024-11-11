import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const PieChartComponent = ({
  data,
  inradius,
  outerradius,
  cx = "50%",
  cy = "50%",
}) => {
  const chartData = Array.isArray(data) ? data : [];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FFC0CB", "#808080", "#000000"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        {/* Add "Products Count" Text Above the Pie Chart */}
        <Pie
          dataKey="value"
          data={chartData}
          labelLine={false}
          label={renderCustomizedLabel}
          cy={cy}
          className="outline-none"
          fill="#8884d8"
          innerRadius={inradius}
          outerRadius={outerradius}
          paddingAngle={2}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Legend positioned vertically to the left */}
        <Legend
          layout={window.innerWidth < 768 ? "horizontal" : "vertical"}
          align={window.innerWidth < 768 ? "center" : "right"}
          verticalAlign={window.innerWidth < 768 ? "bottom" : "top"}
          height={36}
          wrapperStyle={{
            position: "absolute",
            bottom: 0,
            left: "auto",
            right: 0,
            top: window.innerWidth < 768 ? "auto" : 0,
          }}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
