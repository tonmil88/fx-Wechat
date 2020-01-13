var app = getApp(); //获取app
var http_urldh = app.globalData.http_api + "&param=action=table table=1_wenda_tab order=displayorder_asc";
var http_urlwd = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=wenda page=1 pagesize=10";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    page: 1,
    hasMore: "false",
    flag: false,
    inputShowed: false,
    kw: "",
    listDatadh: [],//标签
    listDatawd: [],//问答
    lx:'',
    shuaixuan:'',

  },
  radioChange_tabs: function (e) {
    var shuaixuan = ""
    this.setData({
      lx: e.detail.value
    })
    if (this.data.lx) {
      var shuaixuan = shuaixuan + " keyword=" + this.data.lx;
    }
    if (this.data.kw) {
      var shuaixuan = shuaixuan + " LIKE_title=%" + this.data.kw + "%";
    }
    wx.request({
      url: http_urlwd + shuaixuan,
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
        console.log(res.data.return);
        if (res.data.code == 1) {
          this.setData({
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
    console.log('问答类型为：', e.detail.value);
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      kw: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      kw: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      kw: e.detail.value
    });
    console.log(this.data.kw)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 问答
    wx.request({
      url: http_urlwd,
      method: 'GET',
      success: (res)=> {
        wx.hideLoading();
        console.log(res.data.return);
        if (res.data.code == 1) {
          this.setData({
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
    // 标签
    wx.request({
      url: http_urldh,
      method: 'get',
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 1) {
          this.setData({
            listDatadh: res.data.return,
          });
          console.log(this.data.listDatadh)
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
  onReachBottom: function () {
    wx.showLoading({
      title: '正在玩命加载中',
    })
    this.setData({
      hidden: false
    });
    var self = this;
    var pageid = self.data.page + 1;
    var shuaixuan = this.data.shuaixuan;
    wx.request({
      url: http_urlwd + shuaixuan + "&page=" + pageid,
      method: 'GET',
      success: function (res) {
        // console.log(res);
        wx.hideLoading();
        var oldData = self.data.listDatawd;
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
              listDatawd: oldData.concat(res.data.return),
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
    console.log(this.data.listDatawd);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})