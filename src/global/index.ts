import { App } from 'vue'

import registerElement from './register-element'
import registerProperties from './register-properties'

export default function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
