// 리스트 9.3 일반적인 대시보드 함수

function dashboard() {
  // 사용자가 화면 크기를 조정할 때마다 차트를 다시 그린다.
  window.onresize = function(event) {
    redraw();
  };

  d3.json("tweets.json",function(error,data) {startup(data.tweets)});

  function startup(incData) {
    // 스프레드시트가 트윗 배열을 받는다.
    createSpreadsheet(incData, "#spreadsheet");
    var nestedTweets = d3.nest()
      .key(function (el) {return el.user})
      .entries(incData);

    packableTweets = {id: "root", values: nestedTweets};
    // 막대 그래프는 내포된 트윗을 받는다.
    createBar(nestedTweets, "#rightSVG");
    // 서클 팩은 루트 노드에 있는 내포된 트윗을 받는다.
    createPack(packableTweets, "#leftSVG");
    // redraw() 함수(9.1.5절 참조)를 호출하지 않으면,
    // SVG 영역에 아무것도 나타나지 않는다.
    redraw();
  };
};
