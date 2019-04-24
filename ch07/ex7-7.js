// 리스트 7.7 몰바이데 투영법으로 만든 세계 지도

queue()
  .defer(d3.json, "world.geojson")
  .defer(d3.csv, "cities.csv")
  .await(function(error, file1, file2) {
    createMap(file1, file2);
  });

function createMap(countries, cities) {
  var width = 500;
  var height = 500;
  // 몰바이데 도법에 맞춰 전 세계를 보여준다.
  var projection = d3.geo.mollweide()
                     .scale(120)
                     .translate([width / 2, height / 2]);
  var geoPath = d3.geo.path().projection(projection);
  var featureSize = d3.extent(countries,featureSize,
			      function(d) {return geoPath.area(d);});

  // 지형을 측정해 색상 그레이디언트에 정의된 색상을 할당한다.
  var countryColor = d3.scale.quantize()
                       .domain(featureSize)
                       .range(colorbrewer.Reds[7]);

  d3.select("svg").selectAll("path").data(countries,features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "countries")
    // 면적에 따라 나라의 색상을 칠한다.
    .style("fill", function(d) {
      return countryColor(geoPath.area(d))
    });

  d3.select("svg").selectAll("circle").data(cities)
    .enter()
    .append("circle")
    .attr("class", "cities")
    .attr("r", 3)
    .attr("cx", function(d) {return projection([d.x,d.y])[0]})
    .attr("cy", function(d) {return projection([d.x,d.y])[1]});
};
