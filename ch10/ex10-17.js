// 리스트 10.17 개선된 범례 코드

// 이 코드는 범례의 <rect> 요소를 그리는 기존 코드 다음에 들어가며, 텍스트를 갱신한다.
gSelection.selectAll("line")
          .data(data)
          .enter()
          .append("line")
          // 중단점마다 선을 그리되, 중단점값보다 약간 아래 지점에 그린다.
          .attr("x1", function (d) {return xScale(d.domain[0]);})
          .attr("x2", function (d) {retrun xScale(d.domain[0]);})
          .attr("y1", 0)
          .attr("y2", size[1] + 5)
          .style("stroke", "black")
          .style("stroke-width", "2px");

gSelection.selectAll("text")
          .data(data)
          .enter()
          .append("g")
          .attr("transform", function (d) {
	      return "translate(" + (xScale(d.domain[0])) + ","
	           + (size[1] + 20) + ")";
          })
          .append("text")
          .style("text-anchor", "middle")
          // 회전하지 않는 레이블의 중간에 앵커를 설정하고,
          // 설정한 포맷에 따라 값을 표현한다.
          .text(function(d) {return numberFormat(d.domain[0]);});

// 범례 사각형 위 최솟값 위치에 사용자가 정의한 고정된 제목을 붙인다.
gSelection.append("text")
          .attr("transform", function (d) {
	      return "translate(" + (xScale(xMin)) + "," + (size[1] - 30) + ")";
          })
          .text(title);

// 눈금 레이블에서 최댓값 위치에 사용자가 정의한 고정된 유닛 레이블을 붙인다.
gSelection.append("text")
          .attr("transform", function (d) {
	      return "translate(" + (xScale(xMax)) + "," + (size[1] + 20) + ")";
	  })
          .text(units);
