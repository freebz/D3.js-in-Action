// 리스트 4.5 자식 요소 다섯 개를 그리는 박스 플롯의 each() 메서드

  ...
  .each(function(d,i) {
    // 최솟값에서 최댓값으로 선을 그린다.
    d3.select(this)
      .append("line")
      .attr("class", "range")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", yScale(d.max) - yScale(d.median))
      .attr("y2", yScale(d.min) - yScale(d.median))
      .style("stroke", "black")
      .style("stroke-width", "4px");

    // 최소-최대선의 꼭대기에 가로로 놓인 선
    d3.select(this)
      .append("line")
      .attr("class", "max")
      .attr("x1", -10)
      .attr("x2", 10)
      .attr("y1", yScale(d.max) - yScale(d.median))
      .attr("y2", yScale(d.max) - yScale(d.median))

    // 최소-최대선의 바닥에 가로로 놓인 선
    d3.select(this)
      .append("line")
      .attr("class", "min")
      .attr("x1", -10)
      .attr("x2", 10)
      .attr("y1", yScale(d.min) - yScale(d.median))
      .attr("y2", yScale(d.min) - yScale(d.median))
      .style("stroke", "black")
      .style("stroke-width", "4px");

    // 사각형의 중심이 중앙값에 놓이도록 위치를 조절한다.
    d3.select(this)
      .append("rect")
      .attr("class", "range")
      .attr("width", 20)
      .attr("x", -10)
      .attr("y", yScale(d.q3) - yScale(d.median))
      .attr("height", yScale(d.q1) - yScale(d.q3))
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", "2px");

    // 부모 요소인 <g> 요소의 중심이 중앙값에 놓여 있으므로,
    // 중앙값 선은 이동할 필요가 없다.
    d3.select(this)
      .append("line")
      .attr("x1", -10)
      .attr("x2", 10)
      .attr("y1", 0)
      .attr("y2", 0)
      .style("stroke", "darkgray")
      .style("stroke-width", "4px");

  });
