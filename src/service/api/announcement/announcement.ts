import hyRequest from '../../index'
import IDataType from '../type'

function createAnnouncement(data: any) {
  return hyRequest.post<IDataType>({
    url: '/announcement',
    data
  })
}

function getAnnouncement() {
  return hyRequest.get<IDataType>({
    url: '/announcement'
  })
}

export { createAnnouncement, getAnnouncement }
