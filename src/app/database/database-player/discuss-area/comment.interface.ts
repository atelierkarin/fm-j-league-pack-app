export interface Comment {
  id?: Number,
  username: string,
  googleAccount?: string,
  ipAddr?: string,
  playerId?: Number,
  playerName?: string,
  clubId?: Number,
  clubName?: string,
  message: string,
  createDate?: string,
  modifiedDate?: string,
}