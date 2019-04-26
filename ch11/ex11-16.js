// 리스트 11.16 쿼드트리 최적화한 XY 브러시 셀렉션

function brushed() {
  var e = brush.extent();
  
  // 모든 원을 분홍색으로 설정하고,
  // 셀렉션에 포함됐는지 여부를 지정하는 selected 속성을 추가한다.
  d3.selectAll("circle")
    .style("fill", "pink")
    .each(function(d) {d.selected = false})

  // visit() 메서드를 호출한다.
  quadIndex.visit(function(node,x1,y1,x2,y2) {
    // 각 노드가 점인지 컨테이너인지 검사한다.
    if (node.point) {
      // 각 점이 브러시 범위 안에 있으면 selected 속성을 true로 설정한다.
      if (node.point.x >= e[0][0] && node.point.x <= e[1][0]
	  && node.point.y >= e[0][1] && node.point.y <= e[1][1]) {
	node.point.selected = true;
      }
    }
    // 해당 영역이 셀렉션 범위 바깥에 있는지 검사한다.
    return x1 > e[1][0] || y1 > e[1][1] || x2 < e[0][0] || y2 < e[0][1];
  })

  // 어느 점이 선택됐는지 보여준다.
  d3.selectAll("circle")
    .filter(function(d) {
      return d.selected;
    })
    .style("fill", "darkred");
};
