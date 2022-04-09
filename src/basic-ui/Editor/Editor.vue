<template>
  <div>
    <div class="full-screen-container">
      <div id="toolbar-container"><!-- 用于创建工具栏 --></div>
      <div id="editor-container">
        <!-- 用于创建编辑器 -->
      </div>
    </div>

    <!-- <textarea id="textarea-1"></textarea>
    <textarea id="textarea-2"></textarea> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IToolbarConfig,
  IDomEditor,
  DomEditor
} from '@wangeditor/editor'

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAnnouncementStore } from '@/store/announcement/announcement'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '<p><br></p>'
    }
  },
  setup(props, { emit }) {
    const editorConfig: Partial<IEditorConfig> = {}
    editorConfig.placeholder = '请输入内容'
    editorConfig.onChange = (editor: IDomEditor) => {
      // 当编辑器选区、内容变化时，即触发
      // console.log('content', editor.children)
      // console.log('html', editor.getHtml())
      emit('update:modelValue', editor.getHtml())
      // const content = editor.children
      // const contentStr = JSON.stringify(content)
      // document.getElementById('textarea-1')!.value = contentStr

      // const html = editor.getHtml()
      // document.getElementById('textarea-2')!.value = html
    }

    const toolbarConfig: Partial<IToolbarConfig> = {
      excludeKeys: ['group-image', 'insertVideo', 'insertTable', 'codeBlock']
    }

    const announcementStore = useAnnouncementStore()
    // 控制内容回显
    const { announcement } = storeToRefs(announcementStore)
    // console.log(announcement.value)

    const editor = ref<IDomEditor>()
    onMounted(() => {
      // 创建编辑器
      editor.value = createEditor({
        selector: '#editor-container',
        html: announcement.value!.content,
        config: editorConfig,
        mode: 'simple' // 或 'simple' 参考下文
      })
      // 创建工具栏
      const toolbar = createToolbar({
        editor: editor.value,
        selector: '#toolbar-container',
        config: toolbarConfig,
        mode: 'simple' // 或 'simple' 参考下文
      })
      // console.log(DomEditor.getToolbar(editor.value))
      // console.log(editor.value)
      // editor.clear()
    })
    // console.log(editor.value)

    const route = useRoute()
    watch(route, () => {
      // console.log(route.name)
      // console.log(announcement.value!.content)
      editor.value?.destroy()
      // if (editor.value) {
      //   editor.value = createEditor({
      //     selector: '#editor-container',
      //     html: announcement.value!.content,
      //     config: editorConfig,
      //     mode: 'simple' // 或 'simple' 参考下文
      //   })
      // }
    })

    const clearFields = () => {
      editor.value!.clear()
      // console.log(announcement.value!.content)
    }

    return {
      clearFields
    }
  }
})
</script>

<style lang='less' scoped>
.full-screen-container {
  z-index: 100; /* 如有需要，可以自定义 z-index */

  #editor-container {
    text-align: left;
    height: 400px;
  }
}
</style>