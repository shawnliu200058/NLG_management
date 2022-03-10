interface IAccount {
  name: string
  password: string
}

interface ILoginResult {
  id: number,
  name: string,
  token: string
}

export {
  IAccount,
  ILoginResult
}