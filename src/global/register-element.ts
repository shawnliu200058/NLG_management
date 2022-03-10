import { App } from 'vue'

import { Avatar, Cellphone } from '@element-plus/icons-vue'

const icons = [Avatar, Cellphone]

export default function (app: App): void {
  for (const icon of icons) app.component(icon.name, icon)
}
