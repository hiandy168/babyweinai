//index.js
var util = require('../../utils/util.js');
var summary = require('../../utils/summary.js');
var repository = require('../../utils/repository.js');
Page({
  data: {
    userInfo: {},
    todaySummary: {},
    today: ''
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

  },
  onShow: function () {
    console.log('onshow');
    var that = this;
    var todayDate = util.formatDate(new Date());
    repository.findDateNode(todayDate,(result) => {
      if (result.success) {
        var todaySummary = summary.dateDefaultSummary(result.result);
        that.setData({
          todaySummary: todaySummary,
          today: todayDate
        });
      } else {
        that.setData({
          todaySummary: {},
          today: todayDate
        });
      }
    });
  }
})
