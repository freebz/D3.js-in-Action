// 리스트 11.15 XY 데이터로부터 쿼드트리 생성

var quadtree = d3.geom.quadtree()
                 // 쿼드트리 테두리의 왼쪽 위와 오른쪽 아래 좌표를 지정한다.
                 .extent([[0,0], [500,500]])
                 // 데이터의 X와 Y값을 가져오는 접근자
                 .x(function(d) {return d.x})
                 .y(function(d) {return d.y});

// 쿼드트리를 만든 후에는 데이터셋을 전달해 호출함으로써 인덱스를 생성한다.
var quadIndex = quadtree(sampleData);
