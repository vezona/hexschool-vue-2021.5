<template>
  <div class="container">
    <div class="row justify-content-center">
        <h1 class="h3 my-3 text-center font-weight-normal">
            請先登入後台帳號
        </h1>
        <div class="col-8">
            <form id="form" class="form-signin">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="username" v-model="username"
                        placeholder="name@example.com" required autofocus>
                    <label for="username">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="password" v-model="password"
                        placeholder="Password" required>
                    <label for="password">Password</label>
                </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="sendUser">
                    登入
                </button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {},
  mounted () {},
  methods: {
    sendUser () {
      const user = {
        username: this.username,
        password: this.password
      }
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, user)
        .then(res => {
          console.log(res)
          if (res.data.success === true) {
            // 接著設定token/expired等等
            const token = res.data.token
            const expired = res.data.expired
            console.log(token, expired)
            // 存token進cookie
            document.cookie = `hextoken=${token};expired=${new Date(expired)}`
            // 轉址
            this.$router.push('/dashboard/productsList')
          } else {
            alert(res.data.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
