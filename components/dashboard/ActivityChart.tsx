"use client";

/**
 * Detection activity chart — demo events per day.
 * Rendered with Recharts from the simulated dataset; labelled accordingly.
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ActivityChart({
  data,
  height = 260,
}: {
  data: { date: string; count: number }[];
  height?: number;
}) {
  const formatted = data.map((d) => ({
    ...d,
    label: d.date.slice(8) + "." + d.date.slice(5, 7),
  }));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formatted} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#DCE3EB" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#657386" }}
            tickLine={false}
            axisLine={{ stroke: "#DCE3EB" }}
            interval="preserveStartEnd"
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#657386" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            cursor={{ fill: "rgba(245,166,35,0.08)" }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #DCE3EB",
              fontSize: 12,
              color: "#182230",
              boxShadow: "0 12px 24px -16px rgba(16,28,44,0.4)",
            }}
            labelStyle={{ color: "#657386", fontWeight: 600 }}
            formatter={(value) => [`${value} demo events`, "Demo events"]}
          />
          <Bar dataKey="count" fill="#F5A623" radius={[4, 4, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
