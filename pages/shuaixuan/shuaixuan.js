// pages/shuaixuan/shuaixuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    lx: "",
    hx: "",
    mj: "",
    ys: "",
    fg: "",
    shuaixuan: [],
    leixing: [
      { value: "不限", name: "不限" },
      { value: "家装", name: "家装" },
      { value: "公装", name: "公装" },
      { value: "别墅", name: "别墅" },
      { value: "店铺", name: "店铺" },
    ],
    huxing: [
      { value: "不限", name: "不限" },
      { value: "一居室", name: "一居室" },
      { value: "二居室", name: "二居室" },
      { value: "三居室", name: "三居室" },
      { value: "四居室", name: "四居室" },
    ],
    mianji: [
      { value: "不限", name: "不限" },
      { value: "0,60", name: "60m²以下" },
      { value: "60,80", name: "60-80㎡" },
      { value: "80,100", name: "80-100㎡" },
      { value: "100,120", name: "100-120㎡" },
      { value: "120,180", name: "120-180㎡" },
      { value: "180,0", name: "180㎡以上" },
    ],
    yusuan: [
      { value: "不限", name: "不限" },
      { value: "0,50000", name: "5万以下" },
      { value: "50000,80000", name: "5-8万" },
      { value: "80000,150000", name: "8-15万" },
      { value: "150000,0", name: "15万以上" },
    ],
    fengge: [
      { value: "不限", name: "不限" },
      { value: "现代简约", name: "现代简约" },
      { value: "美式", name: "美式" },
      { value: "新中式", name: "新中式" },
      { value: "北欧", name: "北欧" },
      { value: "工业", name: "工业" },
      { value: "欧式", name: "欧式" },
      { value: "轻奢", name: "轻奢" },
      { value: "田园", name: "田园" },
      { value: "法式", name: "法式" },
    ]
  },
  radioChange_leixing: function (e) {
    this.setData({
      lx: e.detail.value
    })
    console.log(e.detail.value);
  },
  radioChange_huxing: function (e) {
    this.setData({
      hx: e.detail.value
    })
    console.log(e.detail.value);
  },
  radioChange_mianji: function (e) {
    this.setData({
      mj: e.detail.value
    })
    console.log(e.detail.value);
  },
  radioChange_yusuan: function (e) {
    this.setData({
      ys: e.detail.value
    })
    console.log(e.detail.value);
  },
  radioChange_fengge: function (e) {
    this.setData({
      fg: e.detail.value
    })
    console.log(e.detail.value);
  },
  sure: function () {
    var shuaixuan = this.data.shuaixuan;
    shuaixuan.push(this.data.lx);
    shuaixuan.push(this.data.hx);
    shuaixuan.push(this.data.mx);
    shuaixuan.push(this.data.yx);
    shuaixuan.push(this.data.fg);
    console.log(this.data.shuaixuan)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // showMenu:function(){
  //   var flag = this.data.flag;
  //   if(flag){
  //     this.setData({
  //       flag:false
  //     })
  //   }else{
  //     this.setData({
  //       flag:true
  //     })
  //   }
  // },
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})