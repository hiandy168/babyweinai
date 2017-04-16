var wxCharts = require('../../utils/wxcharts-min.js');
var summaryUtil = require('../../utils/summary.js');
var windowWidth = 320;
var chartHeight = 180;
var newChart = function (categories,peiFangNai,kaiShui) {
    new wxCharts({
        canvasId: 'chart',
        type: 'line',
        categories:categories,
        series: [{
            name: '配方奶',
            data: peiFangNai,

        }, {
            name: '开水',
            data: kaiShui,

        }],
        yAxis: {
            title: '数量（ml）',
            min: 0
        },
        width: windowWidth,
        height: chartHeight
    });
}
var newChart1 = function (categories,muRu) {
    new wxCharts({
        canvasId: 'chart1',
        type: 'line',
        categories: categories,
        series: [{
            name: '母乳',
            color: '#dddddd',
            data: muRu,

        }],
        yAxis: {
            title: '数量（次）',
            min: 0
        },
        width: windowWidth,
        height: chartHeight
    });
}
var newChart2 = function (categories,bianbian) {
    new wxCharts({
        canvasId: 'chart2',
        type: 'line',
        categories: categories,
        series: [{
            name: '便便',
            data: bianbian,

        }],
        yAxis: {
            title: '数量（次）',
            min: 0
        },
        width: windowWidth,
        height: chartHeight
    });
}
Page({
    onLoad: function () {
        console.log('onload');
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
            console.log('windowWidth', windowWidth);
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        // newChart();
        // newChart1();
        // newChart2();
    },
    onShow: function () {
        var sevenSummary = summaryUtil.sevenDaySummary();
        var categories = [];
        var peiFangNaiArr = [];
        var kaiShuiArr = [];
        var muRuArr = [];
        var bianBianArr=[];
        for (var prop in sevenSummary) {
            var propArr = prop.split('-');
            var category = propArr[1]+'-'+propArr[2];
            categories.unshift(category);
            var summary = sevenSummary[prop];
            peiFangNaiArr.unshift(summary['配方奶'] ? summary['配方奶'].totalAmount : 0);
            kaiShuiArr.unshift(summary['开水'] ? summary['开水'].totalAmount : 0);
            muRuArr.unshift(summary['母乳'] ? summary['母乳'].totalAmount : 0);
            bianBianArr.unshift(summary['便便'] ? summary['便便'].totalAmount : 0);
        }
        console.log(sevenSummary);
        newChart(categories,peiFangNaiArr,kaiShuiArr);
        newChart1(categories,muRuArr);
        newChart2(categories,bianBianArr);
    },
    onReady: function () {
        console.log('onReady');
    }
});