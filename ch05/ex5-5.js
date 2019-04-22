// 리스트 5.5 스택 레이아웃의 예

d3.csv("movies.csv", function(error,data) {dataViz(data)});

function dataViz(incData) {
  expData = incData;
  stackData = [];

  var xScale = d3.scale.linear().domain([0, 10]).range([0, 500]);
  var yScale = d3.scale.linear().domain([0, 100]).range([500, 0]);

  var movieColors = d3.scale
    .category10(["movie1","movie2","movie3","movie4","movie5","movie6"]);

  var stackArea = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return xScale(d.x); })
    .y0(function(d) { return yScale(d.y0); })
    .y1(function(d) { return yScale(d.y0 + d.y); });
  for (x in incData[0]) {
    // day 열은 지나친다. 이 열은 x값으로 사용할 날짜이기 때문이다.
    if (x != "day") {
      // 각 영화마다 빈 배열을 가진 객체를 만들어 values라는 속성에 저장한다.
      var newMovieObject = {name: x, values: []};
      for (y in incData) {
	// 날짜에 해당하는 x 좌표와 그날 영화가 벌어들인 수익에 해당하는 y좌표를 담은
	// 객체들을 values 배열에 넣는다.
	newMovieObject.values.push({
	  x: parseInt(incData[y]["day"]),
	  y: parseInt(incData[y][x])
	});
      };
      stackData.push(newMOvieObject);
    };
  };

  stackLayout = d3.layout.stack()
    .offset("silhouette")
    .order("inside-out")
    .values(function(d) { return d.values; });

  d3.select("svg").selectAll("path")
    .data(stackLayout(stackData))
    .enter().append("path")
    .style("fill", function(d) {return movieColors(d.name);})
    .attr("d", function(d) { return stackArea(d.values); });
};
