export default interface IDataType<T = any> {
  status: number
  data: T
  message?: string
}
