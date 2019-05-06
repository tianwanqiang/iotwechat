//app.js
App({
  onLaunch: function() {
    //检查更新
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    var that = this
    //获取屏幕尺寸，放到全局结构中
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.scHeight = res.windowHeight
        that.globalData.scWidth = res.windowWidth
      },
    })
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    can_use1: 1,
    urlStr: null,
    // h5:'http://localhost:8380/pages/h5/trackhistory.ftl',
    h5:'https://wechar.winstartech.net/wechar/pages/h5/trackhistory.ftl'
  },

  getBaseUrl: function() {
    return 'https://wechar.winstartech.net/iot/';//iot生产
    // return 'http://127.0.0.1:9010/iot/' //本地
  },
  //获取百度地图API的AK 
  getBMapAk: function() {
    // 中创小程序AK
    // return 'KikdB8XDCsKlm2ZyijXmcwerNlnR8qly';
    // 外运小程序AK
    return '5NCPdyebw9lLRHhwKhUq8g2wla4Me9i0';
  },
  getImageUrl: function() {
    return "../../Image/ban.jpg";
  }

})