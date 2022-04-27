import { ElMessage, ElMessageBox } from 'element-plus'

type CallbackFn = (item?: any) => void

const msgConfirm = (
  confirmMsg: string,
  successFn?: CallbackFn,
  item?: any,
  msg: string = '删除'
) => {
  ElMessageBox.confirm(confirmMsg, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    distinguishCancelAndClose: true
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: `${msg}成功`
      })
      successFn && successFn(item)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: `${msg}取消`
      })
    })
}

export default msgConfirm
