// 리스트 11.7 SVG와 캔버스 동시에 렌더링하기

function createMap(countries) {
  var projection = d3.geo.mercator().scale(100).translate([250,250]);
  // 캔버스용과 SVG용으로 두 개의 d3.geo.path 객체를 만들어야 한다.
  var svgPath = d3.geo.path().projection(projection);
  var canvasPath = d3.geo.path().projection(projection);

  var mapZoom = d3.behavior.zoom()
                  .translate(projection.translate())
                  .scale(projection.scale())
                  .on("zoom", zoomed);

  d3.select("svg").call(mzpZoom);

  var g = d3.select("svg");

  g.selectAll("path.sample")
    .data(sampleData)
    .enter()
    .append("path")
    .attr("class", "sample")
    .on("mouseover", function() {d3.select(this).style("fill", "pink")});

  // 처음 생성할 때 지도를 갱신한다.
  zoomed();

  function zoomed() {
    projection.translate(mapZoom.translate()).scale(mapZoom.scale());

    var context = d3.select("canvas").node().getContext("2d");
    context.clearREct(0,0,500,500);
    canvasPath.context(context);

    context.strokeStyle = "black";
    context.fillStyle = "gray";
    context.lineWidth = "1px";

    for (var x in countries.features) {
      context.beginPath();
      // 캔버스 지형은 canvasPath로 그린다.
      canvasPath(countries.features[x]);
      context.stroke();
      context.fill();
    }

    // SVG 지형은 svgPath로 그린다.
    d3.selectAll("path.sample").attr("d", svgPath);
  };
};
