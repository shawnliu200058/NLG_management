import hyRequest from '../index'
import IDataType from './type'

export function getPageListData(
  type: string,
  queryInfo = { offset: 0, limit: 10 }
) {
  return hyRequest.post<IDataType>({
    url: `/${type}/list`,
    data: queryInfo
  })
}

export function editPageData(type: string, id: number, editData: any) {
  return hyRequest.patch<IDataType>({
    url: `/${type}/${id}`,
    data: editData,
    method: 'PATCH'
  })
}
