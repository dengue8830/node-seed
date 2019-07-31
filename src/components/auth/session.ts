export interface ISession {
  user: {
    id?: string,
    isRoot: boolean,
    isGuest: boolean
  }
}