var WxParse = require('../../wxParse/wxParse.js');

var app = getApp();
var member = wx.getStorageSync('member');
var http_url = app.globalData.http_api + "&function=dr_my_list&param=list action=content module=activity id=";
var post_url = app.globalData.mobile_api +"&param=function&name=dr_baoming_form&p1=enroll&p2=";
var member_url = app.globalData.member_api;

console.log(member);

Page({
  data:{
      id:'',
      content:'',
      supports: 0,
      upsImg:"../../icons/ups.png",
      collectImg:"../../icons/collect.png",
      shareImg: "../../icons/share.png",
      formbox:true
  },    
  onLoad:function(options){
     
      app.showModel();
      var self=this;
      wx.request({
        url: http_url + options.id,
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
            var article = c.content;

            WxParse.wxParse('data', 'html', article, self);

            self.setData({
              content: c,
              id: options.id
            })
            wx.hideToast();
          } else {
            wx.showModal({
              showCancel: false,
              content: res.data.msg
            })
          }

        }
      })
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    this.setData({postData:e.detail.value});
    var self = this;
    var postParams =  
      "&data[name]=" + e.detail.value.name
      + "&data[tel]=" + e.detail.value.tel
      + "&data[uid]=" + member.uid
    if(!e.detail.value.tel){
      wx.showModal({
        showCancel: false,
        content: '请输入手机号'
      })
    }else{
      wx.request({
        url: post_url +this.data.id+postParams,
        header: {
          'Content-Type': 'application/json',
        },
        dataType: 'json',
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          if (res.data.result) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success'
            })
          }else{
            wx.showModal({
              showCancel: false,
              content: '您已报名参与'
            })
            //console.log(res.data.result);
          } 
        }
      })
    }  
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
      title: this.data.content.title,
      path: '../news/show?id=' + this.data.content.id,  // 路径，传递参数到指定页面。
      imageUrl: this.data.content.thumb, // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  // 点击事件
  baoming: function (e) {
    this.setData({
      formbox:false
    })
  },
  // 点击事件
  baoming_close: function (e) {
    this.setData({
      formbox:true
    })
  },
})