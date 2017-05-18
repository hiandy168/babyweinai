//index.js
var util = require('../../utils/util.js');
var summary = require('../../utils/summary.js');
var repository = require('../../utils/repository.js');
var img = require('../../utils/img.js');
Page({
  data: {
    background:'',
    backname:'',
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
    repository.getRecords((data)=>{
      if(data.back){
        that.setData({
          background: img.a,
          backname: img.b
        });
      }
    });
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
  ,
   onShareAppMessage: function () {
    return {
      title: '宝宝喂奶是一款用来记录宝宝吃奶等情况的小工具。',
      path: 'pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
