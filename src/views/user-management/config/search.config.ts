import { IForm, IFormItem } from '@/basic-ui/Form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    // {
    //   field: 'id',
    //   type: 'input',
    //   label: 'id',
    //   placeholder: '请输入id'
    // },
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
    // {
    //   field: 'address',
    //   type: 'input',
    //   label: '收货地址',
    //   placeholder: '请输入收货地址'
    // },
    // {
    //   field: 'createdAt',
    //   type: 'datepicker',
    //   label: '创建时间',
    //   otherOptions: {
    //     startPlaceholder: '开始时间',
    //     endPlaceholder: '结束时间',
    //     type: 'daterange'
    //   }
    // }
  ]
}
