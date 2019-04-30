// 리스트 12.9 핀치 확대를 처리하는 터치 함수들

function touchBegin() {
  d3.event.preventDefault();
  d3.event.stopPropagation();

  d = d3.touches(this);
  // 확대 동작을 처리하기 전에 손가락 터치가 두 개만 있는지 확인한다.
  if (d.length == 2) {
    // 피타고라스 정리
    initialLength =
      Math.sqrt(Math.abs(d[0][0] - d[1][0])
		+ Math.abs(d[0][1] - d[1][1]));
    // <g>의 현재 스케일을 저장한다.
    initialScale = d3.transform(d3.select("#graphics")
				.attr("transform")).scale[0];
  }
};

function touchStatus() {
  d3.event.preventDefault();
  d3.event.stopPropagation();
  d = d3.touches(this);

  visualizeTouches(d);

  if (d.length == 2) {
    // 한 번 더 피타고라스 정리를 사용한다.
    var currentLength = Math.sqrt(Math.abs(d[0][0] - d[1][0])
				  + Math.abs(d[0][1] - d[1][1]));
    // 초기 거리와 현재 거리의 비율을 바로 확대 비율로 사용한다.
    var zoom = currentLength / initialLength;
    // 초기 스케일에 현재 확대 비율을 곱해 새로운 스케일을 구한다.
    var newScale = zoom * initialScale;
    // 새로 구한 스케일을 적용한다.
    d3.select("#graphics").attr("transform", "scale(" + newScale + ")")
  }
};
