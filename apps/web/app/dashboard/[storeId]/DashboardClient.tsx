"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto";

export default function DashboardClient({ store, analytics }: any) {
  useEffect(() => {
    const ctx = document.getElementById("chart-activity") as any;

    if (!ctx) return;

    // Destroy existing chart if any
    let existingChart = Chart.getChart("chart-activity");
    if (existingChart) {
      existingChart.destroy();
    }

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: analytics.daily.labels,
        datasets: [
          {
            label: "Daily Chats",
            data: analytics.daily.values,
            borderColor: "#111827",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { tickBorderDash: [4, 4] } },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, [analytics]);

  return (
    <div className="space-y-10">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox
          label="Total Chats"
          value={analytics.totalChats}
          change={analytics.change7Days}
        />

        <StatBox label="Monthly Chats" value={analytics.monthChats} />

        <StatBox label="Unique Users" value={analytics.uniqueUsers} />

        <StatBox
          label="Widget Status"
          value={store.enabled ? "Enabled" : "Disabled"}
          badgeColor={store.enabled ? "bg-green-600" : "bg-red-500"}
        />
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-medium mb-4">
          Chat Activity (Last 14 Days)
        </h2>
        <canvas id="chart-activity" height="100"></canvas>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Brands */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-3">Top Mentioned Brands</h3>

          <ul className="space-y-3">
            {analytics.topBrands.map((b: any) => (
              <li
                key={b.brand}
                className="flex justify-between text-sm border-b border-gray-200 pb-2"
              >
                <span className="font-medium">{b.brand}</span>
                <span className="text-gray-600">{b.count} mentions</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common User Prompts */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-3">Common User Queries</h3>

          <ul className="space-y-3">
            {analytics.topQueries.map((q: any) => (
              <li
                key={q.text}
                className="flex justify-between text-sm border-b  border-gray-200 pb-2"
              >
                <span className="text-gray-700">{q.text}</span>
                <span className="text-gray-500">{q.count}x</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Script Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium">Embed Snippet</h3>

        <p className="text-sm text-gray-500 mt-1 mb-4">
          Add this to your website before <code>{`</body>`}</code>
        </p>

        <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg text-xs overflow-x-auto">
          {`<script 
  src="https://ursize-plugin.vercel.app/plugin.v1.js"
  data-store="${store.id}"
></script>`}
        </pre>
      </div>
    </div>
  );
}

// Component for stat display
function StatBox({ label, value, change, badgeColor }: any) {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>

      {change !== undefined && (
        <p
          className={`text-sm mt-1 ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change}% last 7 days
        </p>
      )}

      {badgeColor && (
        <span
          className={`inline-block mt-2 px-2 py-1 text-xs rounded-full text-white ${badgeColor}`}
        >
          {value}
        </span>
      )}
    </div>
  );
}
