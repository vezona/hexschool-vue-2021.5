// showProductModal
export default {
    data() {
        return {
            productModal: '',

        }
    },
    template: '#showProductModal',
    props: ['isNew', 'temp'],
    mounted() {
        // 編輯或新增的Modal
        console.log(this.$refs)
        // 用refs取得Dom元素
        // const getShowProduct = document.querySelector('#productModal')
        this.productModal = new bootstrap.Modal(this.$refs.productModal)

    },
    methods: {
        openProductModal() {
            this.productModal.show()
        },
        closeProductModal() {
            this.modal.hide()
        }
    }
}