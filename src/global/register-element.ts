import { App } from 'vue'

import {
  Avatar,
  Cellphone,
  House,
  Notebook,
  Goods,
  User,
  List,
  Setting,
  Expand,
  Fold
} from '@element-plus/icons-vue'

const icons = [
  Avatar,
  Cellphone,
  House,
  Notebook,
  Goods,
  User,
  List,
  Setting,
  Expand,
  Fold
]

export default function (app: App): void {
  for (const icon of icons) app.component(icon.name, icon)
}
