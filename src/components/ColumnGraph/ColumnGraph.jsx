import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

// const revenues = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 8,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 18,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];


const revenues = [
   { "day": "01", "thisWeek": 700000, "lastWeek": 600000 },
    { "day": "02", "thisWeek": 800000, "lastWeek": 500000 },
    { "day": "03", "thisWeek": 650000, "lastWeek": 550000 },
    { "day": "04", "thisWeek": 780000, "lastWeek": 680000 },
    { "day": "05", "thisWeek": 720000, "lastWeek": 620000 },
    { "day": "06", "thisWeek": 850000, "lastWeek": 750000 }
]
const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

export default class ColumnGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-with-min-height-9nmfg9';

  render() {
    return (
      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          width={500}
          height={300}
          data={revenues}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="thisWeek" fill="#5A6ACF" minPointSize={5} barSize={30}>
            <LabelList dataKey="day" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="lastWeek" fill="#E6E8EC" minPointSize={10} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
