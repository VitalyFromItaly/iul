export default () => {
  const fullEnvName = process.env.NODE_ENV;
  const baseUrl = process.env.BASE_URL || 'http://astra.rco.ru';
  const port = process.env.PORT || 8005;
  const config = {
    publicRuntimeConfig: {
      environment: fullEnvName,
      baseUrl,
      port
    },
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    server: {
      port: 3012,
      host: '0.0.0.0'
    },

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'iul',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { charset: 'utf-8' },
        // { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['devextreme/dist/css/dx.light.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '~/plugins/context',
      '~/plugins/auth',
      '~/plugins/store',
      '~/plugins/presenter',
      '~/plugins/cache',
      '~/plugins/notification',
      '~/plugins/bus',
      '~/plugins/directives'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
      {
        path: '~/components',
        extensions: ['vue'],
        ignore: ['~components/pages', '**/_**']
      },
      {
        path: '~/business',
        extensions: ['vue']
      }
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/typescript
      '@nuxt/typescript-build',
      // https://go.nuxtjs.dev/stylelint
      '@nuxtjs/stylelint-module',
      // https://go.nuxtjs.dev/tailwindcss
      '@nuxtjs/tailwindcss'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      'bootstrap-vue/nuxt'
    ],
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
      baseURL: `${baseUrl}:${port}`,
      credentials: true,
      init(axios) {
        axios.defaults.withCredentials = true;
      }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
  };
  return config;
};
