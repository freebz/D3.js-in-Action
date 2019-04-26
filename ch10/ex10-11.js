// 리스트 10.11 그리드 색상 변경

// 데이터 배열을 원에 바인딩한다.
var griddedData = d3.selectAll("circle").data();
var sizeExtent = d3.extent(griddedData, function (d) {return d.size;});
var countryColor = d3.scale.quantize()
                        .domain(sizeExtent).range(colorbrewer.Reds[7]);
d3.selectAll("circle").style("fill", function (d) {
              return contryColor(d.size);});
