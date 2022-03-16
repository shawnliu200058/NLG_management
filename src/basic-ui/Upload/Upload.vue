<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :limit="1"
    @click="handleStart"
    :on-change="process"
  >
    <template #default>
      <el-icon v-if="cancel"><Plus /></el-icon>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-if="cancel" v-model="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'

// import type { UploadFile } from 'element-plus'

export default defineComponent({
  setup() {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const cancel = ref(true)

    const handleRemove = (file: any) => {
      console.log(file)
      cancel.value = true
    }
    const handlePictureCardPreview = (file: any) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }
    const handleStart = (file: any) => {
      console.log(file)
    }

    const process = (file: any, fileList: any[]) => {
      console.log(file)
      if (file !== null) cancel.value = false
    }

    return {
      dialogImageUrl,
      dialogVisible,
      disabled,
      handleRemove,
      handlePictureCardPreview,
      handleStart,
      cancel,
      process
    }
  }
})
</script>
