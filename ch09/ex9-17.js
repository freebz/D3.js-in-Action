// 리스트 9.17 컴포넌트 다시 그리기

// 화면 공간을 바탕으로 축에 표시할 눈금의 개수를 동적으로 판단해야 한다.
var timeTickScale = d3.scale.linear()
                      .domain([0,1000])
                      .rangeRound([10,1])
                      .clamp(true);

// 브러시의 현재 범위를 가져온다.
var bExtent = timeBrush.extent();

// 두 SVG의 너비를 더하고 간격을 뺀 값으로 timeScale의 레인지를 설정한다.
timescale.range([10,rightSize[0] + leftSize[0] - 10]);
// timeAxis를 현재 스케일과 눈금으로 갱신한다.
timeAxis.scale(timeScale)
        .ticks(d3.time.hours, timeTickScale((rightSize[0] + leftSize[0])));
// timeBrush도 갱신한다.
timeBrush.x(timeScale);

// 각자의 상위 요소에서 호출하며, 브러시를 갱신하려 원래 범위를 전달한다.
d3.select("#brushAxis").call(timeAxis);
d3.select("#brushG").call(timeBrush.extent(bExtent));

// 타임라인 원의 위치를 갱신한다.
d3.select("#brushG").selectAll("circle.timeline")
  .attr("cx", function(d) {return timeScale(new Date(d.timestamp))});
