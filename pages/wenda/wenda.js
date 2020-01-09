// pages/component/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    animationData: {},
    // tabOpacity:0
  },
  showInput: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease-in-out",
      delay: 100
    })
    animation.translateY(0).step()
    this.setData({
      inputShowed: true,
      tabOpacity: 1,
      animationData: animation.export()
    });
    console.log(this.data.inputShowed)
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    console.log(this.data.inputShowed)
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})