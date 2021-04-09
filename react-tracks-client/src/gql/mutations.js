import { gql } from "apollo-boost";

export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($userId: Int!, $email: String, $password: String, $username: String) {
        updateUser(userId: $userId, email: $email, password: $password, username: $username) {
            user {
                id
                email
                password
                username
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation createUser($email: String!, $password: String!, $username: String!) {
        createUser(username: $username, email: $email, password: $password) {
            user {
                username
                email
            }
        }
    }
`;

export const CREATE_TRACK_MUTATION = gql`
    mutation($title: String!, $description: String!, $artist: String!, $url: String!) {
        createTrack(title: $title, description: $description, artist: $artist, url: $url) {
            track {
                id
                title
                description
                artist
                url
                likes {
                    id
                }
                postedBy {
                    id
                    username
                }
            }
        }
    }
`;

export const DELETE_TRACK_MUTATION = gql`
    mutation($trackId: Int!) {
        deleteTrack(trackId: $trackId) {
            trackId
        }
    }
`;

export const CREATE_LIKE_MUTATION = gql`
    mutation($trackId: Int!) {
        createLike(trackId: $trackId) {
            track {
                id
                likes {
                    id
                }
            }
        }
    }
`;

export const UPDATE_TRACK_MUTATION = gql`
    mutation($trackId: Int!, $title: String, $url: String, $description: String, $artist: String) {
        updateTrack(
            trackId: $trackId
            title: $title
            url: $url
            description: $description
            artist: $artist
        ) {
            track {
                id
                title
                description
                artist
                url
                likes {
                    id
                }
                postedBy {
                    id
                    username
                }
            }
        }
    }
`;