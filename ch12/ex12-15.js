// 리스트 12.15 팝업에 정보 채우기

function highlightDatapoint(d) {
  // 해당 행을 강조한다.
  d3.selectAll("li.datapoint")
    .style("font-weight", function(p) {
      return p == d ? 900 : 100;
    });

  // 해당 기호를 강조한다.
  d3.selectAll("g.datapoint").select("path")
    .style("stroke-width", function(p) {
      return p == d ? "3px" : "1px";
    });

  // 해당 기호 위로 팝업을 이동시킨다.
  var popup = d3.select("#modal")
                .style("top", yScale(d.value) - 135)
                .style("left", xScale(d.size) - 100);

  // 데이터점에서 데이터를 가져와 팝업을 채운다.
  popup.selectAll("*").remove();
  popup.append("p").html(d.name);
  popup.append("p").html("Location: " + d.location);
  popup.append("p").html("Style: " + d.type);
  popup.append("p").html("Size: " + d.size + "Sq. Ft.");
  popup.append("p").html("Value: $" + d.value);
};
