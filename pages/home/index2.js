var app = getApp();
var http_url = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=news num=2";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sdData: [],
    fabuData: [],
    banners: [
      'http://www.e-homes.com.cn/statics/gw/pc/pic/tuiguang/taocan2/banner.jpg',
      'http://oss.e-homes.com.cn/201911/030880687f.jpg',
    ],
    icons: [
      {
        icon: '../../images/i1.jpg',
        name: '账号资料',
        url: '../member/my',
      },
      {
        icon: '../../images/i2.jpg',
        name: '新闻列表',
        url: '../news/list',
      },
      {
        icon: '../../images/i4.jpg',
        name: '我的收藏',
        url: '../member/favorite',
      },
      {
        icon: '../../images/i3.jpg',
        name: '我的评论',
        url: '../member/comment',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showModel();
    var self = this;
    wx.request({
      url: http_url,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          self.setData({
            fabuData: res.data.return,
          });
        }

      }

    });

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