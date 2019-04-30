// 리스트 12.20 스마트폰에서 쓸 수 있도록 데이터 시각화 변환

function phoneView() {

  nestPhoneData();

  screenWidth = parseFloat(d3.select("svg").node().clientWidth ||
			   d3.sclect("svg").node().parentNode.clientWidth);
  // 태블릿 뷰에서 했던 것처럼 목록을 제거한다.
  d3.select("#list").remove();
  d3.selectAll("g.axis").remove();

  // 단말 노드 출력을 위한 스케일
  circleSize = d3.scale.linear().domain(sizeExtent).range([2,10]);
  circleStroke = d3.scale.linear().domain(valueExtent).range([1,5]);

  packChart = d3.layout.pack();
  packChart.size([screenWidth,screenHeight-200])
           .children(function(d) {return d.values})
           .value(function(d) {return circleSize(d.size)});

  // 기호가 아니라 원과 상호작용한다.
  d3.selectAll("g.datapoint").select("path")
    .style("pointer-events", "none");

  d3.select("#dataG")
    .attr("transform", "translate(0,100)")
    .selectAll("circle")
    .data(packChart(packableData))
    .enter()
    .insert("circle","g")
    .attr("class", "pack")
    .style("fill", "white")
    .style("stroke", "black")
    .style("stroke-width", function(d) {return circleStroke(d.oValue)})
    .on("touchmove", changeView)
    .on("click", changeView)

  d3.select("#vizcountainer").append("div")
    .attr("class", "viewTitle").html("Current View");

  var viewStats =
    d3.select("#vizcontainer").append("div").attr("class", "viewStats");

  // 레이블 <div> 추가
  viewStats.append("div").attr("id", "viewValue").html("Average Value");
  viewStats.append("div").attr("id", "viewSize").html("Average Size");

  // 원거리 뷰로 초기화한다.
  changeView(packableData)
};
