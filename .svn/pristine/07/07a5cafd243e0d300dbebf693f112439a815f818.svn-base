const app = getApp();
const MSG = require('../../../utils/message.js');
Page({
  data: {
    tab_select: 0,
    tab_width: '',
    tab_name: [],
    content_alarm: [],
    content_process: [],
    pageNo: 1,
    officeCode: "",
    inputVal:""
  },
  onLoad: function () {
    let that = this;
    that.setData({
      inputVal:""
    })
    that.getAlarmData(1, false, that);

  },
  onShow: function () {
    //加载顶部菜单
    this.onLoad();
  },
  //获取报警数据
  getAlarmData: (pageNo, isPut, that,deviceCode) => {
     MSG.showLoading('加载中');
    let key = wx.getStorageSync('appkey');
    if(key==undefined){
      MSG.sessionExpire();
      return;
    }
    let dcode = "";
    if (deviceCode){
      dcode = deviceCode;
    }
    wx.request({
      url: app.getBaseUrl() + 'gps/wechat/gps/queryDeviceForApp',
      method: "GET",
      data: {
        currentPage: pageNo,
        pageSize: 10,
        deviceCode: dcode,//20190117001,
        key:key
      },
      success: res => {
         if (res.data.msg.indexOf('key')!=-1){
          MSG.sessionExpire();
          return;
        }
        if (res.data.success === true) {
          MSG.hideLoading();
          //是否再原有的Array添加数据
          if (isPut) {
            if (res.data.object.length && res.data.object.length > 0) {
              let temp_arr_alarm = that.data.content_alarm.concat(res.data.object);
              temp_arr_process.push(res.data.data.data.data.process);
              that.setData({
                content_alarm: temp_arr_alarm,
             
              })
            } else {
             
              MSG.showToast('到底了');
              let lastPageNo = pageNo - 1
              that.setData({
                pageNo: lastPageNo
              })
              return
            }
          } else {
            if (!res.data.object || res.data.object.length == 0) {
             
              var backTimeer = setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
            that.setData({
                content_alarm: res.data.object
            })

          }



        } else {
          MSG.showToast('无数据')
          var backTimeer = setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  //进入详细信息
  moreDetail: function (e) {
    let index = e.currentTarget.dataset.numb;
    let data_alarm = JSON.stringify(this.data.content_alarm[index]);
     wx.navigateTo({
      // url: `./dealWarnDetail/dealWarnDetail?data_alarm=${data_alarm}&data_process=`,
      url: `./deviceInfo/deviceInfo?data_alarm=${data_alarm}`
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    let that = this;
    wx.stopPullDownRefresh();
    wx.showNavigationBarLoading();
   
    that.setData({
      inputVal: ""
    })
    that.getAlarmData(1, false, that);
    wx.hideNavigationBarLoading()
  },
  //下滑加载
  onReachBottom: function () {
    console.log("addfresh");
    let that = this
    let newPageNo = this.data.pageNo + 1;
    console.log(newPageNo);
    this.setData({
      pageNo: newPageNo
    })
    wx.showNavigationBarLoading();
    this.getAlarmData( newPageNo, true, that)
    wx.hideNavigationBarLoading()
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    // getList(this);
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    // getList(this);
   
  },
  inputTyping: function (e) {
    //搜索数据
    // getList(this, e.detail.value);
   this.getAlarmData(0, false, this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  }

})