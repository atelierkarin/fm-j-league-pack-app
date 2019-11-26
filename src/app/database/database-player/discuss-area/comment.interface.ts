export interface Comment {
  id?: string,
  loginToken: string,
  displayName: string,
  targetPlayerId: string,
  content: string,
  createDate: Number
}