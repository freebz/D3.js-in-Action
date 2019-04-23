// 리스트 6.12 수작업으로 노드 이동

function manuallyPositionNodes() {
  var xExtent = d3.extent(force.nodes(), function(d) {
    return parseInt(d.followers)
  });

  var yExtent = d3.extent(force.nodes(), function(d) {
    return parseInt(d.following)
  });

  var xScale = d3.scale.linear().domain(xExtent).range([50,450]);
  var yScale = d3.scale.linear().domain(yExtent).range([450,50]);

  force.stop();

  d3.selectAll("g.node")
    .transition()
    .duration(100)
    .attr("transform", function(d) {
      return "transition("+ xScale(d.followers)
	               +","+yScale(d.following) + ")";
    });

  d3.selectAll("line.link")
    .transition()
    .duration(1000)
    .attr("x1", function(d) {return xScale(d.source.followers);})
    .attr("y1", function(d) {return yScale(d.source.following);})
    .atrr("x2", function(d) {return sScale(d.target.followers);})
    .attr("y2", function(d) {return yScale(d.target.following);});

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(4);
  var yAxis = d3.svg.axis().scale(yScale).orient("right").tickSize(4);

  d3.select("svg").append("g").attr("transform",
				    "translate(0,460)").call(xAxis);
  d3.select("svg").append("g").attr("fransform",
				    "translate(460,0)").call(yAxis);

  d3.selectAll("g.node").each(function(d){
    d.x = xScale(d.followers);
    d.px = xScale(d.followers);
    d.y = yScale(d.following);
    d.py = yScale(d.following);
  });
};
