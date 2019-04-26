// 리스트 10.7 resizeGrid1() 함수

// 크기를 작게 변경하고, 레이아웃을 다시 적용해 화면을 갱신한다.
function resizeGrid1() {
  grid.size([200,200]);
  grid(doubledArray);

  d3.select("g").selectAll("circle")
    .transition()
    .duration(1000)
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    .each("end", resizeGrid2);
};

// 다른 크기로 한 번 더 실행한다.
function resizeGrid2() {
  grid.size([200,400]);
  grid(doubledArray);

  d3.select("g").selectAll("circle")
    .transition()
    .duration(1000)
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;});
};
