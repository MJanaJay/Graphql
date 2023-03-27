import React, { useState, useEffect } from "react";
import { request } from "graphql-request";
import { useQuery } from "react-query";
import { sortData } from "./Sortdata";
import Chart from "chart.js/auto";
import theme from "./Theme";

export default function Skills(props) {
  const { data, isLoading, error } = useQuery("skills", () => {
    return request(props.endpoint, SKILLS_QUERY);
  });

  const [skillsChart, setSkillsChart] = useState(null);

  useEffect(() => {
    if (skillsChart) {
      skillsChart.destroy();
    }

    if (!isLoading && !error && data) {
      const { transaction } = data;
      const skillsSorted = sortData(transaction);

      // Extract skill names and skill points from skillsSorted
      const skillNames = skillsSorted.map((skill) => skill.name);
      const skillPoints = skillsSorted.map((skill) => skill.skill_points);

      // Initialize Chart.js radar chart
      const ctx = document.getElementById("skillsChart");
      const newChart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: skillNames,
          datasets: [
            {
              label: "Skill Points",
              data: skillPoints,
              pointBackgroundColor: theme.palette.secondary.main,
              pointBorderWidth: 1,
              pointRadius: 0,
              showLine: true,
            },
          ],
        },
        options: {
          elements: {
            line: {
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
              backgroundColor: theme.palette.primary.second,
            },
          },
          scales: {
            r: {
              angleLines: {
                color: '#9b87c8',
              },
              grid: {
                color: '#574d70',
                borderDash: [3,3],
              },
            }
          }
        },
      });

      setSkillsChart(newChart);
    }
  }, [data, isLoading, error]);

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>Skills</h1>
      <div id="skillsBlock">
        <canvas id="skillsChart"></canvas>
      </div>
    </div>
  );
}

// Skills radar graph
const SKILLS_QUERY = `
  {
    transaction(order_by: {type: asc}, where: {type: {_like: "skill%"}, userId: {_eq: 1466}}){
        type
        amount
    }
  }
`;
