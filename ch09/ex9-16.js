// 리스트 9.16 타임라인 위의 트윗

// 데이터를 다른 곳에 보낸 상태라 하더라도, 그 데이터를 사용할 수 있다.
var tweets = d3.selectAll("div.datarow").data();

d3.select("#brushG")
  .selectAll("circle.timeline")
  .data(tweets)
  .enter()
  .append("circle")
  .style("fill","red").style("stroke", "black")
  .style("stroke-width", "1px")
  // 원이 브러시의 상호작용을 방해하지 않게 한다.
  .style("pointer-events","none")
  .attr("class","timeline").attr("r", 5).attr("cy", 25)
  // 시간 스케일로 조정한 위치에 원을 위치시킨다.
  .attr("cx", function(d) {return timeScale(new Date(d.timestamp))})
