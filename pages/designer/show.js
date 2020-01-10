var WxParse = require('../../wxParse/wxParse.js');

var app = getApp();

var http_url = app.globalData.http_api + "&function=dr_sjs_list&param=list action=space groupid=5  more=2 uid=";
var anli_url = app.globalData.http_api + "&function=dr_my_list2&param=list action=module module=anli field=id,title,price,area,style,stylist,thumb page=1 pagesize=3";

var member_url = app.globalData.member_api;
 

Page({
  data:{
      uid:'',
      udata:'',
      supports: 0,
      listData: [],
      hidden: true,
      page: 1,
      hasMore: "false",
      upsImg:"../../icons/ups.png",
      collectImg:"../../icons/collect.png",
      shareImg: "../../icons/share.png",
  },
  onLoad:function(options){
      app.showModel();
      var self=this;
      wx.request({
        url: http_url + options.uid,
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        method: 'GET',
        success: function (res) {
          
          if (res.data.code == 1) {
            
            for (var i in res.data.return) {//不使用过滤
              var c = res.data.return[i];
            }

            // 格式化文章内容
            var article = c.udata;

            WxParse.wxParse('data', 'html', article, self);

            self.setData({
              udata: c,
              uid: options.uid
            })
            wx.hideToast();
          } else {
            wx.showModal({
              showCancel: false,
              udata: res.data.msg
            })
          }

        }
      }),
    wx.request({
        url: anli_url + " stylist=" + options.uid,
      method: 'GET',
      success: function (res) {
        console.log(res.data.return)
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
    this.setData({ hidden: false });
    var self = this;
    var pageid = self.data.page + 1;

    wx.request({
      url: anli_url + " stylist=" + self.data.uid + "&page=" + pageid,
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
              listData: res.data.return,
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
  /**
* 用户点击右上角分享（index.js）
*/
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target);
    }
    return {
      title: this.data.udata.zsname + "_" + this.data.udata.sjscc_name ,
      path: '../designer/show?uid=' + this.data.udata.uid,  // 路径，传递参数到指定页面。
      imageUrl: this.data.udata.thumb, // 分享的封面图
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