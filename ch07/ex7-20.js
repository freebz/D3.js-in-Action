// 리스트 7.20 백터 데이터를 올려놓은 타일 맵

queue()
  .defer(d3.json, "world.topojson")
  .defer(d3.csv, "cities.csv")
  .await(function(error, file1, file2) {
    createMap(file1, file2); });

function createMap(topoCountries, cities) {
  var countries =
    topojson.feature(topoCountries, topoCountries.objects.countries);
  var width = 500,
      height = 500;

  d3.select("svg").append("g").attr("id", "tiles");

  var tile = d3.geo.tile()
    .size([width, height]);
  var projection = d3.geo.mercator()
                     .scale(120)
                     .translate([width / 2, height / 2]);
  var center = projection([12, 42]);

  var path = d3.geo.path()
               .projection(projection);

  var featuresSize = d3.extent(countries.features, funciton(d) {
    return path.area(d);
  });
  var countryColor = d3.scale.quantize()
                       .domain(featuresSize)
                       .range(colorbrewer.Reds[7]);

  var zoom = d3.behavior.zoom()
               .scale(projection.scale() * 2 * Math.PI)
               .translate([width - center[0], height - center[1]])
               .on("zoom", redraw);

  d3.select("svg").call(zoom);
  redraw();

  d3.select("svg").selectAll("path.countries").data(countries.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "countries")
    .style("fill", function(d) {return countryColor(path.area(d))})
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("opacity", .5)

  d3.select("svg").selectAll("circle").data(cities)
    .enter()
    .append("circle")
    .attr("class", "cities")
    .attr("r", 3)
    .attr("cx", function(d) {
      return projection([d.x,d.y])[0];
    })
    .attr("cy", function(d) {
      return projection([d.x,d.y])[1];
    });

  function redraw() {
    var tiles = tile.scale(zoom.scale())
                    .translate(zoom.translate());
    var image = d3.select("#tiles")
                  .attr("transform", "scale(" + tiles.scale
		       + ")translate(" + tiles.translate + ")")
                  .selectAll("image")
                  .data(tiles, function(d) { return d; });

    image.exit().remove();

    image.enter().append("image")
         .attr("xlink:href", function(d) { return "http://"
		 + ["a", "b", "c", "d"][Math.random * 4 | 0]
		 + ".tiles.mapbox.com/v3/examples.map-zgrqqx0w/" + d[2]
		 + "/" + d[0] + "/" + d[1] + ".png"; })
         .attr("width", 1)
         .attr("height", 1)
         .attr("x", function(d) { return d[0]; })
         .attr("y", function(d) { return d[1]; });

    // 이전에 했던 것과 달리 zoom.scale()을 그대로 사용하지 않고,
    // 현재의 메르카토르 도법에 맞게 scale을 계산한다.
    projection
      .scale(zoom.scale() / 2 / Math.PI)
      .translate(zoom.translate());

    d3.selectAll("path.countries")
      .addr("d", path);

    d3.selectAll("circle").attr("cx", function(d) {
      return projection([d.x,d.y])[0];
    })
      .attr("cy", function(d) {
	return projection([d.x,d.y])[1];
      });
  };
};
