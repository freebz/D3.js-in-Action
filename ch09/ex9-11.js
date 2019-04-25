// 리스트 9.11 개선된 강조 함수

d3.selectAll("div.datarow,circle.pack,rect.bar")
  .on("mouseover", hover)
  .on("mouseout", mouseOut);

function hover(hoverD) {
  // mouseover 이벤트를 받은 요소가 모두 values 배열을 가진 것은 아니므로,
  // values가 null일 때는 빈 배열을 만들어 indexOf() 함수가 실행될 수 있게 만든다.
  var nestArray = hoverD.values || [];
  d3.selectAll("circle.pack")
    .filter(function (d) {return d == hoverD;})
    .style("fill", "#94B8FF");

  // 같은 데이터점을 공유하거나 자신의 values 배열 안에 가진 모든 사각형을 강조한다.
  d3.selectAll("rect.bar")
    .filter(function (d) {
      return d == hoverD || d.values.indexOf(hoverD) > -1;
    })
    .style("fill", "#94B8FF");

  // 같은 데이터점을 공유하거나 호출된 데이터의 values 안에 들어 있는 모든 행을 강조한다.
  d3.selectAll("div.datarow")
    .filter(function (d) {
      return d == hoverD || nestArray.indexOf(d) > -1;
    })
    .style("background", "#94B8FF");
};

function mouseOut() {
  d3.selectAll("circle")
    .style("fill", function(d) {return depthScale(d.depth)});

  d3.selectAll("rect").style("fill", "gray").style("stroke-width", 0);
  d3.selectAll("div.datarow").style("backgound", "white");
};
