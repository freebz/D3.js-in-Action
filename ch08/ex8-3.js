// 리스트 8.3 스프레드시트 예제

d3.json("tweets.json",function(error,data) {
  createSpreadsheet(data.tweets)});

function createSpreadsheet(incData) {
  // 객체마다 속성이 다르면 이 방식을 사용할 수 없지만,
  // 일반적으로 그런 일은 발생하지 않는다.
  var keyvalues = d3.keys(incData[0]);

  d3.select("#traditional")
    .append("table");

  d3.select("table")
    .append("tr")
    .attr("class", "head")
    .selectAll("th")
    // 키로 테이블의 제목 행을 만든다.
    .data(keyValues)
    .enter()
    .append("th")
    .html(function (d) {return d;});

  d3.select("table")
    .selectAll("tr.data")
    .data(incData).enter()
    // 트윗마다 행을 하나씩 생성한다.
    .append("tr")
    .attr("class", "data");

  d3.selectAll("tr")
    .selectAll("td")
    .data(function(d) {return d3.entries(d)})
    .enter()
    // 각 데이터점의 ㅎ아목마다 셀을 하나씩 만든다.
    .append("td")
    .html(function (d) {return d.value});
};
