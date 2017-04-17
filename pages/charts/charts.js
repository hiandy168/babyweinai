var wxCharts = require('../../utils/wxcharts-min.js');
var summaryUtil = require('../../utils/summary.js');
var repository = require('../../utils/repository.js');

var colors=[
    '#EDAAA2',
    '#09bb07',
    '#576b95'
];
var colorIndex=0;
var getColor = function(){
    var color = colors[colorIndex%3];
    colorIndex++;

    return color;
};
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
var newChart1 = function (cavId,name,title,categories,muRu) {
    new wxCharts({
        canvasId: cavId,
        type: 'line',
        categories: categories,
        series: [{
            name: name,
            color: getColor(),
            data: muRu,

        }],
        yAxis: {
            title: title,
            min: 0
        },
        width: windowWidth,
        height: chartHeight
    });
}

Page({
    data:{
        customTypes:[]
    },
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
        colorIndex =0;
        var sevenSummary = summaryUtil.sevenDaySummary();
        var customTypes = repository.getCustomTypes();
        this.setData({
            customTypes:customTypes
        });
        var categories = [];
        var peiFangNaiArr = [];
        var kaiShuiArr = [];
        var muRuArr = [];
        var bianBianArr=[];
        var ctSummary = {};
        customTypes.forEach((ct)=>{
            ctSummary[ct.name]={
                type:ct,
                result:[]
            };
        });
        for (var prop in sevenSummary) {
            var propArr = prop.split('-');
            var category = propArr[1]+'-'+propArr[2];
            categories.unshift(category);
            var summary = sevenSummary[prop];
            peiFangNaiArr.unshift(summary['配方奶'] ? summary['配方奶'].totalAmount : 0);
            kaiShuiArr.unshift(summary['开水'] ? summary['开水'].totalAmount : 0);
            muRuArr.unshift(summary['母乳'] ? summary['母乳'].totalAmount : 0);
            bianBianArr.unshift(summary['便便'] ? summary['便便'].totalAmount : 0);
            for(var ctIndex in customTypes){
                var ct = customTypes[ctIndex];
                ctSummary[ct.name].result.unshift(
                  summary[ct.name]? summary[ct.name].totalAmount : 0  
                );
            }
        }
        console.log(sevenSummary);
        console.log(ctSummary);
        newChart(categories,peiFangNaiArr,kaiShuiArr);
        newChart1('chart1','母乳','数量（次）',categories,muRuArr);
        newChart1('chart2','便便','数量（次）',categories,bianBianArr);
        for(var prop in ctSummary){
            var t = ctSummary[prop].type;
            var arr = ctSummary[prop].result;
            newChart1(prop,prop,'数量（'+t.unit+'）',categories,arr);
        }
    },
    onReady: function () {
        console.log('onReady');
    }
});