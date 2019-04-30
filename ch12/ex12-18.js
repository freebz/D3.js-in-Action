// 리스트 12.18 태블릿 브러시 함수

function brushed() {
  d3.selectAll("g.datapoint").each(function(d) {
    var color = locationScale(d.location);
    if (
      d.value < valueBrush.extent()[0] || d.value > valueBrush.extent()[1] ||
      d.size < sizeBrush.extent()[0] || d.size > sizeBrush.extent()[1]
    ) {
      // 데이터점이 두 브러시의 범위 안에 들어가지 않으면 회색으로 칠한다.
      color = "lightgray";
    }
    d3.select(this).select("path").style("fill", color);
  })
}
