// 리스트 10.15 범례에 사용한 텍스트 레이블

gSelection.selectAll("text")
          .data(data)
          .enter()
          // 텍스트 요소를 이동한 후에 변환하려면 <g> 요소 안에 넣어야 한다.
          // 그렇지 않으면 회전한 후에 변환해 회전한 위치를 기준으로 이동하므로
          // 텍스트가 페이지 밖으로 나간다.
         .append("g")
         .attr("transform", function (d) {
	     return "translate(" + xScale(d.domain[0]) + "," + size[1] + ")";
         })
         .append("text")
         .attr("transform", "rotate(90)")
         .text(function(d) {return d.domain[0];});
