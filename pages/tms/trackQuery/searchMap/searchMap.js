// example/map.js
var util = require('../../../../utils/util.js');
var MSG = require('../../../../utils/message.js');
const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
var thisMon = date.getMonth();
var thisDay = date.getDate();
var thisHours = date.getHours();
var thisMinutes = date.getMinutes();
for (let i = 2017; i <= date.getFullYear() ; i++) {
  years.push(i)
}

for (let i = date.getMonth(); i <= 11; i++) {
  var k = i;
  if (0 <= i && i < 9) {
    k = "0" + (i + 1);
  } else {
    k = (i + 1);
  }
  months.push(k)
}
if (0 <= thisMon && thisMon < 9) {
  thisMon = "0" + (thisMon + 1);
} else {
  thisMon = (thisMon + 1);
}
if (0 <= thisDay && thisDay < 10) {
  thisDay = "0" + thisDay;
}

var totalDay = mGetDate(date.getFullYear(), thisMon);
for (let i = 1; i <= 31; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  days.push(k)
}

for (let i = 0; i <= 23; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  hours.push(k)
}
for (let i = 0; i <= 59; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  minutes.push(k)
}
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls:[],
    markers:[],
    markerdata:[],
    polyline:[],
    platNo:'',
    custom:false,
    thrday:false,
    twoday:false,
    today:true,//默认选择当天的
    endDate:'',
    startDate:'',
    is_custome:false,
    //---时间控件参数
    flag: true,
    flagEnd:true,
    years: years,
    year: date.getFullYear(),
    yeare: date.getFullYear(),
    months: months,
    month: thisMon,
    monthe: thisMon,
    days: days,
    day: thisDay,
    daye: thisDay,
    beginValue: [years.length - 1, thisMon, thisDay - 1, 0, 0],
    value: [years.length -1, thisMon, thisDay, 0, 0],
    hours: hours,
    hour: thisHours,
    houre: thisHours,
    minutes: minutes,
    minute: thisMinutes,
    minutee: thisMinutes,
  },
  getTime: function (e) {
    var times = this.data.year + "-" + this.data.month + "-" + this.data.day + " " + this.data.hour + ":" + this.data.minute;
    
    this.setData({
      flag: true,
      startDate: times
    });
  },
  getTimeEnd:function(e){
    var times = this.data.yeare + "-" + this.data.monthe + "-" + this.data.daye + " " + this.data.houre + ":" + this.data.minutee;
    console.log(times);
    this.setData({
      flagEnd: true,
      endDate: times
    });
  },
 
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          systemHeight:res.screenHeight
        })
      },
    })
    
    if (options.platNo){
      that.setData({
        platNo: options.platNo
      })
    }
  },
  checkOne:function(e){
    let that = this;
    let ck = e.detail.value;
    if(ck==true){
      that.setData({
        custom: false,
        thrday: false,
        twoday: false,
        today: true,//默认选择当天的
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择时间范围',
      })
      that.setData({
        custom: false,
        thrday: false,
        twoday: false,
        today: true,//默认选择当天的
      })
      return;
    }
  },
  checkTwo:function(e){
    let that = this;
    let ck = e.detail.value;
    if (ck == true) {
      that.setData({
        custom: false,
        thrday: false,
        today: false,
        twoday: true,
       //默认选择当天的
      })
    } else {
      e.detail.value = true;
      that.checkOne(e);
    }
  },
  checkThr: function (e) {
    let that = this;
    let ck = e.detail.value;
    if (ck == true) {
      that.setData({
        thrday: true,
        custom: false,
        twoday: false,
        today: false,//默认选择当天的
      })
    } else {
      e.detail.value = true;
      that.checkOne(e);
    }
  },
  checkCus: function (e) {
    let that = this;
    let ck = e.detail.value;
    if (ck == true) {
      that.setData({
        custom: true,
        thrday: false,
        twoday: false,
        today: false,//默认选择当天的
      })
    }else{
      e.detail.value = true;
      that.checkOne(e);
    }
  },
 
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]],
    })
     var totalDay = mGetDate(this.data.year, this.data.month);
    var changeDate = [];
    for (let i = 1; i <= totalDay; i++) {
      var k = i;
      if (0 <= i && i < 10) {
        k = "0" + i
      }
      changeDate.push(k)
    }
    this.setData({
      days: changeDate
    })
  },
  bindChangeEnd: function (e) {
    const val = e.detail.value
    this.setData({
      yeare: this.data.years[val[0]],
      monthe: this.data.months[val[1]],
      daye: this.data.days[val[2]],
      houre: this.data.hours[val[3]],
      minutee: this.data.minutes[val[4]],
    })
   
    var totalDay = mGetDate(this.data.yeare, this.data.monthe);
    var changeDate = [];
    for (let i = 1; i <= totalDay; i++) {
      var k = i;
      if (0 <= i && i < 10) {
        k = "0" + i
      }
      changeDate.push(k)
    }
    this.setData({
      dayse: changeDate
    })
  },
  checkViewStart: function (e) {
    let flg = this.data.flag;
    this.setData({
      flag: !flg,
    })

  },
  checkViewEnd: function (e) {
    let flg = this.data.flagEnd;
    this.setData({
      flagEnd: !flg,
    })

  },
  carNoInput:function(e){
    let txt = e.detail.value;
    if(txt){
      this.setData({
        platNo:txt
      })
    }
  },
  ensureParam:function(e){
    //1.车牌号，设备号
    //2.时间
    let platNo = this.data.platNo;
    if (!platNo){
       MSG.showModal('设备号为必填项');
      return;
    }else{
      //导航至trackPage
      let thrday = this.data.thrday;
      let twoday = this.data.twoday;
      let today = this.data.today;
      var currentDay = new Date();

      let startDate = "";
      let endDate = "";
      
      if(today==true){
       //今天
      
        wx.navigateTo({
          url: '../webmap/webmap?deviceno=' + platNo + '&duration=today'
        })
      }else if(twoday==true){
            //昨天
        wx.navigateTo({
          url: '../webmap/webmap?deviceno=' + platNo + '&duration=yesterday' 
        })
      }else if(thrday==true){
        //三天内
        var start = util.formatTime(new Date(currentDay.getTime() - 72 * 60 * 60 * 1000));
        var end = util.formatTime(currentDay);
        wx.navigateTo({
          url: '../webmap/webmap?deviceno' + platNo + '&duration=inthreedays'  
        })
      }else{
        // 自定义
        let start = this.data.startDate;
        let end = this.data.endDate;
        wx.navigateTo({
          url: '../webmap/webmap?deviceno=' + platNo + '&starttime=' + start + '&endtime=' + end+"&duration="+"custom"
        })
      }
    }
 
  }
})