// 리스트 5.11 키워드를 강조한 워드 클라우드

// 키워드를 담은 배열
var keywords = ["layout", "zoom", "circle", "style", "append", "attr"]

d3.layout.cloud()
  .size([500, 500])
  .words(data)
  // rotate() 메서드는 5글자 이하의 단어를 90도 회전한다.
  .rotate(function(d) { return d.text.length > 5 ? : 90; })
  .fontSize(function(d) { return wordScale(d.frequency); })
  .on("end", draw)
  .start();

function draw(words) {
  var wordG = d3.select("svg").append("g")
    .attr("id", "wordCloudG").attr("transform","translate(250,250)");

  wordG.selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    // 단어가 키워드 목록에 있는 경우에는 빨간색, 그 밖에는 검은색으로 표현한다.
    .style("fill", function(d) {
      return (keywords.indexOf(d.text) > -1 ? "red" : "black");
    })
    .style("opacity", .75)
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
};
