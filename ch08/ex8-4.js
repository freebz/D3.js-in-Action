// 리스트 8.4 <div> 요소로 구성한 스프레드시트

d3.json("tweets.json",function(error,data) {
  createSpreadsheet(data.tweets)});

function createSpreadsheet(incData) {
  var keyValues = d3.keys(incData[0]);

  d3.select("#traditional")
    .append("div")
    // <table> 요소가 아니고 "div.table" 클래스를 가리킨다.
    .attr("class", "table");

  // 이전 코드와 동일하다.
  d3.select("div.table")
    .append("div")
    .attr("class", "head")
    .selectAll("div.data")
    .data(keyValues)
    .enter()
    .append("div")
    .attr("class", "data")
    .html(function (d) {return d})
    // HTML 요소는 x, y, transform 설정 대신
    // top, bottom, left, right 설정을 가진다.
    .style("left", function(d,i) {return (i * 100) + "px";});

  d3.select("div.table")
    .selectAll("div.datarow")
    .data(incData, function(d) {return d.content})
    .enter()
    .append("div")
    .attr("class", "datarow")
    .style("top", function(d,i) {return (40 + (i * 40)) + "px";});

  d3.selectAll("div.datarow")
    .selectAll("div.data")
    .data(function(d) {return d3.entries(d)})
    .enter()
    .append("div")
    .attr("class", "data")
    .html(function (d) {return d.value})
    .style("left", function(d,i,j) {return (i * 100) + "px";});
};
