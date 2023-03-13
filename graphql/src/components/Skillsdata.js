import React from "react";
import { request } from "graphql-request";
import { useQuery } from "react-query";
import { sortData } from "./Sortdata";

export default function Skills(props) {
  const { data, isLoading, error } = useQuery("skills", () => {
    return request(props.endpoint, SKILLS_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const { transaction } = data;

  // add xp tgt and get rid of extra words
  const skillsSorted = sortData(transaction);

  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {skillsSorted.map((skill) => (
          <React.Fragment key={skill.name}>
            <div>{skill.name}</div>
            <div>{skill.skill_points}</div>
          </React.Fragment>
        ))}
      </ul>
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
