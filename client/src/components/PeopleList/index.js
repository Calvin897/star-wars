import "./style.css";
import React, { useEffect, useState } from "react";
import { useQuery, gql, graphql } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { GET_PEOPLE } from "../../Queries/fetchPeople";
import PersonItem from "../PersonItem";
import Logo from "../Logo";
import { set } from "date-fns";
//styles
import { Wrapper, Content } from "./PeopleList.style";

const PeopleList = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [pageId, setPageId] = useState(1);
  // const initialState = location.state.pageId ? location.state.pageId * 1 : 1;
  const [pageView, setPageView] = useState(1);

  const { loading, data, error } = useQuery(GET_PEOPLE, {
    variables: { page: page }
  });
  console.log(data);

  useEffect(() => {
    if (pageView > 1) {
      setPage(pageView);
      setPageView(0);
    }

    // setPageView();
  }, [data]);

  const renderPeople = data ? (
    data.people.map(person => {
      return <PersonItem key={person.name} person={person} page={page} />;
    })
  ) : (
    <div className="ui active centered inline loader"></div>
  );

  return (
    <Wrapper>
      <Content>
        <Logo className="logo" />
        <div>
          <button
            className={`ui labeled icon button  ${page === 1 ? "hide" : ""}`}
            onClick={() => setPage(page - 1)}
          >
            <i className="left arrow icon"></i>
            Prev
          </button>
          <button
            className={`ui right labeled icon button ${
              page === 9 ? "hide" : ""
            }`}
            onClick={() => setPage(page + 1)}
          >
            <i className="right arrow icon"></i>
            Next
          </button>
        </div>
        <h4>Page {page}</h4>
        <br />
        {renderPeople}
      </Content>
    </Wrapper>
  );
};

export default PeopleList;
