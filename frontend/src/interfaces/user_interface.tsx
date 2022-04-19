export default interface UserType {
   username: string,
   mail: string,
   hash: string,
   salt: string,
   gender: string,
   role?: string
}