// 리스트 12.3 터치 이벤트를 목록에 저장

// <li> 요소를 저장할 목록을 만든다.
d3.select("#vizcontainer")
  .append("div")
  .attr("id", "touchStatus")
  .append("p")
  .html("Touch Status:")
  .append("ol");

// 터치가 시작될 때와 터치가 이동하는 순간마다 touchStatus() 함수를 실행한다.
d3.select("svg").on("touchstart", touchStatus);
d3.select("svg").on("thouchmove", touchStatus);

function touchStatus() {
  d3.event.preventDefault();
  // 브라우저가 터치를 클릭으로 처리하지 못하도록 이벤트를 가로채고 전달하지 않는다.
  d3.event.stopPropagation();
  d = d3.touches(this);
  // 배여렝 추가된 터치를 목록에 추가한다.
  d3.select("#touchStatus")
    .select("od")
    .selectAll("li")
    .data(d)
    .enter()
    .append("li");

  // 배열에서 제거된 터치를 목록에서 제거한다.
  d3.select("#touchStatus")
    .select("ol")
    .selectAll("li")
    .data(d)
    .exit()
    .remove();

  // 텍스트를 터치 이벤트가 발생한 위치의 XY 좌표와 이벤트 종류로 갱신한다.
  d3.select("#touchStatus")
    .select("ol")
    .selectAll("li")
    .html(function(d) {return d3.event.type + d;});
};
