import { IForm } from '@/basic-ui/Form'

export const categoryModalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '分类名称',
      placeholder: '请输入分类名称'
    },
    {
      field: 'icon_url',
      type: 'avatar',
      label: '分类图标'
    }
  ],
  colLayout: { span: 24 },
  isShowUpload: true
}
