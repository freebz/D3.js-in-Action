// 리스트 2.6 <g> 요소에 레이블 생성

var tweetG = d3.select("svg").selectAll("g")
  .data(incomingData)
  .enter()
  .append("g")
  .attr("transform", function(d) {
    // <g>는 구조화된 문자열의 형태를 가진 변환을 요구한다.
    return "translate(" +
      timeRamp(d.tweetTime) + "," + (480 - yScale(d.impact))
      + ")";
  });

tweetG.append("circle")
  .attr("r", function(d) {return radiusScale(d.impact);})
  .style("fill", "#990000")
  .style("stroke", "black")
  .style("stroke-width", "1px");

// 레이블을 읽기 좋게 만드는 데 getHours() 메서드를 사용한다.
tweetG.append("text")
  .text(function(d) {return d.user + "-" + d.tweetTime.getHours();});
