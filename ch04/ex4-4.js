// 리스트 4.4 초기 박스 플롯 코드

d3.select("svg").selectAll("g.box")
  .data(data).enter()
  .append("g")
  .attr("class", "box")
  .attr("transform", function(d) {
    return "translate(" + xScale(d.day) + "," + yScale(d.median) + ")";
  }).each(function(d,i) {
    // each() 메서드 안에 있으므로
    // this로 여기에 새로운 자식 요소를 추가한다.
    d3.select(this)
      .append("rect")
      .attr("width", 20)
      // each() 메서드에 전달한 익명 함수에 d와 i 인자가 선언돼 있으므로,
      // d 인자로 원래 요소에 바인딩된 데이터에 접근한다.
      .attr("height", yScale(d.q1) - yScale(d.q3));
  });
