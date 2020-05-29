<template>
  <div>
    <navbar />
    <app-main />
    <app-footer />
  </div>
</template>

<script>
import { AppMain, Navbar, AppFooter } from './components'

export default {
  components: {
    AppMain,
    Navbar,
    AppFooter,
  },
}
</script>

<style lang="scss" scoped>

</style>
