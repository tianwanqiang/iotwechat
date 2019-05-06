// example/map.js
const app = getApp();
var mapCtx = {};
var util = require('../../../../utils/util.js')
const MSG = require('../../../../utils/message.js');
var date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    controls: [],
    markers: [],
    polyline: [],
    platNo: "",
    deviceH: 0,
    controls: [],
    longitude: 113.324520,
    latitude: 23.099994,
    scale: 5,
    gpsTime: '2019-04-12 15:35:02',
    speed: '0km/h',
    location: '',
    playImg: '../../../../Image/play.png',
    playIndex: 0,
    playFlag: 0,
    className: 'normalImg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    mapCtx = wx.createMapContext('trackMap', that);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceH: res.screenHeight * 0.65,
        });
      },
    });

    let platNo = options.platNo;
        if (options.duration) {
      MSG.showLoading('加载中');
      wx.request({
        url: app.getBaseUrl() + 'gps/wechat/gps/queryLushu',
        method: 'GET',
        data: { 'duration': options.duration, 'platNo': platNo, key: wx.getStorageSync('appkey'), 'start': options.start, 'end': options.end },
        success: function (res) {
          if (res.data.msg.indexOf('key') != -1) {
            MSG.sessionExpire();
            wx.clearStorageSync();
            return;
          }
          let data = res.data.object.data;
          if (res.data.success == true && data && data.length) {//结构正确并且数据正常
            var markerdata = new Array();//地图实际数据
            var startEnd = new Array();//起点和结束点
            var center = res.data.object.center;
            var scale = res.data.object.zoom;

            for (let i = 0; i < res.data.object.data.length; i++) {
              var point = res.data.object.data[i];
              let iterator = res.data.object.data[i];

              let location = iterator.location == undefined ? '位置:未解析' : iterator.location;

              let lat = iterator.lat == undefined ? "" : iterator.lat;
              let lng = iterator.lng == undefined ? "" : iterator.lng;
              let course = iterator.course == undefined ? "" : iterator.course;
              let marker = { latitude: lat, longitude: lng, course: course, speed: iterator.speed, location: location, time: iterator.time, deviceno: iterator.deviceno }; markerdata.push(marker);
            }
            let length = markerdata.length;
            let startMarker = markerdata[0];
            
            let endMarker = markerdata[length - 1];
            let startPoint = { id: 'start', latitude: startMarker.latitude, longitude: startMarker.longitude, iconPath: '/Image/start.png' };
            let endPoint = { latitude: endMarker.latitude, longitude: endMarker.longitude, iconPath: '/Image/end.png' };

            startEnd.push(startPoint);
            startEnd.push(endPoint);
            let polyline = new Array();
            polyline.push({
              points: markerdata,
              color: '#C71585',
              width: 2,
              dottedLine: false,
              arrowLine: false,
            })
            MSG.hideLoading();//关闭提示
       
            let gpsTime = new Date(parseInt(startMarker.time));
          
            that.setData({
              polyline: polyline,
              scale: scale - 2,
              longitude: center.lng,
              latitude: center.lat,
              markerdata: markerdata,
              markers: startEnd,
              gpsTime: util.formatTime(gpsTime),
              speed: startMarker.speed + 'km/h',
              platNo: startMarker.deviceno,
              location: startMarker.location
            })
            
          } else if (res.data.msg && res.data.msg.search('key') != -1) {

            MSG.hideLoading();//关闭原来提示
            MSG.sessionExpire();
          } else {
            MSG.hideLoading();//关闭原来提示
            MSG.showToast('无数据');
          }
        },
        fail: function (res) {
          MSG.hideLoading();
          MSG.showToast('网络错误');
        }
      })
    } else if (options.start && options.end) {
      wx.request({
        url: app.getBaseUrl() + 'gps/wechat/gps/queryLushu',
        method: 'GET',
        data: { 'start': start, 'platNo': platNo, 'end': end, key: wx.getStorageSync('appkey') },
        success: function (res) {
          let track = res.data.object.track;//轨迹点
        }
      })
    }
  },


  searchTab: function (e) {
    let that = this;
    if (that.data.platNo) {
      wx.navigateTo({
        url: '../searchMap/searchMap?platNo='+that.data.platNo,
      })
    }else{
      wx.navigateTo({
        url: '../searchMap/searchMap'
      })
    }
   
  },
  playTrack: function (e) {
    var that = this;
    let pointMarkers = this.data.markers;//起点和终点
    var startMarker = pointMarkers[0];
    var duration = 500;
    var scale = that.data.scale;
    var markerdata = that.data.markerdata;
    if (that.data.playFlag == 0) {
      let flag = that.playDuring(duration, that, mapCtx);

      if (!flag) {
        return;
      }
      that.setData({
        playFlag: 1
      })
    } else {
      return;
    }
  },

  playDuring: function (duration, that, mapCtx) {
    var markerdata = that.data.markerdata;//真实轨迹数据
    if (!markerdata || markerdata.length == 0) {
         MSG.showToast('无数据');
         return false;
    }
    that.setData({
      className: 'dynamic_plot'
    });
    for (let curr = 0; curr < markerdata.length; curr++) {
      var translat = {
        markerId: 'start',
        autoRotate: false,
        rotate: false,
        duration: duration,
        destination: {
          longitude: markerdata[curr].longitude,
          latitude: markerdata[curr].latitude
        },
        animationEnd: function () {
          let gpsTime = new Date(parseInt(markerdata[curr].time));
            console.log(markerdata[curr]);
            that.setData({
            longitude: markerdata[curr].longitude,
            latitude: markerdata[curr].latitude,
            speed:  markerdata[curr].speed + 'km/h',
            location:markerdata[curr].location,
            gpsTime: util.formatTime(gpsTime),
          });
        }
      };
      
      mapCtx.translateMarker(translat);

    }
    var startPoint = {
      markerId: 'start',
      autoRotate: false,
      rotate: false,
      duration: 1,
      destination: {
        longitude: markerdata[0].longitude,
        latitude: markerdata[0].latitude
      },
      success: function () {
        that.setData({
          longitude: markerdata[0].longitude,
          latitude: markerdata[0].latitude,
          // scale: scale-1,
          speed: markerdata[0].speed + 'km/h',
          location: markerdata[0].location,
          gpsTime: markerdata[0].time,
          className: 'normalImg',
          playFlag: 0
        });

      }
    };
    mapCtx.translateMarker(startPoint);
    return true;
  },
 
  makertap: function (e) {
    // console.log(this.data.scale);

  },

  playAni: function (duration) {
    var ani = wx.createAnimation({
      duration: duration
    });
    ani.rotate(30);//旋转
    return ani;

  }









})