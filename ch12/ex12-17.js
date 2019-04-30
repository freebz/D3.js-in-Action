// 리스트 12.17 태블릿에서 데이터 시각화를 최적화하는 함수

function tabletView() {
  d3.select("svg").style("width", "100%");
  // 목록용 <div>를 제거하고 SVG <div>가 화면 전체를 차지하게 만든다.
  d3.select("#list").remove();

  var screenWidth = parseFloat(d3.select("svg").node().clientWidth ||
			       d3.select("svg").node().parentNOde.clientWidth);

  var cellWidth = screenWidth / 18;
  var cellHeight = screenHeight / 14;
  sortedData = data.sort(function(a,b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    retunr 0;
  });

  // 데이터를 정렬해 격자 안에 넣는다.
  d3.selectAll("g.datapoint")
    .data(sortedData, function(d) {return d.name})
    .transition()
    .duration(1000)
    .attr("transform", function(d,i) {
      return "translate("+((Math.floor(i/6) +.5) *
			   cellWidth)+","+((i%6 + .5)*cellHeight)+")"
    });

  d3.selectAll("g.datapoint").select("path")
    .on("mouseover", null)
    .each(function(d) {
      // 기호를 더 크게 만든다.
      var houseSymbol = d3.svg.symbol()
     	                  .type(typeShape[d.type]).size(512);
      d3.select(this).transition().duration(1000).attr("d", houseSymbol);
    });

  // 스케일을 변경해 둘 다 화면 너비에 연결되게 만든다.
  xScale.range([40,screenWidth-40]);
  xAxis.orient("bottom").scale(xScale);
  yScale.range([40,screenWidth-40])
  yAxis.orient("bottom").scale(yScale);

  var sizeBrush = d3.svg.brush()
                    .x(xScale)
                    .extent(sizeExtent)
                    .on("brush", brushed);

  // 수치형 속성에 사용할 브러시를 만든다.
  var valueBrush = d3.svg.brush()
                     .x(yScale)
                     .extent(valueExtent)
                     .on("brush", brushed);

  d3.select("#xAxisG")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0",+(screenHeight - 150)+")")
    .call(xAxis);

  // 축을 새로 만든 브러시에 할당한다.
  d3.select("#yAxisG")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0,"+(screenHeight - 50)+")")
    .call(yAxis);

  d3.select("#xAxisG").append("g")
    .attr("class", "brushG")
    .attr("transform", "translate(0,-80)")
    .call(sizeBrush)
    .insert("text", "rect")
    .attr("class", "brushLabel")
    .attr("y", 50)
    .attr("x", screenWidth / 2)
    .text("Square Footage");

  // 브러시를 생성하고 레이블을 붙인다.
  d3.select("#yAxisG").append("g")
    .attr("class", "brushG")
    .attr("transform", "translate(0,-80)")
    .call(valueBrush).insert("text", "rect")
    .attr("class", "brushLabel")
    .attr("y", 50)
    .attr("x", screenWidth / 2)
    .text("Home Value");

  // 브러시 손잡이
  d3.selectAll(".brushG").selectAll("rect").attr("height", 80);
  d3.selectAll(".brushG").selectAll(".resize")
    .append("circle").attr("r", 40).attr("cy", 40);
};
