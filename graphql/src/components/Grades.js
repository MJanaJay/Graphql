import React from "react";
import { request } from "graphql-request";
import { useQuery } from "react-query";

export default function Grades(props) {
  const { data, isLoading, error } = useQuery("grades", () => {
    return request(props.endpoint, GRADES_QUERY);
  }, { variables: { limit: -1 } });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const grades = data.result;

  const quest1Names = [...new Set(
    grades
      .filter((grade) => grade.path.includes("quest-01") && grade.grade <= 9)
      .map((grade) => grade.object.name)
  )];

  const quest2Names = [...new Set(
    grades
      .filter((grade) => grade.path.includes("quest-02") && grade.grade <= 9)
      .map((grade) => grade.object.name)
  )];

  const quest3Names = [...new Set(
    grades
      .filter((grade) => grade.path.includes("quest-03") && grade.grade <= 9)
      .map((grade) => grade.object.name)
  )];

  function getGradeCounts(name, questPath) {
    const filteredGrades = grades.filter((grade) => {
      return grade.object.name === name && grade.path.includes(questPath);
    });

    const counts = filteredGrades.reduce(
      (acc, cur) => {
        if (cur.grade === 0) {
          acc.zero += 1;
        } else if (cur.grade === 1) {
          acc.one += 1;
        }
        return acc;
      },
      { zero: 1, one: 0 }
    );

    return counts;
  }

  return (
    <div>
      <h1>Grades</h1>
      <h2>Piscine-go first 25</h2>
      <ul>
        <li>
          Quest 1
          <ul>
            {quest1Names.map((name) => (
              <li key={name}>
                {name} {getGradeCounts(name, "quest-01").zero}:{getGradeCounts(name, "quest-01").one}
              </li>
            ))}
          </ul>
        </li>
        <li>
          Quest 2
          <ul>
            {quest2Names.map((name) => (
              <li key={name}>
                {name} {getGradeCounts(name, "quest-02").zero}:{getGradeCounts(name, "quest-02").one}
              </li>
            ))}
          </ul>
        </li>
        <li>
          Quest 3
          <ul>
            {quest3Names.map((name) => (
              <li key={name}>
                {name} {getGradeCounts(name, "quest-03").zero}:{getGradeCounts(name, "quest-03").one}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

const GRADES_QUERY = `
{
    result(order_by: {updatedAt: asc}, where: {path: {_like: "%piscine-go/quest-0%"}, userId: {_eq: 1466}}) {
        object {
            name
        }
        path
        grade
    }
}
`;