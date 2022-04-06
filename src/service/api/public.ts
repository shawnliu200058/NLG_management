import hyRequest from '../index'
import IDataType from './type'

export function getPageListData(
  type: string,
  queryInfo = { offset: 0, limit: 10 }
) {
  return hyRequest.post<IDataType>({
    url: `/${type}/list`,
    data: queryInfo,
    method: 'POST'
  })
}

export function createPageData(type: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: `/${type}`,
    data: newData,
    method: 'POST'
  })
}

export function editPageData(type: string, id: number, editData: any) {
  return hyRequest.patch<IDataType>({
    url: `/${type}/${id}`,
    data: editData,
    method: 'PATCH'
  })
}

export function delPageData(type: string, id: number) {
  return hyRequest.delete<IDataType>({
    url: `/${type}/${id}`,
    method: 'DELETE'
  })
}
