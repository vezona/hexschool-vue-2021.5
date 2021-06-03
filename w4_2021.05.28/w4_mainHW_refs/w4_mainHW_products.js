// 子元件
import delmodal from "./w4_mainHW_deletePopups.js";
import showmodal from "./w4_mainHW_productPopups.js";
import pagination from "./w4_mainHW_pagination.js";


// 根元件
const app = Vue.createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath: 'ffjjgogogo',
            products: [],
            page: 0,
            isNew: true,
            tempProduct: {
                imagesUrl: []
            },
        }
    },
    components: {
        delmodal,
        showmodal,
        pagination
    },
    methods: {
        getData() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=1`)
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        // console.log(res.data.products)
                        // console.log(res.data.pagination)
                        this.products = res.data.products
                        this.page = res.data.pagination
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 跳出modal，這邊是用refs的方式，由外層去觸發內層方法
        showModal(detect, item) {
            if (detect === "delete") {
                this.tempProduct = {}
                this.tempProduct = {
                    ...item
                }
                this.$refs.deleteModal.openDelModal()
            } else if (detect === "edit") {
                this.isNew = false;
                this.tempProduct = {}
                this.tempProduct = {
                    ...item
                }
                this.$refs.productModal.openProductModal()
            } else if (detect === "new") {
                this.tempProduct = {
                    imagesUrl: [],
                }
                this.$refs.productModal.openProductModal()
            }
        },

    },
    created() {
        //先把登入頁取到token保留下來
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (!token) {
            window.location = "./w4_mainHW_login.html"
        }

        // 接著要把token帶入api header 進行驗證，否則會取不到資料，也無法編輯刪除
        axios.defaults.headers.common.Authorization = token;

        // 接著接產品的API資料
        this.getData()
    },
    mounted() {}
})

// app.component(productPopups)
app.mount('#app')