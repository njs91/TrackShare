import { gql } from "apollo-boost";

export const GET_TRACKS = gql`
    query getTracks {
        tracks {
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
`

export const SEARCH_TRACKS_QUERY = gql`
    query($search: String) {
        tracks(search: $search) {
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
`;

export const PROFILE_QUERY = gql`
    query($id: Int!) {
        user(id: $id) {
            id
            username
            dateJoined
            email
            password
            likeSet {
                id
                track {
                    id
                    title
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
            trackSet {
                id
                title
                url
                likes {
                    id
                }
            }
        }
    }
`;

export const ME_QUERY = gql`
    {
        me {
            id
            username
            email
            likeSet {
                track {
                    id
                }
            }
        }
    }
`;