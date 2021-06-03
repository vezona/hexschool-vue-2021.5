const app = {
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath: 'ffjjgogogo',
            username: '',
            password: '',
        }
    },
    methods: {
        sendUser() {
            const user = {
                username: this.username,
                password: this.password
            }

            axios.post(`${this.apiUrl}/admin/signin`, user)
                .then(res => {
                    console.log(res)
                    if (res.data.success === true) {
                        // 接著設定token/expired等等
                        const token = res.data.token,
                            expired = res.data.expired;
                        console.log(token, expired)
                        // 存token進cookie
                        document.cookie = `hextoken=${token};expired=${new Date(expired)}`
                        // 轉址
                        window.location = "./w4_mainHW_products.html"

                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

    },
    created() {

    }
}

Vue.createApp(app).mount('#app')