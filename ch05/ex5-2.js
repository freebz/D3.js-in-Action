// 리스트 5.2 파이 레이아웃을 개선한 바인딩과 전환

// 그릴 원호에 대한 값을 정의하는 함수를 갱신한다.
pieChart.value(function(d) {
  return d.numRetweets;
});

// 배열 전체가 아니라 값이 있는 객체만 바인딩한다.
d3.selectAll("path").data(pieChart(nestedTweets.filter(function(d) {
                            return d.numRetweets > 0;

                          })),
			  // 사용자 ID를 키값으로 사용한다.
			  // 이 값을 초기 enter() 메서드에 사용해야 한다.
			  function (d) {
			    return d.data.key;
			  }
  )
  .exit()
  // 데이터가 없는 요소들을 제거한다.
  .remove();

d3.selectAll("path").data(pieChart(nestedTweets.filter(function(d) {
                            return d.numRetweets > 0;
                          })),
			  function (d) {
			    return d.data.key}
  )
  .transition()
  .duration(1000)
  // 트위닝 함수로 d 속성을 설정한다.
  .attrTween("d", arcTween);

function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    // 원호와 모양을 계산해 원호를 트위닝하는 원호 생성기를 사용한다.
    return newArc(i(t));
  };
}
