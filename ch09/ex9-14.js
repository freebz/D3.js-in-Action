// 리스트 9.14 브러시 생성 함수

functon createBrush(incData) {
  // 트윗의 최초/최종 시각을 알려준다.
  timeRange = d3.extent(incData.map(function(d) {
                  return new Date(d.timestamp);
                })
  );

  // 나중에 브러시의 크기를 동적으로 변경한다.
  timeScale = d3.time.scale().domain(timeRange).range([10,990]);

  // brush 이벤트가 발생할 때마다 brushed() 함수를 호출한다.
  timeBrush = d3.svg.brush()
                .x(timeScale)
                .extent(timeRange)
                .on("brush", brushed);

  // 두 시간마다 눈금을 표시하며, 시간 단위와 AM/PM만 표시한다.
  timeAxis = d3.svg.axis()
               .scale(timeScale)
               .orient('bottom')
               .ticks(d3.time.hours, 2)
               .tickFormat(d3.time.format('%I%p'));

  var brushSVG = d3.select("#brush")
                   .append("svg")
                   .attr("height", "100%")
                   .attr("width", "100%");

  brushSVG.append("g")
          .attr("transform", "translate(0,100)")
          .attr("id", "brushAxis").call(timeAxis);    // 우리가 만든 축

  // 생성된 <rect> 요소의 높이를 50px로 설정한다.
  brushSVG.append("g").attr("transform", "translate(0,50)")
          .attr("id", "brushG").call(timeBrush)    // 우리가 만든 브러시
          .selectAll("rect").attr("height", 50);

  function brushed() {
    // 브러시 이벤트 처리 코드
  };
};
