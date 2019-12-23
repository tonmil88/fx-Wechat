var app = getApp();//获取app

var http_url = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=news page=1 pagesize=10";

Page({
  data: {
    listData: [],
    hidden: true,
    page: 1,
    hasMore: "false",
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
  //事件处理函数
  onLoad: function (options) {
    app.showModel();
    var self = this;
    wx.request({
      url: http_url,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          self.setData({
            listData: res.data.return,
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
    var oldData = this.data.listData;

    wx.request({
      url: http_url + "&page=" + pageid,
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
              listData: oldData.concat(res.data.return) ,
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
    //每个tab选项宽度占1/3
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
  }
})