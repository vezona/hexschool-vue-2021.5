// deleteProductModal
export default {
    data() {
        return {
            delmodal: '',
            test: 'hihi'

        }
    },
    template: '#deleteProductModal',
    props: ['temp', 'apiUrl', 'apiPath'],
    created() {},
    mounted() {
        // 編輯或新增的Modal
        console.log(this.$refs)
        // 用refs取得Dom元素
        // const getShowProduct = document.querySelector('#delProductModal')
        this.delmodal = new bootstrap.Modal(this.$refs.delProductModal)
    },
    methods: {
        openDelModal() {
            this.delmodal.show()

        },
        closeDelModal() {
            this.delmodal.hide()
        },
        // 刪除
        deleteProduct() {
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`)
                .then(res => {
                    console.log(res)
                    if (res.data.success) {
                        // 成功刪除後，要跳出成功刪除alert+關掉Modal+重新渲染畫面
                        alert(res.data.message)
                        this.delmodal.hide()
                        this.getDataChild()

                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getDataChild() {
            this.$emit('getDataChild', this.temp)
        }
    }
}