<template>
  <div>
    <div class="full-screen-container">
      <div id="toolbar-container"><!-- 用于创建工具栏 --></div>
      <div id="editor-container"><!-- 用于创建编辑器 --></div>
    </div>

    <!-- <textarea id="textarea-1"></textarea>
    <textarea id="textarea-2"></textarea> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor
} from '@wangeditor/editor'

export default defineComponent({
  setup() {
    const editorConfig: Partial<IEditorConfig> = {}
    editorConfig.placeholder = '请输入内容'
    editorConfig.onChange = (editor: IDomEditor) => {
      // 当编辑器选区、内容变化时，即触发
      console.log('content', editor.children)
      console.log('html', editor.getHtml())

      // const content = editor.children
      // const contentStr = JSON.stringify(content)
      // document.getElementById('textarea-1')!.value = contentStr

      // const html = editor.getHtml()
      // document.getElementById('textarea-2')!.value = html
    }

    onMounted(() => {
      // 创建编辑器
      const editor = createEditor({
        selector: '#editor-container',
        config: editorConfig,
        mode: 'simple' // 或 'simple' 参考下文
      })
      // 创建工具栏
      const toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        mode: 'simple' // 或 'simple' 参考下文
      })
    })

    return {
      // editor,
      // toolbar
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