// 리스트 4.6 tickValues()로 축 추가

var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  // tickSize()를 음수로 호출하면 선을 축의 위로 그린다.
  // axis()를 호출할 때 같은 값으로 위치를 조정해야 한다.
  .tickSize(-470)
  // tickValues() 메서드로 구체적인 값을 설정하면
  // 이 값에 해당하는 값들만 축에 표시한다.
  // 기본적으로 생성된 눈금을 사용하지 않을 때 유용하다.
  .tickValues([1,2,3,4,5,6,7]);

// 음수로 설정한 tickSize()에 맞춰 축을 설정한다.
d3.select("svg").append("g")
  .attr("transform", "translate(0,470)")
  .attr("id", "xAxisG").call(xAxis);

// 사용자의 주의를 혼란스럽게 만들 수 있으므로 가장자리 눈금을 감춘다.
d3.select("#xAxisG > path.domain").style("display", "none");
