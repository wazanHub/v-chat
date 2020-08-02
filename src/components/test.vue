
<script>
export default {
  props: {
    myData: Array
  },
  render: function (h) {
    return h('h1', {
      'class': {
        foo: true,
        bar: false
      },
      style: {
        color: 'yellow',
        fontSize: '24px'
      },
    }, this.myData)
  }
}
</script>
