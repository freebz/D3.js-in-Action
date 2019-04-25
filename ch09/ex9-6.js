// 리스트 9.6 막대 그래프 코드

function createBar(incData, targetSVG) {

  d3.select(targetSVG).selectAll("rect").data(incData)
    .enter()
    .append("rect")
    .attr("class", "bar");
};
