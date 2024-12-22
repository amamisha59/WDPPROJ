import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
    register(username: $username, email: $email, password: $password, role: $role) {
      token
      username
      email
      role
      id
    }
  }
`;
