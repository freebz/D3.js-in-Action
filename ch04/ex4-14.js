// 리스트 4.14 누적 영역을 그리기 위한 콜백 함수

// 영화 6편에 해당하는 색상 그레이디언트를 만든다.
var fillScale = d3.sclae.linear()
                  .domain([0,5])
                  .range("lightgray","black"]);
// for 루프를 한 번 돌 때마다 영화 하나를 처리하며,
// n을 증가시켜서 해당 색상 그레이디언트를 사용한다.
// 서수(ordinal) 스케일을 만들어 각 영화에 색상을 할당할 수도 있다.
var n = 0;
for (x in data[0]) {
  // 각 객체의 "day"값은 x 좌표로 제공하므로, "day"값에는 선을 그리지 않는다.
  if (x != "day") {
    // d3.svg.area() 생성기는 "day"값을 x 자표로 사용하지만,
    // 해당 객체까지 누적된 값을 y 좌표로 사용한다.
    var movieArea = d3.svg.area()
                      .x(function(d) {
			  return xScale(d.day)
		      })
                      .y(function(d) {
			  return yScale(simpleStacking(d,x))
		      })
                      .y0(function(d) {
			  return yScale(simpleStacking(d,x) - d[x]);
		      })
                      .interpolate("basis")

    // 현재의 생성기로 경로를 그린다.
    // "day"를 제외한 속성마다 하나씩 만들어진다.
    // 영역을 그릴 속성에 기초해 고유한 ID를 부여하고,
    // 앞에서 만든 색상 그레이디언트에 기초해 영역을 채운다.
    d3.select("svg")
      .append("path")
      .style("id", x + "Area")
      .attr("d", movieArea(data))
      .attr("fill", fillScale(n))
      .attr("stroke", "none")
      .attr("stroke-width", 2)
      .style("opacity", .5);

    // 루프를 마치고, 객체에 있는 다음 속성으로 넘어가고,
    // n을 다음 영역의 색상으로 설정한다.
    n++;
  };
};

// 이 함수는 바인딩된 데이터(해당 날짜의 영화별 매출액)와
// 속성명(영화 제목)을 인자로 받아,
// 데이터에 루프를 반복해 현재 속성까지의 합계를 구한다.
// 결국 처음 영화부터 우리가 지정한 영화까지의 매출액 합계를 구하는 것이다.
function simpleStacking(incomingData, incomingAttribute) {
  var newHeight = 0;
  for (x in incomingData) {
    if (x != "day") {
      newHeight += parseInt(incomingData[x]);
      if (x == incomingAttribute) {
	break;
      }
    }
  }
  return newHeight;
};
