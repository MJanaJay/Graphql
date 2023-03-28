import React, { useEffect, useRef, useState } from "react";
import { request } from "graphql-request";
import { useQuery } from "react-query";
import Chart from "chart.js/auto";
import theme from "./Theme";

export default function Projects(props) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const { data, isLoading, error } = useQuery("projects", () => {
    return request(props.endpoint, PROJECTS_QUERY);
  });

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(chartRef.current.getContext("2d"), {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [data]);

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const formattedData = data.transaction.map((transaction) => ({
    name: transaction.object.name,
    amount: transaction.amount / 100,
    type: transaction.type,
  }));

  const chartData = {
    labels: formattedData.map((data) => data.name),
    datasets: [
      {
        label: "Amount",
        data: formattedData.map((data) => data.amount),
        borderColor: theme.palette.primary.main,
        // pointBackgroundColor: "0",
        pointStyle: "circle",
        pointHoverBackgroundColor: theme.palette.secondary.main,
        borderWidth: 1,
        pointBorderWidth: 1,
        pointRadius: 5,
        backgroundColor: theme.palette.tertiary.main,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1>Projects</h1>
      <div id="projectBlock">
          <canvas style={{width: "100%"}} ref={chartRef} />
      </div>
    </div>
  );
}

const PROJECTS_QUERY = `
{
    transaction(order_by: {createdAt: asc}, where: {userId: {_eq: 1466}, type: {_eq: "xp"}, object : {type : {_eq: "project"}}}) {
        amount
        type
        object {
            name
        }
    }
}
`;