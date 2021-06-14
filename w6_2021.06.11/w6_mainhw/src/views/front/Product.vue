<template>
    <div class="wrap">
      <loading v-if="loading"></loading>
      <div class="container" v-else>{{product.title}}</div>
    </div>
</template>

<style lang="sass" scoped>

</style>

<script>
import loading from '@/components/Loading.vue'

export default {
  name: 'product',
  components: { loading },
  data () {
    return {
      product: '',
      loading: true
    }
  },
  mounted () {
    console.log(this.$route) // 路由屬性
    console.log(this.$router) // 路由方法

    console.log(this.$route.params.id) // 取得id
    // axios方法連api取資料
    const productId = this.$route.params.id
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`
    this.$http.get(`${url}/product/${productId}`)
      .then(res => {
        console.log(res)
        if (res.data.success) {
          this.product = res.data.product
          console.log(this.product)
          this.loading = false
        } else {
          alert(res.data.message)
        }
      })
  }
}
</script>
