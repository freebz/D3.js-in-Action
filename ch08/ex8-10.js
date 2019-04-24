// 리스트 8.10 한 줄에 그림이 여덟 개 있는 갤러리의 크기 변경

// 한 행에 출력할 그림 수를 어떤 숫자로 변경하더라도 자동으로 그림 크기를 조정한다.
imgPerLine = 8;

// 이제는 필요 없으므로 <canvas> 요소를 제거한다.
d3.select("canvas").remove();
d3.select("#traditional")
  .append("div").attr("class", "gallery")
  .selectAll("img").data(imageArray).enter().append("img")
  .attr("class", "infinite")
  .attr("src", function(d) {return d.data;});

// 화면 갱신을 쉽게 하려 코드를 별도의 함수에 넣는다.
redrawGallery();

function redrawGallery() {
  // 부모 <div> 요소의 너비에 기초한 크기
  var newWidth = parseFloat(d3.select("div.gallery")
			    .node().clientWidth);
  var imageSize = newWidth / imgPerLine;

  // 사용자 정의 접근자 메서드에 기초한 x와 y값
  function imgX(x) {
    return Math.floor(x / imgPerLine) * imageSize;
  };
  function imgY(x) {
    return Math.floor(x%imgPerLine * imageSize);
  };

  d3.selectAll("img")
    .style("width", newWidth / imgPerLine)
    .style("top", function(d) {return imgX(d.x)})
    .style("left", function(d) {return imgY(d.x)})
};

// 페이지의 크기를 변경할 때마다 갤러리의 크기를 변경한다.
window.onresize = function(event) {
  redrawGallery();
};
