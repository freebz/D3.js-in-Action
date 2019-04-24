// 리스트 7.8 지리 데이터를 에워싸는 사각형 그리기

d3.selectAll("path.countries")
  .on("mouseover", centerBounds)
  .on("mouseout", clearCenterBounds);

function centerBounds(d,i) {
  // 연결된 도법에 기초해 결과를 내는 geo.path 함수들
  var thisBounds = geoPath.bounds(d);
  var thisCenter = geoPath.centroid(d);

  d3.select("svg")
    .append("rect")
    .attr("class", "bblox")
    // 경계 상자의 왼쪽 위와 오른쪽 아래 좌표를 담은 배열
    .attr("x", thisBounds[0][0])
    .attr("y", thisBounds[0][1])
    .attr("width", thisBounds[1][0] - thisBounds[0][0])
    .attr("height", thisBounds[1][1] - thisBounds[0][1])
    .style("fill", "none")
    .style("stroke-dasharray", "5 5")
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style("pointer-events", "none");

  d3.select("svg")
    .append("circle")
    .attr("class", "centroid")
    .style("fill", "red")
    .attr("r", 5)
    // 중심은 지형의 XY 좌표를 담은 배열이다.
    .attr("cx", thisCenter[0]).attr("cy", thisCenter[1])
    .style("pointer-events", "none");
};

// 지형 밖으로 마우스 포인터가 나가면 도형을 제거한다.
function clearCenterBounds() {
  d3.selectAll("circle.centroid").remove();
  d3.selectAll("rect.bbox").remove();
};
