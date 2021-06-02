// showProductModal
export default {
    data() {
        return {

        }
    },
    template: '#showProductModal',
    methods: {


    },
    created() {

    },
    mounted() {
        // 編輯或新增的Modal
        const getShowProduct = document.querySelector('#productModal')
        showProductModal = new bootstrap.Modal(getShowProduct)

    }
}