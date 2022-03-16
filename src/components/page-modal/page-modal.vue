<template>
  <div class="page-modal">
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="30%"
      destroy-on-close
    >
      <basic-form v-bind="modalConfig" v-model="formData"></basic-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, onMounted } from 'vue'

import BasicForm from '@/basic-ui/Form'
import { useUserStore } from '@/store/user/user'

export default defineComponent({
  components: { BasicForm },
  props: {
    title: {
      type: String,
      default: ''
    },
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    // const editPayload = ref<any>({ pageName: props.pageName })

    // 由新建或编辑决定弹出的 dialog 是否显示信息
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[item.field] = newVal[item.field]
          // editPayload.value[item.field] = newVal[item.field]
        }
      }
    )

    const handleConfirmClick = () => {
      dialogVisible.value = false
      const editPayload = {
        pageName: props.pageName,
        id: props.defaultInfo.id,
        editData: { ...formData.value }
      }
      // 若 defaultInfo 存在字段，则说明为编辑操作
      if (Object.keys(props.defaultInfo).length) {
        if (props.pageName === 'user') {
          const userStore = useUserStore()
          userStore.editPageDataAction(editPayload)
        }
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style lang='less' scoped>
</style>