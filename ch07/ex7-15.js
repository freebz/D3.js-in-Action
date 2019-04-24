// 리스트 7.15 위성 도법 설정

projection = d3.geo.satellite()
               .scale(1330)
               .translate([250,250])
               .rotate([-30.24, -31, -56])
               .tilt(30)	// 지형을 내려다보는 각도
               .distance(1.199)	// 관측점에서 지표면까지의 거리
               .clipAngle(45);

