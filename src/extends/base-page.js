export default {
  props: {
    route: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    baseRoute() {
      return this.route || this.$route
    },
  },
  methods: {
    transformMarkdownToHtml(content) {
      return this.$markdown.render(content)
    },
  },
}
