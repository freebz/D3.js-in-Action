// 리스트 12.23 스마트폰 앱용 calculateStatistics() 함수

function calculateStatistics(d) {
  // 부동산 데이터점만 name 속성을 가졌으므로, 이 속성으로 부동산 정보인지 확인한다.
  if (d.name) {
    // 데이터점에서 가져온 값으로 레이블을 설정한다.
    d3.select("div.viewTitle")
      .html(d.parent.parent.key + " - " + d.parent.key + "<br>" + d.name);
    d3.select("#viewValue").html("Value: $" + d.oValue);
    d3.select("#viewSize").html("Size: " + d.size + " square feet");
  }
  else {
    // 이 노드 밑의 모든 단말 노드를 모은다.
    var allDatapoints = allChildren(d);

    var averageValue =
      d3.mean(allDatapoints, function(d) {return d.oValue});

    // 수치형 속성들(가격, 면적)의 평균을 구한다.
    var averageSize =
      d3.mean(allDatapoints, function(d) {return d.size});

    d3.select("div.viewTitle")
      .html(d.depth == 2 ? d.parent.key + " - " + d.key : d.key);

    d3.select("#viewValue")
      .html("Average Value: $" +
	    d3.format("0,000")(Math.floor(averageValue)));

    // 레이블을 설정한다.
    d3.select("#viewSize")
      .html("Average Size: " + d3.format("0,000")(Math.floor(averageSize))
	    + " square feet");
  };

  function allChildren(d) {
    var childArray = [];
    for (x in d.values) {
      if (d.values[x].name) {
	childArray.push(d.values[x]);
      }
      else {
	// 모든 단말 노드를 재귀적으로 찾아낸다.
	childArray =
	  allChildren(d.values[x]);
      }
    }
    return childArray;
  }
}
