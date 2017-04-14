var repository = require('../../utils/repository.js');
// Register a Page.
Page({
  data: {
    types: [],
    selectedType: {},
    date: '2017-04-14',
    time: '17:00',
    amount: null,
    remark: '',
    amountInvaild: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onload');
    var types = repository.getRecordTypes();
    var selectedType;
    for (var i = 0; i < types.length; i++) {
      var type = types[i];
      if (type.checked) {
        selectedType = type;
      }
    }
    this.setData({
      types: types,
      selectedType: selectedType
    });
  },
  onReady: function () {
    // 页面渲染完成
    console.log('onReady');
  },
  onShow: function () {
    // 页面显示
    console.log("onShow");
  },
  onHide: function () {
    // 页面隐藏
    console.log('onHide');
  },
  onUnload: function () {
    // 页面关闭
    console.log('onUnload');
  },
  bindAmountInput: function (e) {
    var amount = e.detail.value;
    this.data.amountInvaild = !amount;
    console.log('amountInvaild:', this.data.amountInvaild);
    this.setData({
      amountInvaild: this.data.amountInvaild
    });
  },
  selectedTypeChange: function (e) {
    console.log('selectedTypeChange');

    var val = e.detail.value;
    var selectedType;
    var types = this.data.types;
    for (var i = 0; i < types.length; i++) {
      var type = types[i];
      if (type.name === val) {
        console.log(`selected type :${type.name}`);
        type.checked = true;
        selectedType = type;
      }
      else {
        type.checked = false;
      }
    }
    this.setData({
      //types: types,
      selectedType: selectedType
    });
  },
  cancleEvent: function (e) {
    // sent data change to view
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        ;
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  saveEvent: function (e) {
    var data = this.data;
    var amount = data.amount || data.selectedType.default;
    console.log(`type:${data.selectedType.name} amount:${amount} date:${data.date} time:${data.time} remark:${data.remark}`);
  },
  formSubmit: function (e) {
    var val = e.detail.value;
    var amount = val.amount;

    this.data.amountInvaild = !amount;

    if (this.data.amountInvaild) {
      this.setData({
        amountInvaild: this.data.amountInvaild
      });
      return;
    }
    var date = val.date;
    var time = val.time;
    var type = val.type;
    var remark = val.remark;

    this.data.amount = amount;
    this.data.date = date;
    this.data.time = time;
    this.data.remark = remark;

    console.log(`type:${type} amount:${amount} date:${date} time:${time} remark:${remark}`);
    var record = {
      type: type,
      amount: amount,
      date: date,
      time: time,
      remark: remark
    };
    repository.insertRecord(record, (result) => {
      if (result.success) {
        console.log('insertRecord success');
      }
      else {
        console.log('insertRecord fail');
      }
    });
  }
})