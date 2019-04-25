// 리스트 9.8 redraw() 함수

// 서클 팩 레이아웃은 변경된 SVG 크기에 기초해 데이터를 새로 생성한다.
function redraw() {
  var leftSize = canvasSize("#leftSVG");
  packChart.size(leftSize)

  d3.select("#leftSVG")
    .selectAll("circle")
    .data(packChart(packableTweets))
    .attr("r", function(d) {return d.r;})
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;});

  // 변경할 막대 그래프 데이터에 기초해 동적으로 크기를 계산해야 한다.
  var rectNumber = d3.select("#rightSVG")
                     .selectAll("rect").size();
  var rectData = d3.select("#rightSVG").selectAll("rect").data();
  var rectMax = d3.max(rectData, function(d) {return d.values.length});
  var rightSize = canvasSize("#rightSVG");

  // x 스케일은 d3.nest()로 생성한 "key"값에 기초한 ordinal 스케일이다.
  barXScale = d3.scale.ordinal()
                .domain(rectData.map(function(d){return d.key}))
                .rangeBands([0, rightSize[0]]);
  // y 스케일은 d3.nest()로 생성한 배열의 "values" 배열의 최댓값에 기초한다.
  barYScale = d3.scale.linear()
                .domain([0, rectMax])
                .range([rightSize[1],0]);

  d3.select("#rightSVG")
    .selectAll("rect")
    .attr("x", function(d,i) {return barXScale(d.key) + 5})
    // width와 x 위치에 5px 간격을 둔다.
    .attr("width", function() {return barXScale.rangeBand() - 5})
    .attr("y", function(d) {return barYScale(d.values.length)})
    .attr("height", function(d) {
      return rightSize[1] - barYScale(d.values.length);
    });

  // 현재 SVG 그림 영역의 크기를 px 단위로 계산한다.
  function canvasSize(targetElement) {
    var height = parseFloat(d3.select(targetElement)
			    .node().clientHeight);
    var width = parseFloat(d3.select(targetElement).node().clientWidth);
    return [width,height];
  };
};
