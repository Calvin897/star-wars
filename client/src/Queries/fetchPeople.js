import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query($page: Int) {
    people(page: $page) {
      name
      height
      mass
      gender
      homeworld {
        name
      }
    }
  }
`;

export const GET_PERSON = gql`
  query($name: String) {
    person(name: $name) {
      name
      height
      mass
      gender
      homeworld {
        name
      }
    }
  }
`;

export const PAGINATION = gql`
  query($page: Int) {
    pagination(page: $page) {
      name
      height
      mass
      gender
    }
  }
`;

// {
//     people {
//       name
//       height
//       mass
//       gender
//       homeworld {
//         name
//       }
//     }
//   }

// query($page: Int) {
//     people(page: $page) {
//       name
//       height
//       mass
//       gender
//       homeworld {
//         name
//       }
//     }
//   }
