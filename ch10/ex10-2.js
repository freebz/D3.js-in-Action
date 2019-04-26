// 리스트 10.2 개선된 processGrid() 함수

function processGrid(data) {
  // 행과 열의 수를 계산한다.
  var rows = Math.ceil(Math.sqrt(data.length));
  var columns = rows;

  // 데이터셋의 인덱스를 초기화한다.
  var cell = 0;

  // 모든 행과 열을 순회한다.
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      // 데이터셋이 객체의 배열로 구성된다고 가정한다.
      if (data[cell]) {
	// 현재 데이터점을 해당 행과 열에 할당한다.
	data[cell].x = j;
	data[cell].y = i;
	// 데이터셋 인덱스를 증가시킨다.
	cell++;
      }
      else {
	break;
      }
    }
  }

  return data;
}
