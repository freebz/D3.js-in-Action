// 리스트 9.7 서클 팩 코드

function createPack(incData, targetSVG) {

  var depthScale = d3.scale.quantize()
    .domain([0,1,2]).range(colorbrewer.Reds[3]);

  packChart = d3.layout.pack();
  // 레이아웃은 어떤 것이든 될 수 있다.
  // 화면을 다시 그리려 redraw()를 호출하면,
  // redraw() 함수 안에서 다시 레이아웃을 호출한다.
  packChart.size([100,100])
    .children(function(d) {return d.values;})
    .value(function(d) {return 1;});

  d3.select(targetSVG)
    .append("g")
    .attr("transform", "translate(0,0)")
    .selectAll("circle")
    .data(packChart(incData))
    .enter()
    .append("circle")
    .attr("class", "pack")
    .style("fill", function(d) {return depthScale(d.depth);});

};
