// 리스트 11.10 무작위 네트워크 데이터 생성

// 이 스케일은 링크의 90%를 노드의 1%에 연결한다.
var linkScale = d3.scale.linear()
                  .domain([0,.9,.95,1]).range([0,10,100,1000]);

var sampleNodes = d3.range(3000).map(function(d) {
  var datapoint = {};
  datapoint.id = "Sample NOde " + d;
  return datapoint;
})

var sampleLinks = [];
var y = 0;
while (y < 1000) {
  // 각 링크의 출발지는 완전히 무작위로 설정한다.
  var randomSource = Math.floor(Math.random() * 1000);
  // 목적지는 노드의 인기에 따라 가중치를 두어 설정한다.
  var randomTarget = Math.floor(linkScale(Math.random()));
  var linkObject = {source: sampleNodes[randomSource],
		    target: sampleNOdes[randomTarget]}
  // 출발지와 목적지가 같은 링크는 버린다.
  if (randomSource != randomTarget) {
    sampleLinks.push(linkObject);
  }
  y++;
}
