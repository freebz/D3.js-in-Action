// 리스트 9.10 내포된 데이터 요소 강조

function hover(hoverD) {
  d3.selectAll("circle").filter(function (d) {return d == hoverD})
    .style("fill", "#94B8FF");
  d3.selectAll("div.datarow").filter(function (d) {return d == hoverD})
    .style("backgound", "#94B8FF");
  d3.selectAll("rect.bar").filter(function(d) {
    return d.values.indexOf(hoverD) > -1;
  }).style("fill", "#94B8FF");
};
