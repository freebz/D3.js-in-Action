// 리스트 8.12 셀렉션 안의 특정 그림 확대

function zoomTo() {
  // 선택한 그림 값을 가져온다.
  var selectValue = d3.select("select").node().value;
  var newWidth = parseFloat(d3.select("div.gallery")
			    .node().clientWidth);
  var imageSize = newWidth / 8;
  // 그림 위치를 계산한다.
  var scrollTarget = Math.floor(selectValue / 8) * imageSize;

  // mouseover의 경우와 마찬가지로 그림을 확대한다.
  d3.selectAll("img")
    .filter(function(d) { return d.x == selectValue; })
    .transition().duration(2000).style("width", imageSize * 2)
    .style("background", "rgba(255,255,255,1)")
    .style("border-colro", "rgba(0,0,0,1)");

  var selectedNode = d3.selectAll("img")
    .filter(function(d) {return d.x == selectValue}).node();

  // 그림을 DOM 내부에서 앞으로 가져온다.
  selectedNOde.parentNode.appendChild(selectedNode);

  // 트윈으로 <div>를 스크롤한다.
  d3.select("div.gallery").transition().duration(2000)
    .tween("scrollTween", scrollTopTween(scrollTarget));

  function scrollTopTween(scrollTo) {
    return function() {
      var i = d3.interpolateNumber(this.scrollTop, scrollTo);
      // 현재 scrollTop과 선택한 그림의 계산된 위치 사이에 올 때까지
      // <div>의 scrollTop 속성을 계속 갱신한다.
      return function(t) { this.scrollTop = i(t); };
    };
  };
};

d3.select("div.gallery").style("height", "50%")
  .style("overflow","scroll").style("border", "2px black solid");

d3.select("#tranditional").append("select")
  .on("change", zoomTo)
  .selectAll("option")
  .data(d3.selectAll("img").data()).enter()
  .append("option")
  .attr("value", function(d) {return d.x;})
  .html(function(d) {return "Image #" +d.x;});
