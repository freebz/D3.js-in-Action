// 리스트 7.19 타일 맵

var width = 500,
    height = 500;

// 해당 지형에 사용할 타일을 보관하는 그룹
d3.select("svg").append("g").attr("id", "tiles");

// 타일을 생성하는 데 사용하는 함수
var tile = d3.geo.tile()
             .size([width, height]);
var projection = d3.geo.mercator()
                   .scale(120)
                   .translate([width / 2, height / 2]);
var center = projection([12, 42]);
var path = d3.geo.path()
  .projection(projection);
var zoom = d3.behavior.zoom()
             .scale(projection.scale() * 2 * Math.PI)
             .translate([width - center[0], height - center[1]])
             .on("zoom", redraw);

d3.select("svg").call(zoom);
redraw();

function redraw() {
  // 이미지를 생성하는 데 사용하는 데이터셋
  var tiles = tile
                .scale(zoom.scale())
                .translate(zoom.translate())();
  var image = d3.select("#title")
                // 현재 확대 수준에 기초해 변환을 설정한다.
               .attr("transform",
         	  "scale(" + tiles.scale + ") translate("
		  + tiles.translate + ")")
               .selectAll("image")
               // 타일 데이터를 svg:image 요소에 바인딩한다.
               .data(tiles, function(d) { return d; });

  // 화면 밖으로 나간 것을 모두 제거한다.
  image.exit().remove();

  // 새로운 이미지를 추가한다.
  image.enter().append("image")
    // tile.js가 생성한 Mapbox 타일에 대한 경로
    .attr("xlink:href",
        function(d) { return "http://" +
	    ["a", "b", "c", "d"][Math.random() * 4 | 0] +
	    ".tiles.mapbox.com/v3/examples.map-zgrqqx0w/" +
	    d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", function(d) { return d[0]; })
    .attr("y", function(d) { return d[1]; });
};
