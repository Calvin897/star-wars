import React from "react";
import { Link } from "react-router-dom";
//styles
import { Wrapper, Content } from "./PersonItem.style";

const PersonItem = ({
  person: { name, height, mass, gender, homeworld },
  page
}) => {
  return (
    <Wrapper>
      <div className="wrapper ui raised segments">
        <div className="content ui segment">
          <Content>
            <h2>{name}</h2>
            <Link className="ui button" to={`/people/${page}/${name}`}>
              View more
            </Link>
            <p>
              <strong>Home World:</strong> {homeworld.name}
            </p>
            <p>
              <strong>Height:</strong> {height}
            </p>
            <p>
              <strong>mass:</strong> {mass}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
          </Content>
        </div>
      </div>
      <br />
    </Wrapper>
  );
};

<div className="ui raised segments">
  <div className="ui segment">
    <p>Top</p>
  </div>
  <div className="ui segment">
    <p>Middle</p>
  </div>
  <div className="ui segment">
    <p>Bottom</p>
  </div>
</div>;

export default PersonItem;
