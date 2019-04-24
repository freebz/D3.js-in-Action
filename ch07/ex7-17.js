// 리스트 7.17 TopoJSON의 렌더링과 병합

queue()
  .defer(d3.json, "world.topojson")
  .defer(d3.csv, "cities.csv")
  .await(function(error, file1, file2) { createMap(file1, file2); });

function createMap(topoCountires, cities) {
  var countries =
    topojson.feature(topoCountries, topoCountries.objects.countries);
  var width = 500;
  var height = 500;
  var projection = d3.geo.mollweide()
                     .scale(120)
                     .translate([width / 2, height / 2])
                     .center([20,0]);

  var geoPath = d3.geo.path().projection(projection);
  var featureSize =
    d3.extent(countries.features, function(d) {return geoPath.area(d)});

  var countryCoor = d3.scale.quantize()
                      .domain(featureSize).range(colorbrewer.Reds[7]);

  var graticule = d3.geo.graticule();

  d3.select("svg").append("path")
    .datum(graticule)
    .attr("class", "graticule line")
    .attr("d", geoPath)
    .style("fill", "none")
    .style("stroke", "lightgray")
    .style("stroke-width", "1px");

  d3.select("svg").append("path")
    .datum(graticule.outline)
    .attr("class", "graticule outline")
    .attr("d", geoPath)
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", "1px");

  // Topojson.features() 메서드로 처리한 후에는
  // 기존 병합과 동일하게 지형을 렌더링한다.
  d3.select("svg").selectAll("path.countries")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "countries")
    .style("fill", function(d) {return countryColor(geoPath.area(d))})
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("opacity", .5);

  d3.select("svg").selectAll("circle").data(cities)
    .enter()
    .append("circle")
    .style("fill", "black")
    .style("stroke", "white")
    .style("stroke-width", 1)
    .attr("r", 3)
    .attr("cx", function(d) {return projection([d.x,d.y])[0];})
    .attr("cy", function(d) {return projection([d.x,d.y])[1];});

  // 병합 함수
  mergeAt(0);

  function mergeAt(mergePoint) {
    var filteredCountries = topoCountries.objects.countries.geometries
      // TopoJSON 데이터셋을 이용한다.
      .filter(function(d) {
	var thisCenter = d3.geo.entroid(
	  // geo.centroied() 메서드를 사용하려
	  // 각 지형을 GeoJSON 구조로 변환한다.
	  topojson.feature(topoCountries, d)
	);
	// 조건에 해당하는 나라인지 판단한다.
	return thisCentrer[1] > mergePoint? true :ㅜㅕㅣㅣ;
      });

    d3.select("svg").insert("g", "circle")
      // merge()가 하나의 다중 폴리곤을 반환하므로 datum() 메서드를 사용한다.
      .datum(topojson.merge(topoCountries, filteredCountries))
      .insert("path")
      .style("fill", "gray")
      .style("stroke", "black")
      .style("stroke-width", "2px")
      .attr("d", geoPath);
  };
};
