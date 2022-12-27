import {gql} from "@apollo/client";


export const GET_RECOMMENDED_USERS = gql`
query getRecommendedUsers {
getRecommendedUsers {
avatar, pseudonym, username
}
}
`

export const SEARCH_FOR_RESULTS = gql`
  query searchForResults($searchRequest: String!) {
  searchForResults(searchRequest : $searchRequest) {
    hashtags {
      hashtag, numberOfTweets
    },
    users {
    pseudonym, avatar, username
    }
  }
}
`