// deleteProductModal
export default {
    data() {
        return {
            test: '測試測試'

        }
    },
    template: '#deleteProductModal',
    methods: {
        // showDelModal() {
        //     delProductModal.show()
        // }

    },
    created() {},
    mounted() {
        // 先抓到DOM上的BS元件，再掛載BS
        // const delProduct = document.querySelector('#delProductModal')
        // delProductModal = new bootstrap.Modal(delProduct)

        // vue2的寫法，vue3的$refs被ref()取代
        // console.log(this.$refs.delProductModal)
        console.log(this.$refs.delProductModal)

        // vue3 Composition 會用setup 搭配 ref()
        // const delProductModal = ref()
        // console.dir(delProductModal)
        // console.log(delProductModal.value)
    }
}