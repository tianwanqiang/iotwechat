var app = getApp();
const MSG = require('../../utils/message.js');
Page({
  data: {
    enableBind: false,
    refresh: false,
    os: '未知',
    btnText: "加载中",
    userinfo: {
      userId: "",
      userName: "游客",
      officeName: "没有登陆或注册的人",
      roleName: "未知",
      userCode: "未知"
    }
  },

  bindUserInfo: function () {
    if (this.data.btnText == '立即绑定') {
      wx.navigateTo({
        url: 'userinfo/userinfo',
      })
    } else {
      const that = this;
      wx.showModal({
        title: '消息',
        content: '确定解除绑定吗？解除绑定后，部分业务功能将不可操作。',
        confirmColor: '#405f80',
        success: function (res) {
          if (res.confirm) {
            let secret = wx.getStorageSync("appkey");
            wx.request({
              url: app.getBaseUrl() + 'system/wechat/user/unBindUser',
              method: "POST",
              data: {
                appkey: secret
              },
              success: function (e) {
                if (e.data.success == false) {
                  MSG.showToast(e.data.error);
                } else {
                  MSG.showToast('解除绑定成功！');
                  that.removeLoginfo();
                 
                }
              }
            });
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.setData({ refresh: true });
    var isLogin = wx.getStorageSync("login");
    
    //如果原先已经登录
    if (isLogin ==='true'){
      let userinfo = wx.getStorageSync('userinfo');
      that.setData({
        userinfo: userinfo,
        enableBind: true,
        btnText: "解除绑定"
      });
    }else{
       var openid = wx.getStorageSync("openid");
      if (!openid) {
        that.initOpenId().then((res) => that.initUinfo(res)).catch((res)=>console.log('请求失败'));
      }else{
        that.initUinfo(openid);
      }
      
    
     

    }
    
   
  },
  //获取用户openId
  initOpenId: function () {
    var that = this;
    return new Promise(function(resolve,reject){
      wx.login({
        success: function (res) {
          wx.request({
            url: app.getBaseUrl() + 'system/wechat/user/getOpenId',
            data: {
              code: res.code
            },
            method: "GET",
            success: function (res) {
              if (res.data.success && res.data.success == true) {
                var openid = res.data.object;//获取到的openid
                resolve(openid);      
              }
            },
            fail:function(res){
              reject(res);
            }
          })
        }
      })
    })
 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.refresh) {
      this.onLoad();
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ refresh: false });
  },
  initUinfo: function (oid){
    var that = this;
   wx.request({
     url: app.getBaseUrl() + 'system/wechat/user/alleadyBindOpenId',
     method: "POST",
     data: { openid: oid },
     success: function (e) {
       if (e.data.error) {
         MSG.showToast(e.data.error);
        //清楚本地登陆信息
         that.removeLoginfo();
          
       } else {
         let uinfo = JSON.parse(e.data.object);
         that.setData({
           userinfo: uinfo,
           enableBind: true,
           btnText: "解除绑定"
         });
         wx.setStorageSync("userinfo", uinfo);
         wx.setStorageSync("appkey", uinfo.userCode);
         wx.setStorageSync("login", "true");
         wx.setStorageSync("openid", oid);
       }
     }
   });
 },
 removeLoginfo:function(){
   var that = this;
   wx.removeStorageSync("userinfo");
   wx.removeStorageSync("appkey");
     wx.removeStorageSync("openid");
   wx.setStorageSync("login", "false");
   that.setData({
     enableBind: true,
     btnText: "立即绑定",
     userinfo: {
       trueName: "游客",
       sysOrgName: "没有登陆或注册的人",
       roleName: "未知",
       userCode: "未知"
     }
   });
 }
})