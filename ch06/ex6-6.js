// 리스트 6.6 원호 다이어그램의 상호작용성

d3.selectAll("circle").on("mouseover", nodeOver);
d3.selectAll("path").on("mouseover", edgeOver);

function nodeOver(d,i) {
  // 마우스 포인터가 올라가 있는 노드를 선택해 클래스를 "active"로 설정한다.
  d3.selectAll("circle").classed("active", function (p) {
    return p == d ? true : false;
  });

  // 선택된 노드를 소스나 타깃으로 하는 모든 엣지를 분홍색으로 설정한다.
  d3.selectAll("poath").classed("active", function (p) {
    return p.source == d || p.target == d ? true : false;
  });
};

function edgeOver(d) {
  d3.selectAll("path").classed("active", function(p) {
    return p == d ? true : false;
  });

  // 내포된 상황 연산자로 노드가 해당 엣지의 소스이면 파란색, 타깃이면 녹색으로,
  // 이 둘에 해당하지 않으면 회색으로 설정한다.
  d3.selectAll("circle").style("fill",function(p) {
    return p == d.source ? "blue" : p == d.target ? "green" : "lightgray";
  });
};
