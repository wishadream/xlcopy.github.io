var myChart = echarts.init(document.getElementById('myMap'));

var data = [
    { name: '南阳', value: ['1999.6 ～ forever', '出生成长的地方，永远的家'] },
    { name: '苏州', value: ['2017.6 ～ now', '去找爸爸玩'] },
    { name: '新乡', value: ['2018.09', '我的大学'] },
    { name: '襄阳', value: ['2018.7', '去看了妖猫传的拍摄地'] },
    { name: '西安', value: ['2017.9', '姐姐结婚了'] },
    { name: '济南', value: ['2020.8', '天下第一泉-趵突泉'] },
    { name: '太原', value: ['2019.10', '太钢汽水很好喝'] },
    { name: '临汾', value: ['2020.10', '国庆节去看了壶口瀑布'] },
    { name: '渭南', value: ['2019.4', '成功登顶华山'] },
    { name: '无锡', value: ['2017.06', '高考后暑假工'] }
];
var geoCoordMap = {
    '南阳': [112.5396, 33.0036],
    '苏州': [120.619585, 31.299379],
    '新乡': [113.90598, 35.3718],
    '襄阳': [112.13555, 32.04487],
    '西安': [108.93425, 34.23053],
    '济南': [116.75199, 36.55358],
    '太原': [112.48699, 37.94036],
    '临汾': [111.57873, 36.08301],
    '渭南': [109.7719, 34.51259],
    '无锡': [120.301663, 32.5]
};

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
            //console.log(res)
        }
    }
    return res;
};

option = {
    // backgroundColor: '#404a59',
    title: {},
    tooltip: {
        trigger: 'item',
        padding: 10,
        backgroundColor: '#1c2230',
        borderColor: '#81a4c2',
        borderWidth: 1,
        formatter: function(params) {
            name = params.name
            time = params.value[2]
            describe = params.value[3]
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                name +
                '</div>' +
                time +
                '<br>' +
                describe;
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: '#1e2132',
                borderColor: '#7a9ebe'
            },
            emphasis: {
                areaColor: '#cccccc'
            }
        }
    },
    series: [{
        name: '足迹',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#1adaff',
                shadowBlur: 10,
                shadowColor: '1adaff'
            }
        },
        zlevel: 1
    }]
};

myChart.setOption(option);