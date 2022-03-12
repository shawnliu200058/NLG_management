export default interface IDataType<T = any> {
  returnCode: number
  data: T
  message?: string
}
