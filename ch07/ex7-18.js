// 리스트 7.18 대화형으로 이웃을 찾아내고 강조하기

// 배열 인덱스로 이웃을 표현하고, 이웃 목록을 담은 배열을 생성한다.
var neighbors =
  topojson.neighbors(topoCountries.objects.countries.geometries);

d3.selectAll("path.countries")
  .on("mouseover", findNeighbors)
  .on("mouseout", clearNeighbors);

function findNeighbors (d,i) {
  // 마우스 포인터가 올라가 있는 나라의 색상을 빨간색으로 바꾼다.
  d3.select(this).style("fill", "red");
  // 모든 이웃을 녹색으로 바꾼다.
  d3.selectAll("path.countries")
    .filter(function (p,q) {return neighbors[i].indexOf(q) > -1})
    .style("fill", "green")
};

function clearNeighbors () {
  // 나라를 모두 회색으로 변경해 강조 효과를 제거한다.
  d3.selectAll("path.countries").style("fill", "gray");
};
