// 리스트 10.12 간단한 컴포넌트

d3.svg.legend = function() {

  // 컴포넌트가 call() 함수로 호출돼 셀렉션을 받는다.
  function legend(gSelection) {
    var testData = [1,2,3,4,5];

    // 그 셀렉션에 사각형을 추가한다.
    gSelection.selectAll("rect")
              .data(testData)
              .enter()
              .append("rect")
              .attr("height", 20)
              .attr("width", 20)
              .attr("x", function (di,i) {return i *25})
              .style("Fill", "red")
    return this;
  }

  return legend;
};
