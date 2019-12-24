var app = getApp();//获取app

var http_urlwz = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=news page=1 pagesize=10";
var http_urlwd = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=wenda page=1 pagesize=10";
Page({
  data: {
    listDatawz: [],
    listDatawd: [],
    page: 1,
    hidden: true,
    hasMore: "false",
    flag:false,
    navData: [
      {
        text: '文章'
      },
      {
        text: '视频'
      },
      {
        text: '问答'
      },
    ],
    currentTab: 0,
  },
  showLoad:function(e){
    console.log(e)
  },
  //事件处理函数
  onLoad: function (options) {
    app.showModel();
    var self = this;
    // 文章
    wx.request({
      url: http_urlwz,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          self.setData({
            listDatawz: res.data.return,
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
    // 问答
    wx.request({
      url: http_urlwd,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.return);
        if (res.data.code == 1) {
          self.setData({
            listDatawd: res.data.return,
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
  onReachBottom: function () {
    wx.showLoading({
      title: '正在玩命加载中',
    })
    this.setData({ hidden: false });
    var self = this;
    var pageid = self.data.page + 1;
    // 文章
    var oldDatawz = this.data.listDatawz;
    wx.request({
      url: http_urlwz + "&page=" + pageid,
      method: 'GET',
      success: function (res) {

        wx.hideLoading();
        if (res.data.code == 1) {
          if (res.data.return.length == 0) {
            self.setData({
              hasMore: "true",
              hidden: false
            });
            setTimeout(function () {
              self.setData({
                hasMore: "false",
                hidden: true
              });
            }, 900)
          } else {
            self.setData({
              listDatawz: oldDatawz.concat(res.data.return) ,
              hidden: true,
              page: pageid
            });
          }
        } else {
          console.log(res.data.msg);
          wx.showModal({
            showCancel: false,
            content: res.data.msg
          })
        }

      }
    })
    // 问答
    var oldDatawd = this.data.listDatawd;
    wx.request({
      url: http_urlwd + "&page=" + pageid,
      method: 'GET',
      success: function (res) {
        console.log(12)
        wx.hideLoading();
        if (res.data.code == 1) {
          if (res.data.return.length == 0) {
            self.setData({
              hasMore: "true",
              hidden: false
            });
            setTimeout(function () {
              self.setData({
                hasMore: "false",
                hidden: true
              });
            }, 900)
          } else {
            self.setData({
              listDatawd: oldDatawd.concat(res.data.return),
              hidden: true,
              page: pageid
            });
          }
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
  xiala:function(){
    this.onReachBottom()
  },
  switchNav(e) {
    console.log(e);
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(e) {
    var cur = e.detail.current;
    this.setData({
      currentTab: cur,
    });
  },

})