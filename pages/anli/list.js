var app = getApp(); //获取app

var http_url = app.globalData.http_api + "&function=dr_my_list2&param=list action=module module=anli page=1 pagesize=10";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    hidden: true,
    page: 1,
    hasMore: "false",
    flag: false,
    lx: "",
    hx: "",
    mj: "",
    ys: "",
    fg: "",
    shuaixuan: "",
    leixing: [
      { value: "", name: "不限" },
      { value: "家装", name: "家装" },
      { value: "公装", name: "公装" },
      { value: "别墅", name: "别墅" },
      { value: "店铺", name: "店铺" },
    ],
    huxing: [
      { value: "", name: "不限" },
      { value: "一居室", name: "一居室" },
      { value: "二居室", name: "二居室" },
      { value: "三居室", name: "三居室" },
      { value: "四居室", name: "四居室" },
    ],
    mianji: [
      { value: "", name: "不限" },
      { value: "0,60", name: "60m²以下" },
      { value: "60,80", name: "60-80㎡" },
      { value: "80,100", name: "80-100㎡" },
      { value: "100,120", name: "100-120㎡" },
      { value: "120,180", name: "120-180㎡" },
      { value: "180,0", name: "180㎡以上" },
    ],
    yusuan: [
      { value: "", name: "不限" },
      { value: "0,5", name: "5万以下" },
      { value: "5,8", name: "5-8万" },
      { value: "8,15", name: "8-15万" },
      { value: "15,0", name: "15万以上" },
    ],
    fengge: [
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
    ]
  },
  radioChange_leixing: function (e) {
    this.setData({
      lx: e.detail.value
    })
    console.log('装修类型为：', e.detail.value);
  },
  radioChange_huxing: function (e) {
    this.setData({
      hx: e.detail.value
    })
    console.log('装修户型为：', e.detail.value);
  },
  radioChange_mianji: function (e) {
    this.setData({
      mj: e.detail.value
    })
    console.log('装修面积为：', e.detail.value);
  },
  radioChange_yusuan: function (e) {
    this.setData({
      ys: e.detail.value
    })
    console.log('装修预算为：', e.detail.value);
  },
  radioChange_fengge: function (e) {
    this.setData({
      fg: e.detail.value
    })
    console.log('装修风格为：', e.detail.value);
  },
  showMenu: function () {
    var flag = this.data.flag;
    if (flag) {
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      })
    }
  },
  sure: function () {
    var shuaixuan = this.data.shuaixuan;
    if (this.data.lx){
     // shuaixuan.push(this.data.lx);
      var shuaixuan = shuaixuan + " leixing=" + this.data.lx;
    }
    if (this.data.hx) {
      var shuaixuan = shuaixuan + " huxing=" + this.data.hx;
    }
    if (this.data.mj) {
      var shuaixuan = shuaixuan + " BEWTEEN_area=" + this.data.mj;
    }
    if (this.data.ys) {
      var shuaixuan = shuaixuan + " BEWTEEN_price=" + this.data.ys;
    }
    if (this.data.fg) {
      var shuaixuan = shuaixuan + " LIKE_style=%" + this.data.fg +"%";
    }
    console.log(shuaixuan);
    this.data.flag = false;
    app.showModel();
    var self = this;
    wx.request({
      url: http_url + shuaixuan,
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          self.setData({
            listData: res.data.return,
            page: 1,
            flag: false
          });
        } else {
          console.log(res.data.msg);
          wx.showModal({
            showCancel: false,
            content: res.data.msg,
            
          })
        }
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    app.showModel();
    var self = this;
    wx.request({
      url: http_url,
      method: 'GET',
      success: function(res) {
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
  onReachBottom: function() {

    app.showModel();
    wx.showLoading({
      title: '正在玩命加载中',
    })
    this.setData({
      hidden: false
    });
    var self = this;
    var pageid = self.data.page + 1;

    wx.request({
      url: http_url + "&page=" + pageid,
      method: 'GET',
      success: function(res) {
        // console.log(res);
        wx.hideLoading();
        var oldData = self.data.listData;
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
              listData: oldData.concat(res.data.return),
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
  }

})