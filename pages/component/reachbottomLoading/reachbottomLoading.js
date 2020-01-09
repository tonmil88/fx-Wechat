Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
        showLoad: function() {
          this.triggrEvent('showLoad', {
            hidden: this.data.hidden,
            hasMore: this.data.hasMore
          })
        }
      }
    })
  }
})