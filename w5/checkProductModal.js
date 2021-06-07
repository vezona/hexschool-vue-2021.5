export default {
    data() {
        return {
            modal: null

        }
    },
    props: ['tempProduct'],
    template: '#userProductModal',
    mounted() {
        console.log(this.$refs.modal)
        this.modal = new bootstrap.Modal(this.$refs.modal)
    },
    methods: {
        openModal() {
            this.modal.show()
        },
        closeModal() {
            this.modal.hide()
        }

    }

}