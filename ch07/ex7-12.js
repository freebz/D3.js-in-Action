// 리스트 7.12 지구본 생성

projection = d3.geo.orthographic()
  .scale(200)
  .translate([width / 2, height / 2])
  .center([0,0]);
