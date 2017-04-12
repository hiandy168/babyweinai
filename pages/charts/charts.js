var wxCharts = require('../../utils/wxcharts-min.js');
var windowWidth = 320;
var chartHeight = 180;
var newChart = function(){
   new wxCharts({
            canvasId: 'chart',
            type: 'line',
            categories: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6','3/7'],
            series: [{
                name: '配方奶',
                data: [100, 50, 200, 100,80, 70,60],
                
            }, {
                name: '开水',
                data: [50, 70, 90, 100, 50, 40,80],
               
            }],
            yAxis: {
                title: '数量（ml）',
                min: 0
            },
            width: windowWidth,
            height: chartHeight
        });
}
var newChart1 = function(){
   new wxCharts({
            canvasId: 'chart1',
            type: 'line',
            categories: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6','3/7'],
            series: [{
                name: '母乳',
                data: [1, 3, 5, 10,7, 4,5],
                
            }],
            yAxis: {
                title: '数量（次）',
                min: 0
            },
            width: windowWidth,
            height: chartHeight
        });
}
var newChart2 = function(){
   new wxCharts({
            canvasId: 'chart2',
            type: 'line',
            categories: ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6','3/7'],
            series: [{
                name: '便便',
                data: [1, 3, 5, 10,7, 4,5],
                
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
            console.log('windowWidth',windowWidth);
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        newChart();
        newChart1();
        newChart2();
    },
    onReady: function () {
         console.log('onReady');
    }
});