// 리스트 10.8 그리드 셀의 높이와 너비 계산

var gridCellWidth = gridSize[0] / columns;
var gridCellHeight = gridSize[1] / rows;

// 그 밖에 기존 코드

for (var i = 1; i <= rows; i++) {
  for (var j = 1; j <= columns; j++) {
    if (data[cell]) {
      data[cell].x = gridXScale(j);
      data[cell].y = gridYScale(i);
      data[cell].height = gridCellHeight;  // 새로운 코드
      data[cell].width = gridCellWidth;
      cell++;
    }
    else {
      break;
    }
  }
}
