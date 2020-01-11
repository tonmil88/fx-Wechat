var app = getApp(); //获取app
var http_urldh = app.globalData.http_api + "&param=action=table table=1_wenda_tab order=displayorder_asc";
var http_urlwd = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=wenda page=1 pagesize=10";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    listDatadh: [],//标签
    listDatawd: [],//问答
  },
  tab:function(e){
    console.log(e)
    var content = e
  },
  showInput: function() {
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

    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    console.log(this.data.inputShowed)
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})