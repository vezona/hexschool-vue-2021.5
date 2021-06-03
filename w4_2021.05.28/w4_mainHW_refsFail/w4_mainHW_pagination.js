export default {
    data() {
        return {

        }

    },
    props: ['page-data'],
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination" >
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="p in pageData.total_pages">
        <a class="page-link" href="#">{{p}}</a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
    created() {},
    methods: {

    }
}