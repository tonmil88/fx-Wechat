var app = getApp(); //获取app
var member = wx.getStorageSync('member');

var http_urlwz = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=news page=1 pagesize=10";
var http_urlwd = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=wenda page=1 pagesize=10";
var http_url1 = app.globalData.mobile_api + "&param=function&name=dr_my_favorite&p1=anli&p2=" + member.uid + "&p3=10"; //案例
Page({
  data: {
    listDatawz: [],
    listDatawd: [],
    listAnli: [],
    page: 1,
    hidden: true,
    hasMore: "false",
    flag: false,
    navData: [{
        text: '案例'
      },
      {
        text: '视频'
      },
      {
        text: '文章'
      },
      {
        text: '日记'
      },
      {
        text: '问答'
      },
      {
        text: '专题'
      },
    ],
    currentTab: 0,
  },
  showLoad: function(e) {
    console.log(e)
  },
  //事件处理函数
  onLoad: function(options) {
    var self = this;
    wx.showLoading({
      title: '正在加载中',
    })
    // 案例
    wx.request({
      url: http_url1,
      method: 'GET',
      success: function(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          self.setData({
            listAnli: res.data.result,
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
    // 视频
    // 文章
    wx.request({
      url: http_urlwz,
      method: 'GET',
      success: function(res) {
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

    // 日记
    // 问答
    wx.request({
      url: http_urlwd,
      method: 'GET',
      success: function(res) {
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
    // 专题

  },
  onReachBottom: function() {
    wx.showLoading({
      title: '正在玩命加载中',
    })
    this.setData({
      hidden: false
    });
    var self = this;
    var pageid = self.data.page + 1;
    // 文章
    var oldDatawz = this.data.listDatawz;
    wx.request({
      url: http_urlwz + "&page=" + pageid,
      method: 'GET',
      success: function(res) {

        wx.hideLoading();
        if (res.data.code == 1) {
          if (res.data.return.length == 0) {
            self.setData({
              hasMore: "true",
              hidden: false
            });
            setTimeout(function() {
              self.setData({
                hasMore: "false",
                hidden: true
              });
            }, 900)
          } else {
            self.setData({
              listDatawz: oldDatawz.concat(res.data.return),
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
      success: function(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          if (res.data.return.length == 0) {
            self.setData({
              hasMore: "true",
              hidden: false
            });
            setTimeout(function() {
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
  xiala: function() {
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