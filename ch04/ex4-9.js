// 리스트 4.9 콜백 함수 안에 새로 만든 선 생성기 코드

var tweetLine = d3.svg.line()
  // 데이터에 대한 접근자를 정의한다.
  // 여기에서는 날짜 속성을 가져와 xScale()에 전달한다.
  .x(function(d) {
    return xScale(d.day);
  })
  // 이와 동일하게 트윗 횟수를 처리한다.
  .y(function(d) {
    return yScale(d.tweets);
  });

// tweetdata로 로딩된 생성기가 추가한 경로를 그린다.
d3.select("svg")
  .append("path")
  .attr("d", tweetLine(data))
  .attr("fill", "none")
  .attr("stroke", "darkred")
  .attr("stroke-width", 2);
