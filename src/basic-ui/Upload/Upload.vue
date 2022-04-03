<template>
  <!-- <el-upload
    class="upload-demo"
    drag
    action=""
    :show-file-list="false"
    :auto-upload="false"
    :http-request="uploadSectionFile"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖拽文件 或 <em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">jpg/png 文件大小不能超过 500kb</div>
    </template>
  </el-upload> -->

  <div class="container">
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action=""
      :auto-upload="false"
      :limit="1"
      :on-exceed="uploadExceed"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>

      <el-button v-if="false" class="ml-3" type="success">
        upload to server
      </el-button>

      <template #tip>
        <div class="el-upload__tip">jpg/png 文件大小不能超过 500kb</div>
      </template>
    </el-upload>
  </div>

  <!-- <div>
    <form
      action="http://localhost:8888/upload/test/2"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="file" name="img" id="img" :value="value" />
      <input type="submit" value="提交" />
    </form>

    <iframe name="stop" style="display: none"></iframe>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { fileUploadReq, fileUpdateReq } from '@/service/api/file/upload'

// import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'

// import type { UploadFile, UploadFiles } from 'element-plus'

export default defineComponent({
  setup() {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const handlePictureCardPreview = (file: any) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }

    const uploadRef = ref<any>()
    const uploadFile = (uploadItemId: number) => {
      // console.log(uploadRef.value.uploadFiles[0])
      // console.log(uploadItemId)
      if (uploadRef.value.uploadFiles[0]) {
        let fileObj = uploadRef.value.uploadFiles[0].raw
        // let fileObj = options.file
        let form = new FormData()
        form.append('img', fileObj)
        console.log(form.get('img'))
        fileUpdateReq('categoryIcon', uploadItemId, form)
          .then((res) => {
            // options.onSuccess(res)
          })
          .catch((err) => {
            // options.onError(err)
          })
      }
    }

    const uploadExceed = () => {
      ElMessage.error('只能上传 1 个文件')
    }

    const beforeUpload = (rawFile: any) => {
      // console.log(rawFile)
    }

    const onSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
      // console.log(uploadFile, uploadFiles)
    }

    const value = ref('')

    return {
      dialogImageUrl,
      dialogVisible,
      disabled,
      handlePictureCardPreview,
      process,
      uploadRef,
      uploadExceed,
      uploadFile,
      beforeUpload,
      onSuccess,
      value
    }
  }
})
</script>

<style lang="scss" scope>
.container {
  margin-bottom: 20px;
}
</style>