var app = getApp();

var http_url = app.globalData.http_api + "&function=dr_my_list2&param=list action=content module=anli id=";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    thumb:'',
    stylist_name:'',
    id: '',
    content: '',
    anlitu: [],
    gallery:'',
    index:''
  },
  handClick:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../anli/show?anlitu=' + this.data.gallery+'&index='+index
    })
    console.log(index)
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showModel();
    this.setData({
      avatar: options.avatar,
      thumb: options.thumb,
      stylist_name: options.stylist_name
    })
    var self = this;
    wx.request({
      url: http_url + options.id,
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      method: 'GET',
      success: function (res) {
        if (res.data.code == 1) {
          for (var i in res.data.return) {//不使用过滤
            var c = res.data.return[i];
            console.log(c.images);
          }
        var gallery = JSON.stringify(c.images)
          self.setData({
            content: c,
            anlitu: c.images,
            id: options.id,
            gallery: gallery
          })
          wx.hideToast();
        } else {
          wx.showModal({
            showCancel: false,
            content: res.data.msg
          })
        }
      }
    })
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