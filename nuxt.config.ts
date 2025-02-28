import { constructConfig } from './config'

export default defineNuxtConfig({
  /*
   ** Add alias for library imports
   ** https://v3.nuxtjs.org/guide/going-further/esm#aliasing-libraries
   */
  alias: {
    // Support `import 'global'` used by storybook
    // TODO: Remove this workaround once nuxt provides a proper polyfill for globals https://github.com/nuxt/framework/issues/1922
    global: 'global.ts',
  },

  nitro: {
    // Prevent 'reflect-metadata' from being treeshaked (since we don't explicitly use the import it would otherwise be removed)
    moduleSideEffects: ['reflect-metadata'],
    prerender: {
      // Needed for storybook support
      routes: ['/_storybook/external-iframe'],
    },
  },

  /*
   ** Disable server-side rendering for now
   ** See https://v3.nuxtjs.org/api/configuration/nuxt.config#ssr
   ** and https://v3.nuxtjs.org/guide/concepts/rendering for a big-picture overview.
   */
  ssr: false,

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  meta: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      // This is necessary to fix issues with tailwind/naive-ui: https://www.naiveui.com/en-US/light/docs/style-conflict
      {
        name: 'naive-ui-style',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Global CSS
   */
  css: [
    // FontAwesome support
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Add support for naive-ui
    '@huntersofbook/naive-ui-nuxt',
    // Use Pinia for state management
    '@pinia/nuxt',
    // Add storybook support
    './modules/storybook',
    // Add graphql support
    './modules/graphql',
    // Add vue runtime compiler as temporary workaround for https://github.com/nuxt/framework/issues/4661
    'nuxt3-runtime-compiler-module',
    // Add support for writing content in markdown
    // https://content.nuxtjs.org/
    '@nuxt/content',
  ],

  /*
   ** Restarts the server when dependencies change.
   */
  watch: ['server/**/*.graphql'],

  /*
   ** Client and server-side configuration
   ** See https://v3.nuxtjs.org/guide/features/runtime-config
   */
  runtimeConfig: constructConfig(),

  /**
   * Add redirects, mostly for backwards compatibility
   */
  routeRules: {
    '/faq': { redirect: 'https://docs.jabref.org/faq' },
    '/paypal': { redirect: '/donations' },
    '/donations': {
      redirect: 'https://github.com/JabRef/jabref/wiki/Donations/',
    },
    '/gsoc/**': { redirect: '/codeprojects/gsoc' },
    '/bluehat2022': { redirect: '/codeprojects/bluehat2022' },
    '/surveys/': { redirect: '/surveys/2015' },
  },

  /**
   * Storybook integration with Nuxt
   * See https://storybook.nuxtjs.org/
   */
  storybook: {},

  tailwindcss: {
    // Expose config so that we can use it in the vscode extension
    exposeConfig: true,
  },

  content: {
    markdown: {
      // Don't automatically print h2-h4 headings as links
      anchorLinks: false,
    },
  },

  /**
   * Naive UI configuration
   */
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#6072A7',
        primaryColorHover: '#4F5F8F',
        primaryColorPressed: '#3B476B',
        primaryColorSuppl: '#4F5F8F',
      },
    },
  },

  vite: {
    server: {
      // Configure vite for HMR with Gitpod
      // Taken from https://github.com/vitejs/vite/issues/1653#issuecomment-1079322770
      hmr: process.env.GITPOD_WORKSPACE_URL
        ? {
            // Gitpod is served over https, so we need to use wss as well
            protocol: 'wss',
            host: `3000-${process.env.GITPOD_WORKSPACE_ID || ''}.${
              process.env.GITPOD_WORKSPACE_CLUSTER_HOST || ''
            }`,
            port: 443,
          }
        : true,

      // Without this, vite would handle cors in dev mode, which would lead to different behavior in dev and prod
      cors: {
        preflightContinue: true,
      },
    },
  },
})
