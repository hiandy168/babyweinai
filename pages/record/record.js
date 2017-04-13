var app = getApp();
// Register a Page.
Page({
  data:{
    types:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onload');
    var types = app.getRecordTypes();
    this.setData({
      types:types
    });
  },
  onReady:function(){
    // 页面渲染完成
    console.log('onReady');
  },
  onShow:function(){
    // 页面显示
    console.log("onShow");
  },
  onHide:function(){
    // 页面隐藏
    console.log('onHide');
  },
  onUnload:function(){
    // 页面关闭
    console.log('onUnload');
  },
  cancleEvent: function(e) {
    // sent data change to view
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        ;
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})