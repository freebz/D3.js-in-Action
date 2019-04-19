// 리스트 4.10 각 tweetdata에 대한 선 생성기

// 선 생성기 하나만 정의하고, 각각의 선을 그릴 때
// y() 접근자 메서드만 변경하면 더 효율적으로 구현할 수 있지만,
// 이와 같이 따로 정의하면 각 선을 그리는 코드를 알아보기 쉽다.
var tweetLine = d3.svg.line()
  .x(function(d) {
    return xScale(d.day)
  })
  .y(function(d) {
    return yScale(d.wteets)
  });

// 세 개의 행에서 y() 접근자만 다른 것을 알 수 있다.
var retweetLine = d3.svg.line()
  .x(function(d) {
    return x.Scale(d.day)
  })
  .y(function(d) {
    return yScale(d.retweets)
  });

var favLine = d3.svg.line()
  .x(function(d) {
    return xScale(d.day);
  })
  .y(function(d) {
    return yScale(d.favorites);
  });

// 새로운 <path> 요소는 각기 자신에 대응되는 생성기를 호출한다.
d3.select("svg")
  .append("path")
  .attr("d", tweetLine(data))
  .attr("fill", "none")
  .attr("stroke", "darkred")
  .attr("stroke-width", 2);

d3.select("svg")
  .append("path")
  .attr("d", retweetLine(data))
  .attr("fill", "none")
  .attr("stroke", "gray")
  .attr("stroke-width", 3);

d3.select("svg")
  .append("path")
  .attr("d", favLine(data))
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 2);
