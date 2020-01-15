// pages/component/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    inputVal: "",
    designerFlag: true,//显示设计师类型
    fenggeFlag: true,//显示擅长风格
    designerData: [],
    city: ['佛山', '广州', '东莞', '肇庆'],
    array: ['美国', '中国', '巴西', '日本'],
    objectHx: [
      { value: "", name: "不限" },
      { value: "xdjy", name: "现代简约" },
      { value: "ms", name: "美式" },
      { value: "xzs", name: "新中式" },
      { value: "bo", name: "北欧" },
      { value: "gy", name: "工业" },
      { value: "os", name: "欧式" },
      { value: "qs", name: "轻奢" },
      { value: "ty", name: "田园" },
      { value: "fs", name: "法式" },
    ],
    city_index:0
  },

  showPicker_hx: function () {
    console.log(2332)
    this.setData({
      fenggeFlag: false
    })
  },
  bindPickerChange_city: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      city_index: e.detail.value
    })
  },

  bindPickerChange_hx: function (e) {
    var judge = this.data.objectHx[e.detail.value].value
    var shuaixuan = " LIKE_sjsfg=%" + this.data.objectHx[e.detail.value].value + "%"
    this.setData({
      index_fg: e.detail.value,
      shuaixuan: shuaixuan
    })
    console.log(this.data.shuaixuan)
    wx.request({
      url: http_url + this.data.shuaixuan,
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
        console.log(res.data.return);
        if (res.data.code == 1) {
          this.setData({
            designerData: res.data.return,
            page: 1
          })
        } else {
          console.log(res.data.msg);
          wx.showModal({
            showCancel: false,
            content: res.data.msg
          })
        }
      }
    })
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  clearInput: function () {
    console.log(32)
    this.setData({
      inputVal: ""
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