const emitter = mitt();
export default {
    data() {
        return {
            modal: null,
            // 因為單向數據流的問題，所以盡可能不要在內層直接使用外層props進來的資料，而是重新賦予在product上再使用
            product: '',
            cart: [],
            qty: 1,

        }
    },
    props: ['tempProduct'],
    template: '#userProductModal',
    watch: {
        // 因為單向數據流的問題，所以另外宣告product上複製外層傳入的tempProduct
        // 這邊用watch監聽如果外層tempProduct有變動，就改變內層product的值
        tempProduct() {
            this.product = this.tempProduct
        }

    },
    mounted() {
        // console.log(this.$refs.modal)
        this.modal = new bootstrap.Modal(this.$refs.modal)
    },
    methods: {
        openModal() {
            this.qty = 1
            this.modal.show()
        },
        closeModal() {
            this.modal.hide()
        }

    }

}