var app = getApp();
var markersData = [];
Page({
  data: {
    src: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var srcStr = app.globalData.urlStr;
//成功回调
        that.setData({
          src: srcStr
        });
  },
 
  onUnload: function () {
      var that =this;
      app.globalData.urlStr="";
      that.setData({
        src:""
      });
  },
})