// 리스트 8.5 정렬 함수

// 스프레드시트에 사용할 간단한 컨트롤 버튼
d3.select("#traditional").insert("button", ".table")
  .on("click", sortSheet).html("sort");
d3.select("#traditonal").insert("button", ".table")
  .on("click", restoreSheet).html("restore");

function sortSheet() {
  var dataset = d3.selectAll("div.datarow").data()

  dataset.sort(function(a,b) {
    // Date 객체로 변환하고 배열을 정렬해
    // 먼저 포스팅한 트윗이 배열 앞쪽에 오게 만든다.
    var a = new Date(a.timestamp);
    var b = new Date(b.timestamp);
    return a > b ? 1 : (a < b ? -1 : 0);
  });

  d3.selectAll("div.datarow")
    .data(dataset, function(d) {return d.content})
    .transition()
    .duration(2000)
    .style("top", function(d,i) {return (40 + (i * 40)) + "px";});
};

function restoreSheet() {
  d3.selectAll("div.datarow")
    .transition()
    .duration(2000)
    .style("top", function(d,i) {return (40 + (i * 40)) + "px"});
};
