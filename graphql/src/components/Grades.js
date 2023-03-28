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
      <h1 style={{marginBottom: 13}}>Grades</h1>
      <div id="gradeBlock">
        <h2>Piscine-go first 25</h2>
        <ul style={{paddingLeft: 0}}>
          <div id="gradeInfo">
            <div>
              <li id="span">
                <span id="g1">Quest 1</span>
                <ul id="gradeData1">
                  {quest1Names.map((name) => (
                    <li key={name}>
                      {name} <span style={{color: "#F7E731", fontSize: 16, paddingLeft: 13}}>{getGradeCounts(name, "quest-01").zero}:{getGradeCounts(name, "quest-01").one}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
            <div>
              <li id="span">
                <span id="g2">Quest 2</span>
                <ul id="gradeData2">
                  {quest2Names.map((name) => (
                    <li key={name}>
                      {name} <span style={{color: "#F7E731", fontSize: 16, paddingLeft: 13}}>{getGradeCounts(name, "quest-02").zero}:{getGradeCounts(name, "quest-02").one}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
            <div>
              <li id="span">
                <span id="g3">Quest 3</span>
                <ul id="gradeData3">
                  {quest3Names.map((name) => (
                    <li key={name}>
                      {name} <span style={{color: "#F7E731", fontSize: 16, paddingLeft: 13}}>{getGradeCounts(name, "quest-03").zero}:{getGradeCounts(name, "quest-03").one}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </div>
          </div>
        </ul>
      </div>
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