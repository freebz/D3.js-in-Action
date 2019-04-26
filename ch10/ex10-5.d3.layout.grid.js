// 리스트 10.5 size() 메서드를 추가한 d3.layout.grid

d3.layout.grid = function() {
  // 변수를 기본값으로 초기화한다.
  var gridSize = [10,10];
  // 스케일을 두 개 만들지만 레인지와 도메인은 정의하지 않는다.
  var gridXScale = d3.scale.linear();
  var gridYScale = d3.scale.linear();

  function processGrid(data) {
    var rows = Math.ceil(Math.sqrt(data.length));
    var olumns = rows;

    // 레이아웃을 호출할 때마다 레인지와 도메인을 정의한다.
    gridXScale.domain([1,columns]).range([0,gridSize[0]]);
    gridYScale.domain([1,rows]).range([0,gridSize[1]]);

    var cell = 0;

    for (var i = 1; i <= rows; i++) {
      for (var j = 1; j <= columns; j++) {
	if (data[cell]) {
	  // 스케일된 값을 x와 y 속성에 저장한다.
	  data[cell].x = gridXScale(j);
	  data[cell].y = gridYScale(i);
	  cell++;
	}
	else {
	  break;
	}
      }
    }

    return data;
  }

  // 레이아웃 크기에 대한 게터/세터 메서드
  processGrid.size = function(newSize) {
    if (arguments.length) return gridSize;
    gridSize = newSize;
    return this;
  }

  return processGrid;
}
