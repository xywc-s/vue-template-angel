/**
 * @see https://github.com/hannoeru/vite-plugin-pages
 */
import Pages from 'vite-plugin-pages'

export default Pages({
  exclude: ['**/components/**/*.vue'],
  importMode(filepath, options) {
    // default resolver
    // for (const page of options.dirs) {
    //   if (page.baseRoute === '' && filepath.startsWith(`/${page.dir}/index`))
    //     return 'sync'
    // }
    // return 'async'
    // Load about page synchronously, all other pages are async.
    // return filepath.includes('about') ? 'sync' : 'async'
  },
  extendRoute(route, parent) {
    // // Augment the route with meta that indicates that the route requires authentication.
    // return {
    //   ...route,
    //   meta: { auth: true },
    // }
  },
  onRoutesGenerated(routes) {}
})
