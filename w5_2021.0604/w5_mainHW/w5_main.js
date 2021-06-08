import productModal from "./checkProductModal.js";

const app = Vue.createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/api',
            apiPath: 'ffjjgogogo',
            loadingStatus: {
                loadingItem: ''
            },
            page: 1,
            products: '',
            tempProduct: '',
            cart: [],
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: ''
            }
        }
    },
    components: {
        productModal
    },
    created() {},
    mounted() {
        this.getProduct()
        this.cartListRender() //一進入畫面也取得購物車列表
    },
    computed() {},
    watch() {},
    methods: {
        getProduct() {
            const productApi = `${this.apiUrl}/${this.apiPath}/products`
            // const productApi = `${this.apiUrl}/${this.apiPath}/products?page=${this.page}`
            axios.get(productApi)
                .then(res => {
                    // console.log(res)
                    this.products = res.data.products
                })

        },
        openModal(item) {
            // 加入loading 圖示
            this.loadingStatus.loadingItem = item.id

            // 因為單向數據流的問題，所以盡可能不要在內層直接使用外層props進來的資料，而是傳進id後重新get
            axios.get(`${this.apiUrl}/${this.apiPath}/product/${item.id}`)
                .then(res => {
                    // console.log(res.data.product)
                    this.tempProduct = res.data.product
                    this.loadingStatus.loadingItem = '' //清空，結束loading
                    this.$refs.productModal.openModal()
                })
        },
        addCart(id, qty = 1) {
            //qty=1 預設值，這要html標籤上就可以不設

            // 加入loading 圖示
            this.loadingStatus.loadingItem = id

            const cart = {
                product_id: id,
                qty
            }
            axios.post(`${this.apiUrl}/${this.apiPath}/cart`, {
                    data: cart
                })
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        this.$refs.productModal.closeModal()
                        alert('成功加入購物車')
                        // 加入loading 圖示
                        this.loadingStatus.loadingItem = '' //清空loading 樣式
                        this.cartListRender() //重新渲染購物車列表
                    } else {
                        alert(res.data.message)
                    }
                })

        },
        cartListRender() {
            axios.get(`${this.apiUrl}/${this.apiPath}/cart`)
                .then(res => {
                    console.log(res)
                    this.cart = res.data.data
                })
        },
        updateCart(item) {
            //下方購物車列表更新數量
            const newCart = {
                product_id: item.product.id,
                qty: item.qty
            }
            // console.log(newCart)
            axios.put(`${this.apiUrl}/${this.apiPath}/cart/${item.id}`, {
                    data: newCart
                })
                .then(res => {
                    // console.log(res)
                    // 重新取的購物車列表
                    this.cartListRender()
                })
        },
        addProduct(item) {
            item.qty += 1
            const newCart = {
                product_id: item.product.id,
                qty: item.qty
            }
            // console.log(newCart)
            // 更新購物車
            axios.put(`${this.apiUrl}/${this.apiPath}/cart/${item.id}`, {
                    data: newCart
                })
                .then(res => {
                    // console.log(res)
                    // 重新取的購物車列表
                    this.cartListRender()
                })

        },
        minusProduct(item) {
            if (item.qty <= 0) {
                item.qty === 0
            } else {
                item.qty -= 1
            }
            const newCart = {
                product_id: item.product.id,
                qty: item.qty
            }
            // console.log(newCart) 
            // 更新購物車
            axios.put(`${this.apiUrl}/${this.apiPath}/cart/${item.id}`, {
                    data: newCart
                })
                .then(res => {
                    // console.log(res)
                    // 重新取的購物車列表
                    this.cartListRender()
                })
        },
        delItem(item) {
            console.log(item.id)
            axios.delete(`${this.apiUrl}/${this.apiPath}/cart/${item.id}`)
                .then(res => {
                    if (res.data.success) {
                        // console.log(res)
                        alert(`成功移除${item.product.title}`)
                        // 重新取得購物車列表
                        this.cartListRender()
                    } else {
                        alert(res.data.message)
                    }
                })
        },
        delCart() {
            axios.delete(`${this.apiUrl}/${this.apiPath}/carts`)
                .then(res => {
                    if (res.data.success) {
                        alert('成功清空購物車')
                        this.cartListRender()
                    } else {
                        alert(res.data.message)
                    }
                })
        },
        onSubmit() {
            const order = this.form
            axios.post(`${this.apiUrl}/${this.apiPath}/order`, {
                    data: order
                })
                .then(res => {
                    if (res.data.success) {
                        alert('成功建立訂單')
                        this.cartListRender()

                    } else {
                        alert(res.data.message)
                    }
                })
        }
    },
})

// 全部加入veevalidation 規則
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

// 註冊全域veevalidation表單驗證元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

// 加入多國語系
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

app.mount('#app')