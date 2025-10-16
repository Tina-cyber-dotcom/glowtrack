import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ProgressChart() {
  // Sample data; later you can fetch this from Workout Log or backend
  const data = [
    { date: "2025-10-12", exercises: 3 },
    { date: "2025-10-13", exercises: 2 },
    { date: "2025-10-14", exercises: 4 },
    { date: "2025-10-15", exercises: 5 },
  ];

  const darkText = "#C2185B";

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#FFF8E7]">
      {/* Header */}
      <h1
        style={{ fontFamily: "'Pacifico', cursive" }}
        className="text-4xl mt-6 text-[#C2185B] text-center flex items-center gap-2"
      >
        My Progress <span className="text-pink-300 text-3xl">🙂</span>
      </h1>

      {/* Chart Card */}
      <div className="mt-6 w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke={darkText} />
            <YAxis stroke={darkText} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="exercises"
              stroke={darkText}
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Optional summary cards */}
      <div className="mt-6 w-full max-w-3xl flex justify-around gap-4">
        <div className="bg-[#FFF0F5] rounded-xl p-4 text-center shadow-md flex-1">
          <p className="text-[#C2185B]/80 text-sm">Total Workouts</p>
          <p className="text-[#C2185B] text-xl font-semibold">{data.length}</p>
        </div>
        <div className="bg-[#FFF0F5] rounded-xl p-4 text-center shadow-md flex-1">
          <p className="text-[#C2185B]/80 text-sm">Max Exercises/Day</p>
          <p className="text-[#C2185B] text-xl font-semibold">
            {Math.max(...data.map((d) => d.exercises))}
          </p>
        </div>
      </div>
    </div>
  );
}
