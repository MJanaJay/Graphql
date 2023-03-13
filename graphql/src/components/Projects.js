import React from "react";
import { request } from "graphql-request";
import { useQuery } from "react-query";

export default function Projects(props) {
    const { data, isLoading, error } = useQuery("projects", () => {
        return request(props.endpoint, PROJECTS_QUERY);
    });

    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const projects = data.transaction;

    return (
        <div>
            <h1>Projects</h1>
            <ul>
            {projects.map((transaction, i) => (
                <li key={i}>
                    {transaction.object.name}: {transaction.amount / 100}{transaction.type}
                </li>
            ))}
            </ul>
        </div>
    )
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