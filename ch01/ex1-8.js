// 리스트 1.8 속성과 이벤트 리스너를 설정하려 d3.select 사용하기

d3.select("div")
  .style("background-color", "pink")
  .style("font-size", "24px")
  .attr("id", "newDiv")
  .attr("class", "d3div")
  .on("click", function() {console.log("You clicked a div")});
