import { ElMessage, ElMessageBox } from 'element-plus'

type CallbackFn = (item?: any) => void

const msgConfirm = (name: string, successFn?: CallbackFn, item?: any) => {
  ElMessageBox.confirm(`是否删除${name}`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    distinguishCancelAndClose: true
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      successFn && successFn(item)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}

export default msgConfirm
