
var QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
var timer;
var speed=1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var p = {
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    };
    let polyline = that.data.polyline;
     polyline.push(p);
     setInterval(function(){
       var p  = polyline[0];
       p.latitude = p.latitude+0.1;
      
       that.setData({
         polyline: polyline
       })
       console.log(1);
     },100);
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