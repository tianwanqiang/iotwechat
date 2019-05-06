var app = getApp();
const MSG = require('../../../utils/message.js');
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submited: false,
    verificationCode: false,
  
    currentTime: 61,
    isTimeOut: true,
    userCode: '',
    password: '',
    mobileCode: '',
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  userCodeBind: function (e) {
    this.setData({
      userCode: e.detail.value
    });
    this.setDataAfterDataBind(this);
  },
  passwordBind: function (e) {
    this.setData({
      password: e.detail.value
    });
    this.setDataAfterDataBind(this);
  
  },
  // mobileCodeBind: function (e) {
  //   this.setData({
  //     mobileCode: e.detail.value
  //   });
  //   this.setDataAfterDataBind(this);
  // },

  /**
   * 检查是否允许提交
   */
  checkAllowSubmited: function () {
    if (!this.data.userCode
      || !this.data.password) {
      return false;
    }
    return true;
  },

  /**
   * 检查是否允许发送验证码
   */
  checkAllowVerificationCode: function () {
    if (!this.data.isTimeOut || !this.data.userCode) {
      return false;
    }
    return true;
  },

  /**
   * 调用后台获取验证码
   */
  getVerificationCode: function () {
     if (this.data.userCode == ''
      || this.data.password == '') {
      MSG.showToast('用户名、密码都不能为空!');
      return;
    }
    var that = this;
    that.setData({
      verificationCode: false,
      isTimeOut: false
    });
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        btnVCText: currentTime + ' 秒'
      });
      if (currentTime <= 0) {
        clearInterval(interval);
        that.setData({
          btnVCText: '重新发送',
          currentTime: 61,
          verificationCode: true,
          isTimeOut: false
        });
      }
    }, 1000);
    wx.request({
      url: app.getBaseUrl() + 'service/wechat_getVerificationCode',
      method: "POST",
      data: {
        openid: wx.getStorageSync("openid"),
        userCode: this.data.userCode,
        password: this.data.password
      },
      success: function (e) {
        if (e.data.data.isSuccess == 'N') {
          wx.showToast({
            title: e.data.data.data, icon: 'none', duration: 3000
          });
        } else {
          MSG.showToast('发送成功，请注意查收！');
          var user = e.data.data.data;
          that.setData({
            userId: user.userId
          });
        }
      }
    });
  },

  doSubmit: function () {
    if (!this.data.userCode
      || !this.data.password) {
      MSG.showToast('用户名、密码不能为空!');
    }  else {
      wx.request({
        url: app.getBaseUrl() + 'system/wechat/user/bindUser',
        method: "POST",
        data: {
          openId: wx.getStorageSync("openid"),
          userId: this.data.userCode,
          password: this.data.password
        },
        success: function (e) {
           if(e.data.success==false){
            wx.showToast({
              title: e.data.error, icon: 'none', duration: 3000
            });
          } else {
            MSG.showToast('绑定成功！');
            let uinfo = JSON.parse(e.data.object);
            wx.setStorageSync("login", "true")
            wx.setStorageSync("userinfo", uinfo );
            wx.setStorageSync("appkey", uinfo.userCode);
            setTimeout(function () {
              var pagelist = getCurrentPages();
              if (pagelist.length > 1) {
                wx.navigateBack({ delta: 1 });
              }
            }, 2000);
          }
        }
      });
    }
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 原来是 将mobileCode等和 submited 同时设置，导致在mobileCode没有设置完成的时候就调用checkAllow函数
   * 从而导致对输入框状态的误判
   */
  setDataAfterDataBind:function(obj){
    obj.setData({
    submited: this.checkAllowSubmited()
  })}
})