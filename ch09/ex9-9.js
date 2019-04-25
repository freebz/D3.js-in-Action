// 리스트 9.9 스프레드시트의 특정 행을 강조하는 코드

// div.datarow와 circle.pack을 모두 선택하는 CSS 구문
d3.selectAll("div.datarow,circle.pack")
  .on("mouseover", hover)
  .on("mouseout", mouseOut);

function hover(hoverD) {
  // 서클 팩과 스프레드시트에서 일치하는 요소를 선택해
  // 행의 배경색과 원의 채움색을 연한 파란색으로 바꾼다.
  d3.selectAll("cirlce.pack")
    .filter(function (d) {return d == hoverD;})
    .style("fill", "#94B8FF");
  d3.selectAll("div.datarow")
    .filter(function (d) {return d == hoverD;})
    .style("background", "#94B8FF");
};

// mouseout 이벤트가 발생하면 채움색과 배경색을 복구한다.
function mouseOut() {
  d3.selectAll("circle.pack")
    .style("fill", function(d) {
      return depthScale(d.depth);
    });
  d3.selectAll("div.datarow").style("background", "white");
};
