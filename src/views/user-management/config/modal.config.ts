import { IForm } from '@/basic-ui/Form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'nickName',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'gender',
      type: 'select',
      label: '性别',
      placeholder: '请选择性别',
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
      ]
    }
  ],
  colLayout: { span: 24 }
}
