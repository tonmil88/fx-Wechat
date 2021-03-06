// pages/designer/designer.js
var app = getApp();
var http_url = app.globalData.http_api + "&function=dr_sjs_list&param=list action=space groupid=5  more=2 page=1 pagesize=10";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    page: 1,
    hasMore: "false",
    flag: false,
    index_dg: 0,
    index_fg: 0,
    shuaixuan:"",//筛选条件
    designerFlag:true,//显示设计师类型
    fenggeFlag: true,//显示擅长风格
    designerData:[],
    objectDesingers: [
      { value: "", name: "不限" },
      { value: "1", name: "首席设计师" },
      { value: "2", name: "金牌设计师" },
      { value: "3", name: "高级设计师" },
    ],
    objectFengge: [
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

  },
  showPicker_dg:function(){
    this.setData({
      designerFlag:false,
    })
  },

  showPicker_fg: function () {
    console.log(2332)
    this.setData({
      fenggeFlag: false
    })
  },

  bindPickerChange_dg: function (e) {
    var judge = this.data.objectDesingers[e.detail.value].value 
    var shuaixuan = " sjscc=" + this.data.objectDesingers[e.detail.value].value
    this.setData({
      index_dg: e.detail.value,
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
  bindPickerChange_fg: function (e) {
    var judge = this.data.objectFengge[e.detail.value].value
    var shuaixuan = " LIKE_sjsfg=%" + this.data.objectFengge[e.detail.value].value + "%"
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
  // bindPickerChange_ph: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index_ph: e.detail.value
  //   })
 
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showModel();
    wx.request({
      url: http_url,
      method:'GET',
      success: (res)=>{
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1){
          this.setData({
            designerData: res.data.return,
            page:1
          })
        }else{
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
    console.log(this.data.designerData)
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
    // wx.showLoading({
    //   title: '正在玩命加载中',
    // })
    this.setData({
      hidden: false
    });
    var shuaixuan = this.data.shuaixuan, pageid = this.data.page + 1, oldData = this.data.designerData, self = this
      wx.request({
        url: http_url+shuaixuan+"&page="+pageid,
        method: 'GET',
        success: (res) => {
          wx.hideLoading();
          console.log(res.data);
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
            }else{
              self.setData({
                designerData: oldData.concat(res.data.return),
                page: pageid,
                hidden: true,
              })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})