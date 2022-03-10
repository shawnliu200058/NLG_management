import hyRequest from '../../index'

import IDataType from '../type'
import { IAccount, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/admin/login'
}

function accountLoginReq(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export {
  accountLoginReq
}