<template>
  <div class="basic-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :inline="isInline">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  clearable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'avatar'">
                <el-avatar
                  v-if="formData[`${item.field}`]"
                  shape="square"
                  :size="200"
                  fit="fit"
                  :src="formData[`${item.field}`]"
                />
              </template>
              <!-- <template v-else-if="item.type === 'upload'">
                <basic-upload ref="basicUploadRef"></basic-upload>
              </template> -->
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <!-- 写在这里的原因是 v-if 不能与 ref 同时使用 -->
      <basic-upload v-show="isShowUpload" ref="basicUploadRef"></basic-upload>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, PropType, ref, watch } from 'vue'

import { IFormItem } from './type'
import BasicUpload from '../Upload'

export default defineComponent({
  components: {
    BasicUpload
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    },
    formItems: {
      // 数组元素为 IFormItem 类型
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    isInline: {
      type: Boolean,
      default: false
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    isShowUpload: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })

    watch(
      formData,
      (newVal) => {
        // console.log(newVal)
        emit('update:modelValue', newVal)
      },
      { deep: true }
    )

    const basicUploadRef = ref<InstanceType<typeof BasicUpload>>()

    const uploadAction = (uploadItemId: number, pageName?: string) => {
      // console.log(uploadItemId)
      // 存在文件上传时才进行上传操作
      if (props.isShowUpload) {
        // 新建
        if (pageName) basicUploadRef.value?.uploadFile(uploadItemId, pageName)
        // 编辑
        else basicUploadRef.value?.uploadFile(uploadItemId)
      }
    }

    return {
      formData,
      basicUploadRef,
      uploadAction
    }
  }
})
</script>

<style lang='less' scoped>
// .basic-form {
//   padding-top: 22px;
// }
</style>