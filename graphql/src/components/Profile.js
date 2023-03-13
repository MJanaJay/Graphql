import React from "react";
import { request } from "graphql-request";
import { useQuery } from "react-query";

// Profile info
export default function Profile(props) {
  const { data, isLoading, error } = useQuery("users", () => {
    return request(props.endpoint, PROFILE_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const user = data.user[0];
  const tran = data.transaction[0];

  return (
    <div>
      <h1>Profile</h1>
      <ul>
        <div>{user.login}</div>
        <div>ID: {user.id}</div>
        <div>Level: {tran.amount}</div>
      </ul>
    </div>
  );
}

const PROFILE_QUERY = `
{
    user(where: {login: {_eq: "testingapplicant"}}) {
      id
      login
    }
    transaction(where: {userId: {_eq: 1466}, amount: {_eq: 19}}) {
      amount
    }
}
`;