// 리스트 12.22 스마트폰 앱 changeView() 함수

function changeView(d) {
  // 뷰의 크기를 현재 클릭한 원의 크기로 설정한다.
  newScale = (screenHeight / 2) / (d.r + 100);

  // 현재 선택한 원을 회색으로 채워 강조한다.
  d3.select("#dataG").selectAll("circle")
    .style("fill", function(p) {return p == d ? "lightgray" : "white"})

  // 현재 원과 같은 수준에 있는 다른 원들과
  // 현재 원의 자식 노드들에만 이벤트를 활성화시킨다.
  d3.select("#dataG").selectAll("circle")
    .style("pointer-events", function(p) {
      return (p.depth == d.depth || p.parent == d) &&
	      p != d ? "auto" : "none"
    });

  // 이 원의 중심에 놓는다.
  d3.select("#dataG")
    .transition()
    .duration(1000)
    .attr("transform",
	  "translate(" + ((screenWidth/2)-(d.x * newScale)) + "," +
	               ((screenHeight/2) -(d.y * newScale)) + ")"
	 );

  // 확대하려 원의 크기를 키우고 위치를 조정한다.
  d3.selectAll("circle.pack")
    .transition()
    .duration(1000)
    .attr("r", function(d) {return d.r * newScale})
    .attr("cx", function(d) {return d.x * newScale})
    .attr("cy", function(d) {return d.y * newScale});

  symbolSize = d3.scale.linear()
                 .domain(sizeExtent)
                 .range([100 * newScale,180 * newScale]);

  d3.selectAll("g.datapoint")
    .transition()
    .duration(1000)
    .attr("transform", function(d) {return "translate(" +
	    (d.x * newScale) + "," + (d.y * newScale) + ")";
    })
    .select("path")
    .each(function(d) {
      // 기호를 크게 만든다.
      houseSymbol = d3.svg.symbol().type(typeShape[d.type])
	              .size(symbolSize(d.size));
      d3.select(this).transition().duration(1000)
	.attr("d", houseSymbol);
    });

  calculateStatistics(d);
};
