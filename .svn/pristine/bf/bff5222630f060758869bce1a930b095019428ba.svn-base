// pages/tms/dealWarn/deviceParam/deviceParam.js
const app = getApp();
const MSG = require('../../../../utils/message.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceId:'',
    m_index:1,
    resData_process: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.deviceId);
    if (options.deviceId){
      this.setData({
        deviceId: options.deviceId
      })
    }

    // if (options.data_alarm != undefined && options.data_process != undefined) {
      this.setData({
        //选项
        resData_process: ['自动模式', '定时模式', '批量模式'],
        m_index: 0,
        modeTitle1: '运动上报间隔',
        modeTitle2: '静止上报间隔',
    
      })
    // }
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  setDeivceParam:function(){
  
      let that = this;
      var params = [];
      var values = {};
      var m_index = that.data.m_index;
      let userinfo = wx.getStorageSync("userinfo");
      if (m_index == 0) {
        //自动values
        //  自动模式 { 61454: "1", 61455: "2", 61463: 0 }
        values[61463] = 0;
        values[61454] = that.data.upload_time1;
        values[61455] = that.data.upload_time2;
        //  定时模式 { 61454: "1", 61463: 1 }

      } else if (m_index == 1) {
        //定时模式
        values[61463] = 1;
        values[61454] = that.data.upload_time1;
      } else {
        //批量模式 61454: "1", 61455: "2", 61463: 2 }
        values[61463] = 2;
        values[61454] = that.data.upload_time1;
        values[61455] = that.data.upload_time2;
      }
      var deviceCd = that.data.deviceId;
      for (var i in values) {
        let paramObj = {};
        paramObj.devCode = deviceCd;
        paramObj.messageType = 33027;
        paramObj.cmdType = i;
        paramObj.data = values[i] + "";
        paramObj.creator = userinfo.code;


        params = params.concat(paramObj);

      }
      //已选择才会发请求
      if (that.data.resData_process[that.data.m_index]) {
        wx.request({
          url: app.getBaseUrl() + 'base/service/SendCommand_SetDevicePara',
          method: "POST",
          //header: {'access_token': app.getToken()},
          data: {
            list: params
          },
          success: res => {
            console.log(res);
            if (res.data.isSuccess == 'Y') {
              if (res.data.data) {
                MSG.showToast('提交处理成功');
                setTimeout(function () {
                  wx.navigateBack()
                }, 2000)
              } else {
                 MSG.showToast('提交失败');
              }
            } else {
              MSG.showToast('提交失败');
            }
          }
        })
      }
    
  },
  /**
   * 工作模式设置
   */
  bindPickerChange: function (e) {
    this.setData({
      m_index: e.detail.value
    })
    let idx = e.detail.value;
    if (idx == 0) {
      //自动模式
      this.setData({
        modeTitle1: '运动上报间隔',
        modeTitle2: '静止上报间隔',
      });
    } else if (idx == 1) {
      //定时模式
      this.setData({
        modeTitle1: '定时上报间隔',
        modeTitle2: ''
      });
    } else {
      //批量模式
      this.setData({
        modeTitle1: '采集间隔',
        modeTitle2: '上报间隔'
      });
    }
  }
})