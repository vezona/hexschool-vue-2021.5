<template>
  <div class="loading-wrap d-flex justify-content-center align-items-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style>
.loading-wrap{
  width: 100%;
  height: 500px;
}
.spinner-border{
  width: 6rem;
  height: 6rem;
}

</style>
