var app = getApp();

var http_url = app.globalData.http_api + "&function=dr_my_list2&param=list action=content module=anli id=";
var member_url = app.globalData.member_api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    thumb:'',
    stylist_name:'',
    style:'',
    area:'',
    huxing:'',
    id: '',
    content: '',
    anlitu: [],
    gallery:'',
    index:'',
    collectImg: "../../icons/collect.png",
    shareImg: "../../icons/share.png",
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
      stylist_name: options.stylist_name,
      style: options.style,
      area: options.area,
      huxing: options.huxing
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

  getCommentList: function () {//评论跳转
    wx.navigateTo({
      url: '../anli/comment?id=' + this.data.content.id
    })
  },


  collect: function () {//收藏
    var self = this;
    wx.request({
      url: member_url + '&s=anli&c=api&m=favorite&id=' + self.data.id,

      data: {
        is_ajax: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'text',
      method: 'POST',
      success: function (sc) {
        console.log(sc)
        if (sc == 1) {
          wx.showModal({
            showCancel: false,
            content: "没有登录，不能收藏"
          })
        } else if (sc == 2) {
          wx.showModal({
            showCancel: false,
            content: "文档不存在，无法收藏"
          })
        } else {
          wx.showToast({
            icon: 'success',
            title: "收藏成功",
            duration: 2000
          });
        }
      }
    });
  },
  /**
* 用户点击右上角分享（index.js）
*/
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target);
    }
    return {
      title: this.data.content.title,
      path: '../anli/anli-info?id=' + this.data.content.id,  // 路径，传递参数到指定页面。
      imageUrl: this.data.content.thumb, // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})