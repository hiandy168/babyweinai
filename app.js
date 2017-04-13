//app.js
App({
  onLaunch: function () {
    console.log('app launch');
  },
  getRecordTypes: function () {
    var customTypes = wx.getStorageSync('recordTypes') || [];
    var types = [];
    for (var i = 0; i < this.globalData.defaultRecordTypes.length; i++) {
      var item = this.globalData.defaultRecordTypes[i];
      types.push(item);
    }
    for (var i = 0; i < customTypes.length; i++) {
      var item = customTypes[i];
      types.push(item);
    }

    return types;
  },
  getRecords: function (callback) {
    if (callback) {
      if (this.globalData.records) {
        callback(this.globalData.records);
      }
      else {
        wx.getStorage({
          key: 'records',
          success: function (res) {
            // success
            var records = res.data || [];
            this.globalData.records = records;
            callback(records);
          },
          fail: function (res) {
            // fail
            console.log('get records from storage fail .');
            wx.setStorage({
              key: 'records',
              data: []
            });
            this.globalData.records = [];
            callback(this.globalData.records);
          },
          complete: function (res) {
            // complete
          }
        })
      }

    }
  },
  globalData: {
    userInfo: null,
    defaultRecordTypes: [
      { name: '母乳', unit: '次', default: 1 },
      { name: '配方奶', unit: 'ml' },
      { name: '开水', unit: 'ml' },
      { name: '便便', unit: '次', default: 1 }
    ]
  }
})