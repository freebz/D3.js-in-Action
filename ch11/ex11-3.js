// 리스트 11.3 샘플 데이터 생성

// d3.range()로 배열을 만들고, map() 메서드로 배열 요소마다 동일 연산을 적용한다.
var sampleData = d3.range(1000).map(function(d) {
  // 지도 위에 놓는 데 필요한 속성을 가진 datapoint 객체를 만든다.
  var datapoint = {};
  datapoint.id = "Sample Feature " + d;
  datapoint.type = "Feature";
  datapoint.properties = {};
  datapoint.geometry = {};
  datapoint.geometry.type = "Polygon";
  datapoint.geometry.coordinates = randomCoords();
  return datapoint;
});

// 삼각형을 그릴 영역을 무작위로 생성해 반환한다.
function randomCoords() {
  var randX = (Math.random() * 350) - 175;
  var randY = (Math.random() * 170) - 85;
  return [[[randX - 5,randY],[randY,randY - 5],
	   [randX - 10,randY - 5],[randX - 5,randY]]];
};
