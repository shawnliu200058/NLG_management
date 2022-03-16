import { ref } from 'vue'

import PageModal from '@/components/page-modal/page-modal.vue'

const defaultInfo = ref({})
const pageModalRef = ref<InstanceType<typeof PageModal>>()

const handleEditData = (item: any) => {
  // console.log(item)
  // 浅拷贝
  defaultInfo.value = { ...item }
  if (pageModalRef.value) pageModalRef.value.dialogVisible = true
}

export { handleEditData, defaultInfo, pageModalRef }
