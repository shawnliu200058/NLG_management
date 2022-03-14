const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// module.exports = {
//   configureWebpack: (config) => {
//     config.plugins.push(
//       AutoImport({
//         resolvers: [ElementPlusResolver()]
//       })
//     )
//     config.plugins.push(
//       Components({
//         resolvers: [ElementPlusResolver()]
//       })
//     )
//   }
// }

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       require('unplugin-auto-import/webpack')({ /* options */ }),
//       require('unplugin-vue-components/webpack')({ /* options */ })
//     ],
//   },
// }

module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),

      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      }
    }
  }
}
