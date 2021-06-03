// deleteProductModal
export default {
    data() {
        return {
            test: '測試測試'

        }
    },
    template: '#deleteProductModal',
    methods: {
        openModal() {
            delProductModal.show()
        }
    },
    created() {},
    mounted() {
        // 先抓到DOM上的BS元件，再掛載BS
        // const delProduct = document.querySelector('#delProductModal')
        // delProductModal = new bootstrap.Modal(delProduct)

        // vue2,3要改用$refs去抓資料
        // console.log(this.$refs.delProductModal)
        const delProduct = this.$refs.delProductModal,
            delProductModal = new bootstrap.Modal(delProduct)
        console.log(delProductModal)



        // vue3 Composition 會用setup 搭配 ref()
        // const delProductModal = ref()
        // console.dir(delProductModal)
        // console.log(delProductModal.value)
    }
}