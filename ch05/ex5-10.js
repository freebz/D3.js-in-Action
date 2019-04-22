// 리스트 5.10 d3.layout.cloud로 워드 클라우드 생성

// 원래 값 대신 스케일로 폰트를 지정한다.
var wordScale = d3.scale.linear().domain([0,75]).range([10,160]);

d3.layout.cloud()
  .size([500, 500])
  // words() 메서드로 클라우드 레이아웃에 데이터를 전달한다.
  .words(data)
  // 스케일로 각 단어의 크기를 설정한다.
  .fontSize(function(d) { return wordScale(d.frequency); })
  .on("end", draw)
  // 클라우드 레이아웃을 초기화해야 한다.
  // 초기화를 완료하면 end 이벤트가 발생하고 이 이벤트에 연결된 함수를 실행한다.
  .start();

// end 이벤트에 draw() 함수를 할당했으므로,
// 초기화를 완료하면 이 함수가 처리된 데이터셋을 전달받는다.
function draw(words) {
  var wordG = d3.select("svg").append("g")
    .attr("id", "wordCloudG")
    .attr("transform","transform(250,250)");
  wordG.selectAll("text")
    .data(words)
    .endter()
    .append("text")
    .style("font-size", function(d) { return d.size + "px"; })
  style("opacity", .75)
    .attr("text-anchor", "middle")
    // 클라우드 레이아웃이 변환과 회전을 계산한다.
    .attr("transform", function(d) {
      return "translate(" + [d.x + d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
};
