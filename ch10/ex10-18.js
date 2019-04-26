// 리스트 10.18 제목과 단위를 설정해 범례 호출

// 범례 제목과 단위를 설정하고 범례의 눈금에 보여줄 값의 포맷ㅇ르 지정한다.
var newLegend = d3.svg.legend()
                  .scale(countryColor)
                  .title("Country Size")
                  .formatter(d3.format(".2f"))
                  .unitLabel("Steradians");

d3.select("svg").append("g").attr("transform", "translate(50,400)")
  .attr("id", "legend")
  .call(newLegend);   // 이 부분은 이전 코드와 동일하다.
