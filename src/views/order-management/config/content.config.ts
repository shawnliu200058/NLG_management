export const orderPropList = [
  { prop: 'id', label: '编号', minWidth: '60' },
  { prop: 'orderID', label: '订单编号', minWidth: '100' },
  { prop: 'userName', label: '用户账号', minWidth: '100' },
  { prop: 'real_name', label: '收货人姓名', minWidth: '100' },
  { prop: 'total_price', label: '订单金额', minWidth: '100' },
  { prop: 'createdAt', label: '创建时间', minWidth: '100' },
  // { prop: 'detail', label: '商品标题', minWidth: '100' },
  // { prop: 'price', label: '商品单价', minWidth: '100' },
  // { prop: 'unit', label: '单位', minWidth: '60' },
  // { prop: 'specification', label: '规格', minWidth: '80' },
  // { prop: 'sale', label: '销量', minWidth: '100' },
  // { prop: 'stock', label: '库存', minWidth: '100' },
  // { prop: 'good_address', label: '发货地址', minWidth: '100' },
  { prop: 'operation', label: '操作' }
]

export const basicPropList = [
  { prop: 'orderID', label: '订单编号', minWidth: '100' },
  { prop: 'userName', label: '用户账号', minWidth: '100' },
  { prop: 'total_price', label: '订单金额', minWidth: '100' },
  { prop: 'remark', label: '订单备注', minWidth: '100' },
  { prop: 'createdAt', label: '创建时间', minWidth: '100' }
]

export const receiverPropList = [
  { prop: 'real_name', label: '收货人', minWidth: '100' },
  { prop: 'phone', label: '手机号码', minWidth: '100' },
  { prop: 'delivery_address', label: '收货地址', minWidth: '100' },
  { prop: 'house', label: '门牌号', minWidth: '100' }
]

export const goodPropList = [
  { prop: 'displayPicUrl', label: '商品图片', minWidth: '100' },
  { prop: 'name', label: '商品名称', minWidth: '100' },
  { prop: 'price', label: '单价', minWidth: '100' },
  { prop: 'specification', label: '规格', minWidth: '100' },
  { prop: 'count', label: '数量', minWidth: '100' },
  { prop: 'good_address', label: '发货地址', minWidth: '100' },
  { prop: 'subtotal', label: '小计', minWidth: '100' }
]
