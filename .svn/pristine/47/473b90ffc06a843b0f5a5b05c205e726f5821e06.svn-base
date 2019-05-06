// pages/tms/elecLockOperLog/elecLockOperLog.js
var util = require('../../../utils/util.js')
const app = getApp();
const MSG=require('../../../utils/message.js');
var that;
var arr_old;
var array_vals;
var searchPageNum;
var callbackcount;
var operTypeArrays = [{
  otype: '0',
  oname: "[平台]离线报警"
}, {
  otype: '1',
    oname: "[平台]超速报警"
}, {
  otype: "2",
    oname: '[平台]停车超时报警'
}, {
  otype: "3",
    oname: '[平台]偏航报警'
}, {
  otype: "4",
    oname: '[平台]温度报警'
}, {
  otype: "5",
    oname: '[平台]湿度报警'
}, {
  otype: "6",
    oname: '[平台]光感报警'
}, {
  otype: "7",
    oname: '[平台]震动报警'
}, {
  otype: "8",
    oname: '[平台]长时间行驶报警'
  }, {
    otype: "8",
    oname: '[平台]长时间行驶报警'
  }, {
    otype: "9",
    oname: '[平台]夜间车辆行驶报警'
  }, {
    otype: "10",
    oname: '[平台]夜间高速行驶报警'
  }, {
    otype: "30",
    oname: '[平台]低电量报警'
  }, {
    otype: "65",
    oname: '[平台]异常轨迹点报警'
  }, {
    otype: "100",
    oname: '[终端]紧急报警'
  }, {
    otype: "103",
    oname: '[终端]胎压告警'
  },
   {
  otype: "104",
     oname: '[终端]GNSS模块发生故障'
  }, {
  otype: "105",
     oname: '[终端]GNSS天线未接或被剪断'
  }, {
  otype: "106",
     oname: '[终端]GNSS天线短路'
  }, {
  otype: "109",
     oname: '[终端]锁杆剪断报警'
  }, {
  otype: "110",
     oname: '[终端]打开报警'
  }, {
  otype: "111",
     oname: '[终端]应急开锁报警'
  }, {
    otype: "112",
     oname: '[终端]拆除报警'
  }];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    operTypeArrays: "",
    operArraysIndex: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var startDate = new Date();
    var endDate = new Date();
    startDate = util.formatDate(startDate);
    endDate = util.formatDate(endDate);
 
    this.setData({
      operTypeArrays: operTypeArrays,
      operArraysIndex: 0,
      deviceCode: '',
      startDate: startDate,
      endDate: endDate,
      forecast: [],
      isFromSearch: true, // 用于判断数组是不是空数组，默认true，空的数组
      searchPageNum: 1, // 设置加载的第几次，默认是第一次  
      callbackcount: 15, //返回数据的个数  
      searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
      searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
    })
  },


  bindStartChange: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  bindEndChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindOperTypeChange: function(e) {

    var obj = operTypeArrays[e.detail.value]
    this.setData({
      operArraysIndex: obj.otype
    })
  },
  //滚动到底部触发事件  
  searchScrollLower: function() {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1  
        isFromSearch: false //触发到上拉事件，把isFromSearch设为为false  
      });
      that.fetchSearchList("N");
    }
  },
  //搜索请求
  scan_code: function() {
    var that = this;
    var deviceCode = that.data.deviceCode;
    if (deviceCode == undefined) {
      deviceCode = "";
    }

    that.setData({
      searchPageNum: 1, //第一次加载，设置1  
      forecast: [], //放置返回数据的数组,设为空  
      isFromSearch: true, //第一次加载，设置true  
      searchLoading: false, //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏  
    })
    that.fetchSearchList("N");
  },
  ////搜索
  jumpToMyPage_sousuo: function() {

    this.scan_code();
  },
  //查询列表
  fetchSearchList: function(types) {
    let that = this;
    let deviceCode = that.data.deviceCode; //输入框字符串单号作为参数  
    searchPageNum = that.data.searchPageNum; //把第几次加载次数作为参数  currentPage
    callbackcount = that.data.callbackcount; //返回数据的个数  pagesize
    let operArraysIndex = that.data.operArraysIndex;
    let key =  wx.getStorageSync('appkey');
    if(!key){
      MSG.showToast("登录过期")
      return
    }
    wx.request({
      url: app.getBaseUrl() + 'alarm/wechat/alarm/BdsAlarmQuery',
      method: "GET",
      data: {
        deviceCode: deviceCode,
        alarmType: operArraysIndex,
        pageNow: searchPageNum,
        pageSize: callbackcount,
        key: key
      },
      success: function(res) {
        
        if (res.data) {
          if (res.data.msg.indexOf('key') != -1) {
            MSG.sessionExpire();
            wx.removeStorageSync("userinfo");
            wx.removeStorageSync("appkey");
            wx.removeStorageSync("login");
            wx.removeStorageSync("openid");
            wx.setStorageSync("login", "false");
            return;
          }

          var isSuccess = res.data.success;
          var s_obj = res.data.object;

          if (isSuccess && isSuccess ===false) {
            that.setData({
              deviceCode: '',
              isFromSearch: true, //第一次加载，设置true  
              searchLoading: false, //把"上拉加载"的变量设为true，显示  
              searchLoadingComplete: false //把“没有数据”设为false，隐藏
            });
           MSG.showToast("无数据")

            return;
          }
          if (isSuccess ===true) {
            //如果返回了数据
            if (s_obj&&s_obj.length >= 0) {
              let searchList = [];
              
              that.data.isFromSearch ? searchList = s_obj : searchList = that.data.forecast.concat(s_obj);
              if (s_obj.length < that.data.callbackcount) {
                that.setData({
                  deviceCode: '',
                  forecast: searchList, //获取数据数组  
                  searchLoadingComplete: true, //把“没有数据”设为true，显示 
                  searchLoading: false
                });
              } else {
                that.setData({
                  deviceCode: that.data.deviceCode, //设备号
                  forecast: searchList, //获取数据数组  
                  searchLoading: true //把"上拉加载"的变量设为false，显示  
                });
              }
            } else {
              that.setData({
                deviceCode: that.data.deviceCode, //设备号
                searchLoading: false, //把"上拉加载"的变量设为false，显示  
                searchLoadingComplete: true
              });
             MSG.showToast("无数据")
              return
            }
          }
        }else{
          MSG.showToast("无数据")
        }
      },
      fail: function(err) {
        MSG.showToast("网络异常")
      }

    });
  },

  userNameInput: function(e) {
    this.setData({
      deviceCode: e.detail.value
    });
  },


})