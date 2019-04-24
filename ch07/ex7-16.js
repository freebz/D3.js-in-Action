// 리스트 7.16 TopoJSON 파일 로딩

queue()
  .defer(d3.json, "world.topojson")
  .defer(d3.csv, "cities.csv")
  .await(function(error, file1, file2) { createMap(file1, file2); });

function createMap(file1, file2) {
  // 모든 TopoJSON 파일에는 objects라는 속성이 있지만,
  // countries는 이 파일에만 있는 고유한 속성이며,
  // 다른 파일에는 rivers나 land 등의 속성명이 있을 수 있다.
  var worldFeatures = topojson.feature(file1, file1.objects.countries)
  console.log(worldFeatures);
};
