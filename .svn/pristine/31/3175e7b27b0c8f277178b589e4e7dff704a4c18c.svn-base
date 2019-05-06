const MSG = require('../../../../utils/message.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deviceId:'',
    deviceCode:'',
    gpsTime:'',
    location:'',
    speed:'',
    direction:'',
    status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.data_alarm){
      let dataobj = JSON.parse(options.data_alarm);
      let deviceCode = dataobj.deviceCode;
      let gpsTime = dataobj.gpsTime;
      let location = dataobj.location;
      let speed = dataobj.speed;
      let direction = dataobj.direction;
      let status = dataobj.status;
      that.setData({
        deviceId: deviceCode,
        deviceCode: deviceCode,
        location: location,
        gpsTime: gpsTime,
        speed: speed+"km/h",
        status: status,
        direction: direction,
        location: location

      })
    }
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
  setDeivceParam:function(){
    let deviceId = this.data.deviceId;
    wx.navigateTo({
      url: '../deviceParam/deviceParam?deviceId=' + deviceId,
    })
  }
 
})