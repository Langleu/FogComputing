module.exports = {
    /*
     ** Headers of the page
     */
    head: {
      title: 'FogComputing',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: 'FogComputing'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      ],
      script: [{
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript',
      }],
    },
    plugins: [
        { src: '~plugins/vue-chartjs.js', ssr: false },
    ],
    srcDir: 'src/Server/frontend/',
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        baseURL: 'http://localhost:8080'
    },
    css: [],
    env: {},
    serverMiddleware: [
        '../src/Server/api/index.js',
      ]
  };