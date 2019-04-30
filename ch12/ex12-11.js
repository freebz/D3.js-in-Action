// 리스트 12.11 상호작용성 통합

// 세 가지 제스처를 모두 처리해야 하므로
// 변환 데이터와 초기 터치 위치를 모두 저장한다.
var initialD = [];
var initialTransform;

d3.select("svg").on("touchstart", touchBegin);
d3.select("svg").on("touchend", touchBegin);
d3.select("svg").on("touchmove", touchUpdate);

var graphicsG = d3.select("svg").append("g").attr("id", "graphics");

// 무작위로 위치시킨 데이터점 10개
var sampleData = d3.range(10).map(function(d) {
  var datapoint = {};
  datapoint.id = "Sample " + d;
  datapoint.x = Math.random() * 500;
  datapoint.y = Math.random() * 500;
  return datapoint;
})

var samples = graphicsG.selectAll("g")
                       .data(sampleData)
                       .enter()
                       .append("g")
                       .attr("transform", function(d)
			     {return "translate("+d.x+","+d.y+")"});

var sampleSubG = samples.append("g").attr("class", "sample");

// 각기 정사각형과 데이블로 표현한다.
sampleSubG.append("rect")
          .attr("width", 100).attr("height", 100)
          .style("fill", "red").style("stroke", "gray")
          .style("stroke-width", "1px");

sampleSubG.append("text").text(function (d) {return d.id}).attr("y", 20);
