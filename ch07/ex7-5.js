// 리스트 7.5 scale과 translate 설정을 이용한 간단한 지도

function createMap(countries) {
  // SVG 영역의 크기를 변수로 정의해 시각화 코드 전체에서 참조한다.
  var width = 500;
  var height = 500;
  var aProjection = d3.geo.mercator()
                      // scale값은 도법에 따라 다르지만, 여기에서는 80이 제대로 작동한다.
                      .scale(80)
                      // 투영 중심을 그림 영역의 중심으로 옮긴다.
                      .translate([width / 2, height / 2]);
  var geoPath = d3.geo.path().projection(aProjection);

  d3.select("svg").selectAll("path").data(countries.features)
    .enter()
    .append("path")
    .attr("d", geoPath)
    .attr("class", "countries");
};
