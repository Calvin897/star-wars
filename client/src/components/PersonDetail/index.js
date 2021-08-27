import React, { useEffect, useState } from "react";
import { useQuery, gql, graphql } from "@apollo/client";
import { GET_PERSON } from "../../Queries/fetchPeople";
import { Link } from "react-router-dom";
import PersonItem from "../PersonItem";
import { useHistory } from "react-router-dom";
//style
import { Wrapper } from "./PersonDetail.style";

const PersonDetail = props => {
  const { loading, data, error } = useQuery(GET_PERSON, {
    variables: { name: props.match.params.name }
  });
  const [name, setName] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.person.name);
    }
  }, [data]);

  const renderPerson = data ? (
    <div className="ui piled segment">
      <h4 className="ui header">{data.person.name}</h4>
      <h5> mass: {data.person.mass} </h5>
      <h5> height: {data.person.height} </h5>
      <h5> Homeworld: {data.person.homeworld.name} </h5>
      <h5> Gender: {data.person.gender} </h5>
    </div>
  ) : (
    <div className="ui active centered inline loader"></div>
  );

  const page = props.match.params.page;

  return (
    <Wrapper>
      <Link
        style={{ width: "100px" }}
        className="ui button"
        to={{
          pathname: "/",
          state: {
            pageId: page
          }
        }}
        type="button"
      >
        Go back
      </Link>
      {renderPerson}
    </Wrapper>
  );
};

export default PersonDetail;
