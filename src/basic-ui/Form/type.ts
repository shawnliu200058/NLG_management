type IFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'datepicker'
  | 'upload'
  | 'avatar'

export interface IFormItem {
  field: string
  type: IFormType
  label?: string
  rules?: any[]
  placeholder?: string
  // 针对 select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  isShowUpload?: boolean
}
