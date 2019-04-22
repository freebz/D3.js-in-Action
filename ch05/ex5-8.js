// 리스트 5.8 생키 다이어그램에 대한 시각화 레이아웃 함수

var numLayouts = 1;
d3.select("svg").on("click", moreLayouts);
// 레이아웃을 한 번만 전달해 생키 객체를 초기화한다.
sankey.layout(numLayouts);

function moreLayouts() {
  // 과정을 20번 거치도록 한다.
  // 클릭을 많이 안 해도 변화하는 것을 보여주기 때문이다.
  numLayouts += 20;
  sankey.layout(numLayouts);

  // 레이아웃이 데이터셋을 갱신하므로 그리는 함수를 다시 호출하기만 하면 된다.
  // 그러면 자동으로 차트가 갱신된다.
  d3.selectAll(".link")
    .transition()
    .duration(500)
    .attr("d", sankey.link())

  d3.selectAll(".node")
    .transition()
    .duration(500)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
}
