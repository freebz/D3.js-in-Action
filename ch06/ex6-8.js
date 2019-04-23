// 리스트 6.8 마커 정의와 응용

// 마커는 기본 설정을 부모의 스트로크 넓이에서 상속받으므로,
// 여기에서는 알아보기 어려운 마커가 된다.
var marker = d3.select("svg").append('defs')
  .append('marker')
  .attr("id", "Triangle")
  .attr("refx", 12)
  .attr("refY", 6)
  .attr("markerUnits", 'userSpaceOnUse')
  .attr("markerWidth", 12)
  .attr("markerHeight", 18)
  .attr("orient", 'auto')
  .append('path')
  .attr("d", 'M 0 0 12 6 0 12 3 6');

// marker-end, marker-start, marker-mid 속성 중 하나를 마커로 설정해 선에 할당한다.
d3.selectAll("line").attr("marker-end", "url(#Triangle)");
