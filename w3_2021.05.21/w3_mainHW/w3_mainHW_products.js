const product = {
    data() {
        return {
            products: ''

        }

    },
    methods: {
        creatNewProduct() {

        }

    },
    created() {
        // 在created的階段先取資料
        const apiPath = "ffjjgogogo";
        const container = document.querySelector(".container");
        const productList = document.querySelector("#productList");
        let apiPage = 1;

        axios.get(`https://vue3-course-api.hexschool.io/api/${apiPath}/products?page=${apiPage}`)
            .then(res => {
                console.log(res)
                this.products = res.data.products
            })
    }
};

Vue.createApp(product).mount('#app');