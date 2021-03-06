var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
const MSG = require('../../../../utils/message.js');
Page({
  data: {
    tabs: ["设备号", "车牌号","组织机构"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputShowedCar: false,
    inputValCar: "",
    inputShowed: false,
    inputVal: "",
    checkboxItems: [],//设备号复选框
    checkboxItemsCar: [],//车牌号复选框
    checkboxItemsOrg:[]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    var that = this;
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
     if(e.currentTarget.id == 2){
            //如果是组织机构 则所有组织机构并初始化页面
     let userinfo = wx.getStorageSync("userinfo");
       let key = wx.getStorageSync("appKey");
      
       let orgIds = userinfo.dataPerOrgId;
       if (orgIds){
       wx.request({
         url: app.getBaseUrl() + 'system/wechat/user/orgIds',
         method: "GET",
         data: {
           orgIds: orgIds,
           key:key
         },
         success: function (res) {
           if(res.msg&&res.msg.search('key')!=-1){
             MSG.sessionExpire();
           }
           if (res.data.success==false) {
             MSG.showToast('操作失败');
             return;
           } else {
              let orgArray = res.data.object;
             var checkboxItemsOrg = [];
             for (let a = 0; a < orgArray.length; a++) {
               checkboxItemsOrg.push({ "orgid": orgArray[a].id, "name": orgArray[a].name });
             }
             that.setData({
               checkboxItemsOrg: checkboxItemsOrg
             })

           }
         }
       })
     }else{
       MSG.sessionExpire();
       return ;
     }
     
    } else if (e.currentTarget.id == 1){
       //如果是车牌号
    } else if (e.currentTarget.id ==0 ){
       //如果是设备号
    }
  },

  showInputCar: function () {
    this.setData({
      inputShowedCar: true
    });
  },
 
  clearInputCar: function () {
    this.setData({
      inputValCar: "",
      checkboxItemsCar:[]
    });
  },
  inputTypingCar: function (e) {
    let that = this;
    let val = e.detail.value;
    that.setData({
      inputValCar: val
    });
    if(val.length>5){
      let key = wx.getStorageSync('appkey');
      wx.request({
        url: app.getBaseUrl() + 'base/wechat/base/queryDeviceSimple',
        method: "GET",
        data: {
          codeOrName: val,
          type: 2,
          key:key
        },
        success: function (res) {
           if (res.data.success == false) {
          MSG.showToast('操作失败')
          } else {
            let orgArray = res.data.object;
            if(orgArray&&orgArray.length>0){
              var checkboxItemsCar = [];
              for (let a = 0; a < orgArray.length; a++) {
                console.log(JSON.stringify(orgArray[a]));
                checkboxItemsCar.push({ "deviceName": orgArray[a].deviceName });
              }
              that.setData({
                //查询车牌号信息，并加载到list中
                checkboxItemsCar: checkboxItemsCar
              })
            }else{
             MSG.showToast('没有数据')
              that.setData({
                //查询车牌号信息，并加载到list中
                checkboxItemsCar: []
              })
            }
           

          }
        }
      })
    } 
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
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      checkboxItems:[]
    });
  },
  inputTyping: function (e) {
    let that = this;
    that.setData({
      inputVal: e.detail.value
    });
    let lg = e.detail.value.length;
    if(lg>5){
      MSG.showLoading('查询中')
      let key = wx.getStorageSync('appkey');
      wx.request({
        url: app.getBaseUrl() + 'base/wechat/base/queryDeviceSimple',
        method: "GET",
        data: {
          codeOrName: e.detail.value,
          type: 1,
          key:key
        },
        success: function (res) {
          MSG.hideLoading();
          if (res.data.success == false) {
            MSG.showToast('操作失败')
          } else {
            let orgArray = res.data.object;
            if(orgArray&&orgArray.length>0){
              var checkboxItems = [];
              for (let a = 0; a < orgArray.length; a++) {
                checkboxItems.push({ "deviceCode": orgArray[a].deviceCode });
              }
              that.setData({
                //查询设备号信息，并加载到list中
                checkboxItems: checkboxItems
              })
            }else{
              MSG.showToast('没有数据')
              that.setData({
                //查询设备号信息，并加载到list中
                checkboxItems: []
              })
            }
            

          }
        }
      })

    }
   
  },
  /**
   * 设备号复选框
   */
  checkboxChange: function (e) {

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].deviceCode == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
    //此功能已经完成，可以拿到选择的数据列

  
  },
  /**
   * 车牌号复选框
   */
  checkboxChangeCar:function(e){

    var checkboxItemsCar = this.data.checkboxItemsCar, values = e.detail.value;
    for (var i = 0, lenI = checkboxItemsCar.length; i < lenI; ++i) {
      checkboxItemsCar[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItemsCar[i].deviceName == values[j]) {
          checkboxItemsCar[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItemsCar: checkboxItemsCar
    });
    //此功能已经完成，可以拿到选择的数据列


  },
  checkboxChangeOrg:function(e){
    var checkboxItemsOrg = this.data.checkboxItemsOrg, values = e.detail.value;
    for (var i = 0, lenI = checkboxItemsOrg.length; i < lenI; ++i) {
      checkboxItemsOrg[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItemsOrg[i].orgid == values[j]) {
          checkboxItemsOrg[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItemsOrg: checkboxItemsOrg
    });
  },
  enterValue:function(e){
    var that = this;
    let searchIndex = that.data.activeIndex;
    var param ;
    if(searchIndex==0){

      param = that.prepareQuery(that.data.checkboxItems, 'deviceCode', 0);
      
    }else if(searchIndex==1){

      param = that.prepareQuery(that.data.checkboxItemsCar, 'deviceName', 1)
    }else{
      //组织机构
     param = that.prepareQuery(that.data.checkboxItemsOrg,'orgid',2)
    }
  
    console.log(param);
    wx.redirectTo({
      url: '../trackQuery?param='+JSON.stringify(param)
    })
  },

  prepareQuery: function (checkboxItemsOrg,key,type){
    var param = {};
    let items = [];
    let foritem = checkboxItemsOrg;//that.data.checkboxItemsOrg;
    for (let a = 0; a < foritem.length; a++) {
      console.log(foritem[a][key]);
      if (foritem[a].checked) {
        items.push(foritem[a][key]);
      }
    }
    param.type = type;
    param.items = items;
    return param;
  }

});