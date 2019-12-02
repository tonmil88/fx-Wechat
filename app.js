
var md5 = require("utils/md5.js");

var member = wx.getStorageSync('member');

// 网站域名
var poscms_domain = "http://e-homes.com.cn";
// 网站密钥
var poscms_sys_key = "49CBBCDBE234930362B7";
// 移动端api密钥
var poscms_api_key = "ZDCYNJQWZWZMMWIZZMU0ZJE3OGYWNMZHNDHLNJY4NZBMNTRIMMI4NDHJNTM0OTJI";

App({
 
  showModel:function(){
     wx.showToast({
      title: '正在加载....',
      icon: 'loading',
      duration: 5000
    });
  },

  globalData: {
    data: {},
    // 通用查询接口
    http_api: poscms_domain + "/index.php?c=api&m=data2&auth=" + md5.hex_md5(poscms_sys_key),
    // 移动端接口
    mobile_api: poscms_domain+"/index.php?c=api&m=data2&auth=" + md5.hex_md5(poscms_api_key),
    // 登录认证接口
    member_api: poscms_domain+"/index.php?auth_code=" + md5.hex_md5(poscms_api_key) + "&auth_uid=" + member.uid + "&auth_password=" + md5.hex_md5(member.username + member.salt),
  }
})