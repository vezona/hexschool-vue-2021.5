<template>
  <div class="container">
    <div class="row justify-content-center">
        <h1 class="h3 my-3 text-center font-weight-normal">
            請先登入
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
                <button class="btn btn-lg btn-submit w-100 mt-3" type="submit" @click.prevent="sendUser">
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
    return {}
  },
  created () {},
  mounted () {},
  methods: {}

}
</script>

<style>

</style>
