import gql from 'graphql-tag';

export const messagesByPlayerId = gql`
query messagesByPlayerId($id: Int!) {
  messagesByPlayerId(id: $id) {
    id
    username
    googleAccount
    playerId
    message
    modifiedDate
  }
}`;

export const messagesByClubId = gql`
query messagesByClubId($id: Int!) {
  messagesByClubId(id: $id) {
    id
    username
    googleAccount
    clubId
    message
    modifiedDate
  }
}`;

export const messagesByPlayerIdAdmin = gql`
query messagesByPlayerId($id: Int!) {
  messagesByPlayerId(id: $id) {
    id
    username
    googleAccount
    ipAddr
    playerId
    message
    modifiedDate
  }
}`;

export const messagesByClubIdAdmin = gql`
query messagesByClubId($id: Int!) {
  messagesByClubId(id: $id) {
    id
    username
    googleAccount
    ipAddr
    clubId
    message
    modifiedDate
  }
}`;

export const messagesByLatestUpdate = gql`
query messagesByLatestUpdate {
  messagesByLatestUpdate {
    id
    username
    googleAccount
    playerId
    clubId
    message
    modifiedDate
  }
}`;

export const mutationInsertMessage = gql`
mutation insertMessage($message: DiscussMessageInput!) {
  insertMessage(message: $message)
}
`

export const mutationDeleteMessage = gql`
mutation deleteMessage ($id: Int!) {
  deleteMessage(id: $id)
}
`