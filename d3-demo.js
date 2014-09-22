/**
 * Created by zcfrank1st on 9/18/14.
 */
'use strict';


/**
 *  obj = {
 *      totalrate: '80%',
 *      nodedataset: [{}],
 *      ratedataset: [{}]
 *  }
 *
 */
var nodedataset = [{
    name: 'helloworld',
    visits: 1000,
    pv: 1000,
    uv: 500
},{
    name: 'helloworld',
    visits: 1000,
    pv: 1000,
    uv: 500
},{
    name: 'helloworld',
    visits: 1000,
    pv: 0,
    uv: 0
}];
var ratedataset =  [{
    trans_rate: '40%'
},{
    trans_rate: '20%'
}];
var totalrate = '10%';

function isLastStepAction(nodedataset) {
    if (! nodedataset[nodedataset.length - 1].pv) {
        var tmp = [];
        for (var i = 0; i <= nodedataset.length - 1; i++) {
            tmp.push(nodedataset[i])
        }
        tmp.pop();
        return tmp;
    } else {
        return nodedataset;
    }
}

var svg = d3.select('svg');

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d, i) {
        return "<strong>第" + (i+1) + "步: </strong><span style='color:red'>" + d.name + "</span>";
    });
svg.call(tip);

// 画梯形
svg
    .append('g')
    .selectAll('polygon')
    .data(nodedataset)
    .enter()
    .append('polygon')
    .attr('points', function(d, i) {
        var y1 = 50 + i * 200;
        var y2 = 150 + i * 200;
        return '50,' + y1 + ' 300,' + y1 + ' 275,' + y2 + ' 75,' + y2
    })
    .attr('fill', 'rgba(7, 151, 237, 0.5)')
    .attr('stroke', 'rgba(107, 89, 171, 0.5)')
    .attr('stroke-width', '10')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

// 画矩形
svg
    .append('g')
    .selectAll('rect')
    .data(ratedataset)
    .enter()
    .append('rect')
    .attr('x', '150')
    .attr('y', function (d, i) {
        return 155 + i * 200 + '';
    })
    .attr('width', '50')
    .attr('height', '65')
    .attr('fill', 'rgba(113, 180, 255, 0.35)');

// 画三角形
svg
    .append('g')
    .selectAll('polygon')
    .data(ratedataset)
    .enter()
    .append('polygon')
    .attr('points', function (d, i) {
        var y1 = 220 + i * 200;
        var y2 = y1;
        var y3 = 245 + i * 200;
        return '125,' + y1 + ' 225,' + y2 + ' 175,' + y3;
    })
    .attr('fill', 'rgba(113, 180, 255, 0.35)');

// 画线
svg
    .append('g')
    .selectAll('line')
    .data(isLastStepAction(nodedataset))
    .enter()
    .append('line')
    .attr('x1', '350')
    .attr('y1', function (d, i) {
        return 100 + i * 200 + '';
    })
    .attr('x2', '450')
    .attr('y2', function (d, i) {
        return 100 + i * 200 + '';
    })
    .attr('stroke', 'rgba(0, 0, 0, 0.25)')
    .attr('stroke-width', '10');

svg
    .append('g')
    .selectAll('path')
    .data(isLastStepAction(nodedataset))
    .enter()
    .append('path')
    .attr('d', function (d, i) {
        var x = 450;
        var x1 = 500;
        var y = 75 + i * 200;
        var y1 = 100 + i * 200;
        var y2 = 125 + i * 200;
        return 'M' + x + ',' + y + ' L' + x1 + ',' + y1 + ' L' + x + ',' + y2
    })
    .attr('fill','rgba(0, 0, 0, 0.25)');

svg
    .append('g')
    .selectAll('rect')
    .data(isLastStepAction(nodedataset))
    .enter()
    .append('rect')
    .attr('x', '550')
    .attr('y', function (d, i) {
        return 70 + i * 200;
    })
    .attr('width', '250')
    .attr('height', '50')
    .attr('fill', 'rgba(255, 255, 0, 0.5)')
    .attr('stroke', 'rgba(0, 255, 100, 0.5)')
    .attr('stroke-width', '5');


// 总结文字
svg
    .append('g')
    .append('text')
    .text('总转化率为: ' + totalrate)
    .attr('x', '110')
    .attr('y', '25');

// 步骤中文字 和 梯形中文字
svg
    .append('g')
    .selectAll('text')
    .data(nodedataset)
    .enter()
    .append('text')
    .text(function (d ,i) {
        return '第' + (i+1) + '步, 访问数为: ' + d.visits;
    })
    .attr('x', '80')
    .attr('y', function (d, i) {
        return 100 + i * 200 + '';
    });

// 梯形旁边统计信息
svg
    .append('g')
    .selectAll('text')
    .data(ratedataset)
    .enter()
    .append('text')
    .text(function (d ,i) {
        return '转化率:' + d.trans_rate;
    })
    .attr('x', '250')
    .attr('y', function (d, i) {
        return 200 + i * 200 + '';
    });

svg
    .append('g')
    .selectAll('text')
    .data(isLastStepAction(nodedataset))
    .enter()
    .append('text')
    .text(function (d ,i) {
        return 'uv:' + d.pv + ' pv:' + d.uv;
    })
    .attr('x', '560')
    .attr('y', function (d, i) {
        return 100 + i * 200 + '';
    });
