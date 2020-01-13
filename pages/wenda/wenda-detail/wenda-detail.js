var app = getApp();

var http_url = app.globalData.http_api + "&function=dr_my_list&param=list action=content module=wenda id=";

var member_url = app.globalData.member_api;

Page({
  data: {
    id: '',
    name: '',
    des: '',
    avatar: '',
    title:'',
    listData: [],
    total:'' //评论总数
  },
  onLoad: function (options) {
    this.setData({
      id:options.id,
      name: options.name,
      des: options.des,
      avatar: options.avatar,
      title:options.title
    })
    wx.request({
      url: http_url + this.data.id,
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          this.setData({
            listData: res.data.return,
            total:res.data.total,
            page: 1
          });
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

  /**
* 用户点击右上角分享（index.js）
*/
  onShareAppMessage: function (ops) {


  }

})