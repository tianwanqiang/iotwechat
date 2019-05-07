const app = getApp();
const MSG = require("../../../../utils/message.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sourceurl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const res = wx.getSystemInfoSync();
    that.setData({
      systemHeight:res.systemHeight*0.8
    })
    let base_url = app.globalData.h5;
    let deviceno = options.deviceno;
    let duration = options.duration;
    let starttime = options.starttime;
    let endtime = options.endtime;
    that.setData({
      sourceurl: encodeURI(base_url)
    })
    if (deviceno){
      base_url = base_url + "?deviceno=" + deviceno;
      if (duration === "today" || duration === "yesterday" || duration ==="inthreedays"){
        base_url +="&duration="+duration;
        that.setData({
          sourceurl:base_url
        })
      }else{
        // base_url += "&duration=" + duration;
        if(!starttime||!endtime){
          MSG.showToast('查询时间不能为空');
          wx.navigateBack({
            delta:1
          });
        }else{
          base_url += "&duration=" + duration + "&startTime=" + starttime +"&endTime="+endtime;
         
        }
      }

      setTimeout(function(){
        console.log("开始加载数据");
        that.setData({
          sourceurl: encodeURI(base_url)
        })
      },1000);
    }
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})