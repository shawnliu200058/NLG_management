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
      :on-change="onChange"
      :on-exceed="handleExceed"
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

import { usePublicStore } from '@/store'

import { genFileId } from 'element-plus'
import type {
  UploadInstance,
  UploadProps,
  UploadFile,
  UploadFiles,
  UploadRawFile
} from 'element-plus'

export default defineComponent({
  setup() {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const handlePictureCardPreview = (file: any) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }

    const uploadRef = ref<UploadInstance>()

    const handleExceed: UploadProps['onExceed'] = (files: any) => {
      uploadRef.value!.clearFiles()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      uploadRef.value!.handleStart(file)
    }

    const beforeUpload = (rawFile: UploadRawFile) => {
      // console.log(rawFile)
    }

    let form = new FormData()
    const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
      // console.log(uploadFile.raw)
      form.append('img', uploadFile.raw as any)
      console.log(form.get('img'))
    }

    const publicStore = usePublicStore()
    const uploadFile = (uploadItemId: number, pageName?: string) => {
      // console.log(uploadRef.value)
      // console.log(uploadItemId)
      if (form.get('img')) {
        // let fileObj = uploadRef.value.uploadFiles[0].raw
        // // let fileObj = options.file
        // let form = new FormData()
        // form.append('img', fileObj)
        // console.log(form.get('img'))
        fileUpdateReq('categoryIcon', uploadItemId, form)
          .then((res) => {
            // options.onSuccess(res)
            if (pageName) {
              // console.log(pageName)
              // 上传完文件后再重新刷新页面，防止图片不能更新
              publicStore.getPageListAction({
                pageName,
                queryInfo: {
                  offset: 0,
                  limit: 10
                }
              })
            }
          })
          .catch((err) => {
            // options.onError(err)
          })
      }
    }

    const uploadExceed = () => {
      ElMessage.error('只能上传 1 个文件')
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
      handleExceed,
      uploadExceed,
      uploadFile,
      beforeUpload,
      onChange,
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