Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    hidden: true,
    hasMore: "false",
  },
  methods: {
    // 这里是一个自定义方法
    showLoad: function () {
      this.triggrEvent('showLoad',{
        hidden:this.data.hidden,
        hasMore:this.data.hasMore
      })
     }
  }
})