var app = getApp(); //获取app

var http_url = app.globalData.http_api + "&function=dr_my_list&param=list action=module module=activity page=1 pagesize=10";
var region_url = app.globalData.http_api + "&function=dr_linkage_array&param=list action=linkage code=address";
var type_url = app.globalData.mobile_api + "&function=dr_hanshu&param=function&name=dr_field_options_id&p1=332";

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
    md: "",
    lx: "",
    m_md: "",
    m_lx: "",
    sxtj: "",//筛选条件
    shuaixuan: "",
    region: [],
    leixing: []
  },
  radioChange_region: function (e) {
    var items = this.data.region;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value == e.detail.value) {
        var m_md = items[i].name;
      }
    }
    this.setData({
      md: e.detail.value,
      m_md: m_md
    })
    console.log('地区为：', e.detail.value);
  },
  radioChange_leixing: function (e) {
    var items = this.data.leixing;
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value == e.detail.value) {
        var m_lx = items[i].name;
      }
    }
    this.setData({
      lx: e.detail.value,
      m_lx: m_lx,
    })
    console.log('活动类型为：', e.detail.value);
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
    var shuaixuan = "";
    var m_md = "";
    var m_lx = "";
    if (this.data.md) {
      var shuaixuan = shuaixuan + " region=" + this.data.md;
      var m_md = this.data.m_md + "，";
    }
    if (this.data.lx) {
      var shuaixuan = shuaixuan + " LIKE_type=%" + this.data.lx + "%";
      var m_lx = this.data.m_lx + "，";
    }

    console.log(shuaixuan);
    this.data.flag = false;
    app.showModel();
    var self = this;
    self.setData({
      shuaixuan: shuaixuan,
      sxtj: m_md + m_lx,
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
          self.setData({
            listData: res.data.return,
            page: 1,
            flag: true
          });
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

  onLoad: function (options) {
    app.showModel();
    var self = this;
    wx.request({
      url: region_url,
      method: 'GET',
      success : function (res) {
        self.setData({
          region: res.data.return,
        });
      }
    })
    wx.request({
      url: type_url,
      method: 'GET',
      success: function (res) {
        self.setData({
          leixing: res.data.return,
        });
      }
    })
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
    console.log(shuaixuan);
    wx.request({
      url: http_url + shuaixuan + "&page=" + pageid,
      method: 'GET',
      success: function (res) {
        // console.log(res);
        wx.hideLoading();
        var oldData = self.data.listData;
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