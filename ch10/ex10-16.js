// 리스트 10.16 범례의 제목과 단위 속성

// 이 부분은 d3.svg.legend() 함수 안의 var scale; 선언 바도 다음에 추가된다.
var title = "Legend";
var numberFormat = d3.format(".4n");
var units = "Units";

// 그 밖에 기존 코드

// 다음 함수들은 모두 legend.scale() 정의 후에 추가된다.
legend.title = function(newTitle) {
  if (!arguments.length) return title;
  title = newTitle;
  return this;
};

legend.unitLabel = function(newUnits) {
  if (!arguments.length) return units;
  units = newUnits;
  return this;
};

legend.formatter = function(newFormatter) {
  if (!arguments.length) return numberFormat;
  numberFormat = newFormatter;
  return this;
};
