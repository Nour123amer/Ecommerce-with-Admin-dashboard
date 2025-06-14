import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { "day": "01", "thisWeek": 400, "lastWeek": 500 },
    { "day": "02", "thisWeek": 420, "lastWeek": 480 },
    { "day": "03", "thisWeek": 450, "lastWeek": 460 },
    { "day": "04", "thisWeek": 430, "lastWeek": 470 },
    { "day": "05", "thisWeek": 500, "lastWeek": 490 },
    { "day": "06", "thisWeek": 568, "lastWeek": 520 }
  ];

export default class LineGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/dashed-line-chart-9rttw2';

  render() {
    return (
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
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
          <Line type="monotone" dataKey="thisWeek" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="lastWeek" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
