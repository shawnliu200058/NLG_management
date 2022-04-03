import hyRequest from '../../index'
import IDataType from '../type'

enum FileAPI {
  FileUpload = '/upload/test/2'
}

function fileUploadReq(type: string, id: number, file: any) {
  return hyRequest.post<IDataType>({
    url: `/upload/${type}/${id}`,
    data: file,
    method: 'POST'
  })
}

function fileUpdateReq(type: string, id: number, file: any) {
  return hyRequest.patch<IDataType>({
    url: `/upload/${type}/${id}`,
    data: file,
    method: 'PATCH'
  })
}

export { fileUploadReq, fileUpdateReq }
