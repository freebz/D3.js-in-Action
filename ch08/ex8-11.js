// 리스트 8.11 mouseover할 때 그림 확대

function highlightImage(d) {
  var newWidth = parseFloat(d3.select("div.gallery")
			    .node().clientWidth);
  // 이 함수 안에서는 width에 접근할 수 없으므로,
  // 너비를 다시 계산해야 한다.
  var imageSize = newWidth / 8;
  d3.select(this).transition().duration(500)
    .style("width", imageSize * 2)
    .style("background", "rgba(255,255,255,1)")
    .style("border-color", "rgba(0,0,0,1)");

  // 주변 그림보다 앞에 그려야 하므로, 그림을 DOM의 위쪽으로 이동한다.
  this.parentNode.appendChild(this)
};

function deghiglightImage(d) {
  var newWidth = parseFloat(d3.select("div.gallery")
			    .node().clientWidth);
  var imageSize = newWidth / 8;
  // 그림 크기가 작아질 때는 주변 그림과 겹치지 않으므로
  // DOM의 원래 위치로 다시 이동시킬 필요가 없다.
  d3.select(this).transition().duration(500)
    .style("width", imageSize)
    .style("background", "rgba(255,255,255,0)")
    .style("border-color", "rgba(0,0,0,0)");
};

d3.selectAll("img")
  .on("mouseover", highlightImage)
  .on("mouseout", deghiglightImage);
