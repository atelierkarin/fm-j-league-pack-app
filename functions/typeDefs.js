import { gql } from 'apollo-server-cloud-functions';

export const typeDefs = gql`
  type PlayerUpdateClub {
    name: String!
    nationality: String!
  }

  type FutureTransferClub {
    club: PlayerUpdateClub
    transferDate: String!
  }

  type PlayerUpdatePlayer {
    fmID: ID
    name: String!
    nameEng: String!
    playerType: [Int]
    nationality: String!
  }

  type PlayerUpdate {
    id: String
    fmVersion: String!
    player: PlayerUpdatePlayer!
    updateType: Int!
    activeDate: String!
    updateDate: String!
    club: PlayerUpdateClub!
    previousClub: PlayerUpdateClub
    filetype: Int!
    previousFiletype: Int
    futureTransfer: FutureTransferClub
    remarks: String
  }

  type Query {
    playerUpdates: [PlayerUpdate]
    playerUpdatesByDate(fmVersion: String!, startDate: String!, endDate: String!): [PlayerUpdate]
  }
`;