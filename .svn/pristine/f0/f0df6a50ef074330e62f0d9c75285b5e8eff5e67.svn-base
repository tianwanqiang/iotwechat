var app = getApp();
var UtilCommon =require('../../../../utils/util.js');
var markersData = [];
Page({
  data: {
    ys: app.getIconUrl,
    textData: {},
    currentLo : null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 17,
    polyline: null,
    statusType: 'car',
    includePoints: [],
    titles:[],
    deviceCode:'',
    plateno:'',
    speed:'',
    positioningType:'',
    status:'',
    electricity:'',
    location:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var srr_val = options.array;
    let arrs='';
    if (srr_val){
      arrs=JSON.parse(options.array);
    }else{
       arrs = options;
       arrs = JSON.parse(arrs);
    } 
    
    that.data.dev_s = arrs[0].deviceCode
    if (arrs[0].electricity == "-1"){
      arrs[0].electricity='-';
    } else if (arrs[0].electricity == "0"){
      arrs[0].electricity = arrs[0].electricity + '%'
    }else{
      var ele_val = arrs[0].electricity/10;
      arrs[0].electricity = ele_val+'%'
    }
    //	//0离线1运动2停车3休眠4关机
    if (arrs[0].status=='0'){
      arrs[0].status ='离线';
    } else if (arrs[0].status=='1'){
      arrs[0].status = '运动';
    } else if (arrs[0].status=='2'){
      arrs[0].status = '停车';
    } else if (arrs[0].status=='3'){
      arrs.status = '休眠';
    } else if (arrs.status=='4'){
      arrs[0].status = '离线';
    }
    if (arrs[0].location==undefined){
      arrs[0].location='';
    }
    
    var time_val = new Date(arrs[0].createTime).Format('yyyy-MM-dd hh:mm:ss');
    that.data.j_o_b = arrs[0];

//成功回调
        that.setData({
          currentLo: Number(arrs[0].lng),
          currentLa: Number(arrs[0].lat),
          includePoints: [{
            longitude: Number(arrs[0].lng),
            latitude: Number(arrs[0].lat)
          }],

          markers: [{
            id: 0,
            longitude: Number(arrs[0].lng),
            latitude: Number(arrs[0].lat),
            title: arrs[0].location,
            iconPath: app.getImageUrl,
            height:16,
            width:16
          }],
          deviceCode: arrs[0].deviceCode,
          // plateno: arrs[0].plateNo,
          speed: arrs[0].speed,
          status: arrs[0].status,
          positioningType:"-",
          electricity: arrs[0].electricity,
          location: arrs[0].location,
          gpsTime: time_val,
          scale: 18
        });
  },
  jumpMap:function(){
    var that=this;
    var oddNo = that.data.dev_s;
    wx.request({
      url: app.getBaseUrl() + 'service/wechat_searchDriverByOddNumber',
      method: "POST",
      data: {
        oddNo: oddNo, pageNow: 1, pageSize: 15
      },
      success: function (res) {
        var isSuccess = res.data.data.isSuccess;
        console.log(isSuccess);
        var s_obj = res.data.data.data;
        console.log(s_obj);
        if (isSuccess == 'N') {
          wx.showToast({
            title: '请稍后操作',
            icon: 'loading',
            duration: 3000
          })
          return;
        }
        if (isSuccess == 'Y') {
          if (s_obj.length !== 0 && s_obj.length != undefined) { 
            var str_s_tr = s_obj;
        var arrs_v_l = JSON.stringify(str_s_tr);
        that.data.array_vals = arrs_v_l
        that.onLoad(arrs_v_l);
          }
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常请重试',
          duration: 3000,
          icon: "loading"
        })
      }
    });  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      var that =this;
      that.setData({
        textData: {},
        currentLo: null,
        currentLa: null,
        newCurrentLo: null,
        newCurrentLa: null,
        distance: 0,
        duration: 0,
        markers: null,
        scale: 16,
        polyline: null,
        statusType: 'car',
        includePoints: [],
        titles: [],
        deviceCode: '',
        plateno: '',
        speed: '',
        positioningType: '',
        status: '',
        electricity: '',
        location: ''
      });
  },
})