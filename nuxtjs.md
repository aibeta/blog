# Nuxtjs

### basic

add vue file in pages directory will automatly create page

we can use NuxtLink as router, the attribute is to, not href

static diretory is mapped to the server root

- head properties set meta tags for the page
- layout property can set a page layout as setting layout
- defalut.vue inside layouts directory will be used for all pages
- error.vue inside layouts directory handle client-side error
- create app.html in root directory will customize html template

### context

- context.params access the dynamic parameters
- context.error() show error page with param
- context.$http() use nuxt/http module
- context.store access the vuex store

### $nuxt helper

- we can access $nuxt by this.$nuxt in vue components
- we can access $nuxt by window.$nuxt on client side
- $nuxt.isOffline exposes boolean values if user connection is ok
- $nuxt provides a shortcut to root instance of the application
- $nuxt.refresh() can refresh page without hitting server
- $nuxt.$loading.start() control nuxt's loading bar

### other helper

- window.onNuxtReady() will be called when nuxt app loaded adn redu
- process.client in asyncData tell us app was rendered on server or client

## SSR

- we can use serverMiddleware to extend server-side
- server-side has `req` `res`, dont have `window` `document`
- server-side excited `asyncData` `nuxtServerInit``fetch` hooks functions
