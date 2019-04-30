// 리스트 12.14 데스크톱 앱

d3.json("realestate.json", function(data) {realEstate(data)});

function realEstate(data) {
  var svg = d3.select("svg");
  var svgNode = d3.select("svg").node();
  svg.style("width", "80%").style("float", "left");
  // 화면을 공유하는 데 <div> 요소를 생성하고 조정한다.
  d3.select("#vizcontainer").append("div").attr("id", "list");
  d3.select("#vizcontainer").append("div").attr("id", "popup");

  // 데이터에서 목록을 생성한다.
  d3.select("#list").append("ol").selectAll("li")
    .data(data).enter().append("li")
    .attr("class", "datapoint")
    .html(function(d) {return d.name})
    .on("mouseover", highlightDatapoint);

  var screenHeight = parseFloat(svgNode.clientHeight ||
				svgNode.parentNOde.clientHeight);

  var screenWidth = parseFloat(svgNode.clientWidth ||
			       svgNode.parentNode.clientWidth);

  var sizeExtent = d3.extent(data, function(d) {return d.size});
  var valueExtent = d3.extent(data, function(d) {return d.value});
  var xScale = d3.scale.linear()
                 .domain(sizeExtent).range([40,screenWidth-40]);
  // 스케일을 생성하는 데 화면 크기와 수치형 속성의 범위를 계산한다.
  var yScale = d3.scale.linear()
                 .domain(valueExtent).range([screenHeight-40,40]);

  // 모든 데이터점에 대해 <g> 요소를 생성한다.
  svg.append("g").attr("id", "dataG")
     .selectAll("g.datapoint")
     .data(data, function(d) {return d.name}).enter()
     .append("g").attr("class", "datapoint");

  // 위치를 나타내는 색상 코드
  var locationScale = d3.scale.ordinal()
                        .domain(["Rural","Coastal","Suburb","City"])
                        .range(colorbrewer.Reds[4]);

  // 유형을 나타내는 기호
  var typeShape = {"Spanish": "circle", "Craftsman":"cross", "Ranch":"square",
		   "McMansion": "triangle-down"};

  // 각 <g> 안에 기호를 생성한다.
  dataG = d3.selectAll("g.datapoint")
            .attr("transform", function(d) {
	      return "translate(" + xScale(d.size) + "," + yScale(d.value) + ")";
	    })
            .each(function(d) {
	      houseSymbol = d3.svg.symbol().type(typeShape[d.type]).size(64);
	      d3.select(this).append("path")
		.attr("d", houseSymbol)
		.style("fill", locationScale(d.location))
		.style("stroke", "black")
		.style("stroke-width", "1px")
		.on("mouseover", highlightDatapoint);
	    });

  var xAxis = d3.svg.axis().scale(xScale).orient("top").tickSize(4);
  var yAxis = d3.svg.axis().scale(yScale).orient("right").tickSize(4);

  svg.append("g")
     .attr("id", "xAxisG").attr("class", "axis")
     .attr("transform", "translate(0,"+(screenHeight - 20)+")")
     .call(xAxis);

  // 축을 생성한다.
  svg.append("g")
     .attr("id", "yAxisG").attr("class", "axis")
     .attr("transform", "translate(20,0)")
    .call(yAxis);
};
