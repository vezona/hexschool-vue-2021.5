<template>
  <div class="container">
    <loading v-if="loading"></loading>
    <div class="mt-4" v-else>
      <!-- 商品列表 -->
          <table class="table align-middle">
              <thead>
                  <tr>
                      <th>圖片</th>
                      <th>商品名稱</th>
                      <th>價格</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in products" :key="item.id">
                      <td style="width: 200px">
                          <div style="height: 100px; background-size: cover; background-position: center"
                              :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                      </td>
                      <td>{{item.title}}</td>
                      <td>
                          <div class="price">{{item.price}}</div>
                          <div class="origin_price">原價{{item.origin_price}}</div>
                      </td>
                      <td>
                          <div class="btn-group btn-group-sm">
                              <!-- <button type="button" class="btn  btn-outline-secondary">
                                 <div class="spinner-border spinner-border-sm" role="status">
                                  <span class="visually-hidden">Loading...</span>
                                  </div>
                                  查看更多
                              </button>  -->
                              <router-link :to="`/product/${item.id}`" class="btn  btn-outline-secondary">查看更多</router-link>
                              <button type="button" class="btn  btn-outline-danger">加到購物車</button>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import loading from '@/components/Loading.vue'

export default {
  name: 'ProductsList',
  components: { loading },
  data () {
    return {
      user: {},
      products: '',
      loading: true
    }
  },
  created () {
    this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`)
      .then(res => {
        console.log(res)
        this.products = res.data.products
        this.loading = false
      })
    console.log(process.env.VUE_APP_API)
  },
  methods: {}
}
</script>
