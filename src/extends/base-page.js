export default {
  props: {
    route: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    /**
     * @returns {Route}
     */
    _$route() {
      return this.route || this.$route
    },
  },
  methods: {},
}
