/**
 * Created by Administrator on 2016/12/9.
 */

/**
 * 氛围温度参数
 * */

require.config({
    paths: {
        echarts: "." +"/js"
    }
});
require([
        'echarts',
        'echarts/chart/gauge',

    ],
    function(ec) {
        var myChart = ec.init(document.getElementById("chartY"));

        var option = {
            tooltip: {
                formatter: ""
            },

            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: false
                    },
                    restore: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            series: [{
                name: '',
                type: 'gauge',
                splitNumber: 36,
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '100%'], // 默认全局居中
                radius: 128,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.25, '#c3d79b'],
                            [0.5, '#b3a1c7'],
                            [0.75, '#93cddd'],
                            [1, '#f79546']
                        ],
                        width: 70
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false,
                    splitNumber: 10, // 每份split细分多少段
                    length: 6 // 属性length控制线长
                },
                splitLine: {
                    length: 3,
                    show: false
                },
                axisLabel: { // 坐标轴文本标签，详见axis.axisLabel

                    rotate: 50,
                    formatter: function(v) {
                        switch (parseInt(v + "") + "") {
                            case '5':return '危';
                            case '11':return '机';
                            case '16':return '四';
                            case '22':return '伏';

                            case '30':return '急';
                            case '36':return '需';
                            case '41':return '改';
                            case '47':return '进';

                            case '52':return '尚';
                            case '58':return '有';
                            case '63':return '潜';
                            case '69':return '力';

                            case '77':return '红';
                            case '83':return '红';
                            case '88':return '火';
                            case '94':return '火';

                            default:return '';
                        }
                    },

                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#faf8f8',


                        fontSize: 12
                    }
                },
                pointer: {
                    length: '80%',
                    width: 15,
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                title: {
                    show: true,
                    offsetCenter: [0, '-60%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 30
                    }
                },
                detail: {
                    show: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 50,
                    height: 40,
                    offsetCenter: [0, -40], // x, y，单位px
                    formatter: '{value}°',
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize: 30
                    }
                },
                data: [{
                    value: $("#chartY").attr('data-value')*1,
                    name: ''
                }]
            }]

        };

        myChart.setOption(option);
    });

/**
 * echarts参数
 * */


 /**
 * 前三名
 * */
var chart1 = echarts.init(document.getElementById('chart1'));
option1 = {
    tooltip: {
        show:false
    },
    grid: {
        left: '3%',
        right: '4%',
        top:'0%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 1],
        max:100,
        show:false
    },
    yAxis: {
        type: 'category',
        data:eval($("#chart1").attr("data-echart-name"))
    },
    series: [
        {
            type: 'bar',
            data: eval($("#chart1").attr("data-echart-num")),
            barWidth:'24px',
            itemStyle : { normal: {label : {show: true}}},
            color: ['#f79646'],
        }
    ]
};
chart1.setOption(option1);

/**
 * 后三名
 * */
var chart2 = echarts.init(document.getElementById('chart2'));
option2 = {
    tooltip: {
        show:false
    },
    grid: {
        left: '3%',
        right: '4%',
        top:'0%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 1],
        max:100,
        show:false
    },
    yAxis: {
        type: 'category',
        data: eval($("#chart2").attr("data-echart-name"))
    },
    series: [
        {
            type: 'bar',
            data: eval($("#chart2").attr("data-echart-num")),
            barWidth:'24px',
            itemStyle : {
                normal: {label : {show: true}}
            },
            color: ['#c3d69b','#b3a2c7','#b3a2c7'],
        }
    ]
};
chart2.setOption(option2);


/**
 * 指数--分布
 * */
var chart3 = echarts.init(document.getElementById('chart3'));
option3 = {
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['35%', '40%'],
            data:datashow,
            label: {
                normal: {
                    position: 'inner'
                }
            },
            color:[
                '#c3d79b','#b3a1c7','#93cddd','#f79546'
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
chart3.setOption(option3);

/**
 * 创新-执行-凝聚
 * */
var chart4 = echarts.init(document.getElementById('chart4'));
var chartNum4=eval($("#chart4").attr("data-echart-num"));

option4 = {
    // toolbox: {
    // 	show: true,
    // 	feature: {
    // 		dataZoom: {
    // 			yAxisIndex: 'none'
    // 		}
    // 	}
    // },
    grid:{
        border:'none'
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        //data: ['执行温度','创新温度','凝聚温度']
        data: ['','','']
    },
    yAxis: {
        max:Math.max.apply(null, chartNum4),
        min:Math.min.apply(null, chartNum4),
        show:false
    },
    color:['#999'],
    series: [
        {
            type:'line',
            data:chartNum4,
            itemStyle : { normal: {label : {show: true}}}
        }
    ]
};
chart4.setOption(option4);

/**
 * 凝聚温度解析
 * */

var chart5 = echarts.init(document.getElementById('chart5'));
var chartNum5=eval($("#chart5").attr("data-echart-num"));
option5 = {
    grid:{
        border:'none'
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        // data: ['周一','周二','周三','周四','周五']
        // data: ['绩效挂钩','及时认可','感到自豪','相互信任','获得成长']
        data: [' ',' ',' ',' ',' ']
    },
    yAxis: {
        max:100,
        min:0,
        show:false
    },
    series: [
        {
            type:'line',
            data:chartNum5,
            itemStyle : { normal: {label : {show: true}}},
            markLine: {
                data : [
                    [
                        {name: '标线1起点', value: 80, x: '10%', y: 80},
                        {name: '标线1终点', x: '92%', y: 80}
                    ]
                ]
            }
        }
    ]
};
chart5.setOption(option5);