import { LineChart, Line } from 'recharts';

const LineChartComponent = ({ data,width,height }) => {
    return (
        <LineChart width={width} height={height} data={data}>
            <Line type="monotone" dataKey={data?.lables} stroke="#8884d8" />
        </LineChart>
    );
};

export default LineChartComponent