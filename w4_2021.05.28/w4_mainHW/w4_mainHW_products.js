let productModal, bsDelModal;

// 子元件
import pagination from "./w4_mainHW_pagination.js";

// 根元件
const app = Vue.createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath: 'ffjjgogogo',
            products: '',
            page: 0,
            isNewTitle: true,
            tempProduct: {
                imagesUrl: []
            },

        }
    },
    components: {
        pagination
    },
    methods: {
        getData(p) {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${p}`)
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
        // 跳出Modal
        openModal(detect, item) {
            if (detect === 'delete') {
                bsDelModal.show()
                // 先清空，以免被其他編輯等干擾
                this.tempProduct = {}
                this.tempProduct = {
                    ...item
                }
            } else if (detect === 'edit') {
                productModal.show()
                // 換掉title
                this.isNewTitle = false
                // 編輯商品
                this.tempProduct = {}
                this.tempProduct = {
                    ...item
                }
            } else if (detect === 'new') {
                productModal.show()
                this.tempProduct = {
                    imagesUrl: [],
                };
            }
        },
        // 新增與編輯
        updateProduct(cTempProduct) {
            // 先設定共用參數
            let editProductURL = `${this.apiUrl}/api/${this.apiPath}/admin/product/`;
            let http = 'post'; //新增，編輯是put

            if (!this.isNewTitle) {
                console.log('編輯商品')
                editProductURL = `${this.apiUrl}/api/${this.apiPath}/admin/product/${cTempProduct.id}`
                http = 'put'
            }

            // 這邊不要用axios.http，會出錯
            axios[http](editProductURL, {
                    data: cTempProduct
                })
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        productModal.hide()
                        alert(res.data.message)
                        this.getData(); //還要再重新渲染一次頁面
                    } else {
                        alert(res.data.message)
                    }
                })
        }

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

// 元件
// 新增編擊Modal
app.component('newProductModal', {
    template: ` <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <span v-if="isNewTitle">新增產品</span>
                    <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-1">
                            <div class="form-group">
                                <label for="imageUrl">輸入圖片網址</label>
                                <input type="text" class="form-control" placeholder="請輸入主圖連結"
                                    v-model="tempProduct.imageUrl">
                            </div>
                            <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                        </div>

                        <!-- 這邊跑其他圖片的迴圈 -->
                        <div class="mb-1">其他圖片</div>
                        <div v-if="Array.isArray(tempProduct.imagesUrl)">
                            <div class="form-group" v-for="(img,index) in tempProduct.imagesUrl" :key="index">
                                <br>
                                <label for="imageUrl">圖片{{index+1}}</label>
                                <input type="text" v-model="tempProduct.imagesUrl[index]"
                                    class="form-control" placeholder="請輸入圖片連結">
                                <img class="img-fluid" :src="img" alt="">
                            </div>
                            <br>
                            <!-- 這邊是設定如果有多張圖片的話(編輯商品)，也需要出現新增刪除紐 -->
                            <div
                                v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                                <button class="btn btn-outline-primary btn-sm d-block w-100"
                                    @click="tempProduct.imagesUrl.push('')">
                                    <!-- 這邊的push是建立一個新的空物件，因為上面的input框是用tempProduct去跑回圈 -->
                                    <!-- 所以如果建立新的空物件，就會多出現一個輸入框 -->
                                    新增圖片
                                </button>
                            </div>

                            <!-- 新增或編輯的"新增紐"需要分開，但是刪除扭只要一個，是因為一旦push進去tempProduct的陣列中，這個迴圈就會跑，就帶有刪除扭了 -->
                            <div v-else>
                                <button class="btn btn-outline-danger btn-sm d-block w-100"
                                    @click="tempProduct.imagesUrl.pop()">
                                    刪除圖片框
                                </button>
                            </div>
                        </div>

                        <!-- 這邊是說如果上面沒有多張圖片的話(建立新商品時，還沒有多張圖)，就出現新增多圖圖片的按鈕 -->
                        <!-- 這邊的@click 多加了一個addNewImg的方法，是因為它不像上面是用迴圈跑出來的，所以要手動加入 -->
                        <div v-else>
                            <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addNewImg">
                                新增圖片
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                v-model="tempProduct.title">
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                    v-model="tempProduct.category">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">單位</label>
                                <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                    v-model="tempProduct.unit">
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">原價</label>
                                <input id="origin_price" type="number" min="0" class="form-control"
                                    placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                                    v-model.number="tempProduct.price">
                            </div>
                        </div>
                        <hr>

                        <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                v-model="tempProduct.description">
            </textarea>
                        </div>
                        <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                                v-model="tempProduct.content">
            </textarea>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1"
                                    :false-value="0" v-model="tempProduct.is_enabled">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-primary" @click="cUpdateProduct">
                    確認
                </button>
            </div>
        </div>
    </div>
</div>`,
    props: ['tempProduct'],
    data() {
        return {}
    },
    mounted() {
        // 編輯與新增的modal
        const newProductModal = document.querySelector('#productModal');
        productModal = new bootstrap.Modal(newProductModal)

    },
    methods: {
        addNewImg() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('')
        },
        cUpdateProduct() {
            this.$emit('cUpdateProduct', this.tempProduct)
        }

    }
})

// 刪除modal
app.component('delProductModal', {
    template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="deleteProduct">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>`,
    props: ['tempProduct'],
    data() {
        return {}
    },
    // 要先用props把tempProduct的資料傳進來，打開modal時才取的到資料
    mounted() {
        // 刪除
        const delModal = document.querySelector('#delProductModal');
        bsDelModal = new bootstrap.Modal(delModal)
    },
    methods: {
        // 刪除
        deleteProduct() {
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        // 成功刪除後，要跳出成功刪除alert+關掉Modal+重新渲染畫面
                        alert(res.data.message)
                        bsDelModal.hide()
                        this.getData()

                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }


})

// app.component(productPopups)
app.mount('#app')