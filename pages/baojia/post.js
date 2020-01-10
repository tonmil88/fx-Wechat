var app = getApp();

var post_url = app.globalData.mobile_api +"&param=function&name=dr_yuyue_form";


var member = wx.getStorageSync('member');


Page({
  data: {
    postData: {
      area: "",
      name: "",
      tel: "",
    },
    select: false,
    grade_name: '--请选择--',
    grades: ['新房', '二手房',]
  },
   formSubmit:function(e){
        console.log(e.detail.value)
        
        this.setData({postData:e.detail.value});

        var self = this;

        // var postParams = "is_ajax=1"
        //   + "&data[area]=" + e.detail.value.area
        //   + "&data[name]=" + e.detail.value.name
        //   + "&data[tel]=" + e.detail.value.tel

        wx.request({
          url: post_url,
          data: e.detail.value,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          success: function (res) {
            console.log(res.data);
            if (res.data.code) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success'
              })
            }
            else {
              wx.showModal({
                showCancel: false,
                content: res.data.msg
              })
            }
          }

        })
    },


    add: function () {

        
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name: name,
      select: false
    })
  },

})