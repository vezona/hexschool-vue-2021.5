import productModal from "./checkProductModal.js"

const app = Vue.createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/api',
            apiPath: 'ffjjgogogo',
            page: 1,
            products: '',
            tempProduct: ''

        }
    },
    components: {
        productModal
    },
    created() {
        const productApi = `${this.apiUrl}/${this.apiPath}/products?page=${this.page}`
        axios.get(productApi)
            .then(res => {
                console.log(res)
                this.products = res.data.products
                console.log(this.products)
            })

    },
    mounted() {},
    computed() {},
    watch() {},
    methods: {
        openModal(item) {
            this.$refs.productModal.openModal()
            this.tempProduct = ''
            this.tempProduct = item
        }
    },
})

app.mount('#app')