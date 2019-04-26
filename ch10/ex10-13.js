// 리스트 10.13 개선된 legend() 함수

d3.svg.legend = function() {
  var data = [];
  // 기본 크기를 설정한다.
  var size = [300,20];
  // X-축을 초기화하지만 도메인이나 레인지는 설정하지 않는다.
  var xScale = d3.scale.linear();
  // 컴포넌트에 전달할 스케일
  var scale;

  function legend(gSelection) {

    // 스케일을 데이터 배열에 처리하려 함수를 호출한다.
    createLegendData(scale);

    // X-축 스케일을 설정한다.
    var xMin = d3.min(data, function(d) {return d.domain[0];});
    var xMax = d3.max(data, function(d) {return d.domain[1];});

    // X-축 스케일을 설정한다.
    xScale.domain([xMin,xMax]).range([0,size[0]])

    // 컴포넌트 설정과 스케일 데이터에 기초해 사각형을 그린다.
    gSelection.selectAll("rect")
              .data(data)
              .enter()
              .append("rect")
              .attr("height", size[1])
              .attr("width", function (d) {
		  return xScale(d.domain[1]) - xScale(d.domain[0]);
              })
              .attr("x", function (d) {return xScale(d.domain[0]);})
              .style("fill", function(d) {return d.color;});

    return this;
  };

  // 데이터 배열을 스케일로 처리한다.
  function createLegendData(incScale) {
    var rangeArray = incScale.range();
    data = [];
    for (var x in rangeArray) {
      var colorValue = rangeArray[x];
      var domainValues = incScale.invertExtent(colorValue);
      data.push({color: colorValue, domain: domainValues})
    }
  };

  // 범례의 스케일을 설정하는 게터/세터
  legend.scale = function(newScale) {
    if (!arguments.length) return scale;
    scale = newScale;
    return this;
  };

  return legend;
};
