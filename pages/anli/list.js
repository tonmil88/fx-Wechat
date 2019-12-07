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
    kw: "",
    m_lx: "",
    m_hx: "",
    m_mj: "",
    m_ys: "",
    m_fg: "",
    m_kw: "",
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
    var items = this.data.leixing;
    for (let i = 0, len = items.length; i < len; ++i) {
      if(items[i].value === e.detail.value){
        var m_lx = items[i].name;
      }
    }
    this.setData({
      lx: e.detail.value,
      m_lx: m_lx,
    })
    console.log('装修类型为：', e.detail.value);
  },
  radioChange_huxing: function (e) {
    var items = this.data.huxing;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value === e.detail.value) {
        var m_hx = items[i].name;
      }
    }
    this.setData({
      hx: e.detail.value,
      m_hx: m_hx
    })
    console.log('装修户型为：', e.detail.value);
  },
  radioChange_mianji: function (e) {
    var items = this.data.mianji;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value === e.detail.value) {
        var m_mj = items[i].name;
      }
    }
    this.setData({
      mj: e.detail.value,
      m_mj: m_mj
    })
    console.log('装修面积为：', e.detail.value);
  },
  radioChange_yusuan: function (e) {
    var items = this.data.yusuan;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value === e.detail.value) {
        var m_ys = items[i].name;
      }
    }
    this.setData({
      ys: e.detail.value,
      m_ys: m_ys
    })
    console.log('装修预算为：', e.detail.value);
  },
  radioChange_fengge: function (e) {
    var items = this.data.fengge;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value === e.detail.value) {
        var m_fg = items[i].name;
      }
    }
    this.setData({
      fg: e.detail.value,
      m_fg: m_fg
    })
    console.log('装修风格为：', e.detail.value);
  },
  radioChange_keyword: function (e) {
    this.setData({
      kw: e.detail.value,
      m_kw: e.detail.value//kw
    })
    console.log('关键词为：', e.detail.value);
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
    var m_lx = "";
    var m_hx = "";
    var m_mj = "";
    var m_ys = "";
    var m_fg = "";
    var m_kw = "";
    if (this.data.lx){
     // shuaixuan.push(this.data.lx);
      var shuaixuan = shuaixuan + " leixing=" + this.data.lx;
      var m_lx = this.data.m_lx + "，";
    }
    if (this.data.hx) {
      var shuaixuan = shuaixuan + " huxing=" + this.data.hx;
      var m_hx = this.data.m_hx + "，";
    }
    if (this.data.mj) {
      var shuaixuan = shuaixuan + " BEWTEEN_area=" + this.data.mj;
      var m_mj = this.data.m_mj + "，";
    }
    if (this.data.ys) {
      var shuaixuan = shuaixuan + " BEWTEEN_price=" + this.data.ys;
      var m_ys = this.data.m_ys + "，";
    }
    if (this.data.fg) {
      var shuaixuan = shuaixuan + " LIKE_style=%" + this.data.fg + "%";
      var m_fg = this.data.m_fg + "，";
    }
    if (this.data.kw) {
      var shuaixuan = shuaixuan + " LIKE_title=%" + this.data.kw + "%";
      var m_kw = "["+this.data.m_kw + "]，";
    }
    console.log(shuaixuan);
    this.data.flag = false;
    app.showModel();
    var self = this;
    self.setData({
      shuaixuan: m_lx + m_hx + m_mj + m_ys + m_fg + m_kw,
    });
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
    var shuaixuan = this.data.shuaixuan;

    wx.request({
      url: http_url + shuaixuan + "&page=" + pageid,
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