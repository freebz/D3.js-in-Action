// 리스트 9.5 스프레드시트 코드

function createSpreadsheet(incData, targetDiv) {

  var keyValues = d3.keys(incData[0]);

  d3.select(targetDiv)
    .append("div")
    .attr("class", "table");

  d3.select("div.table")
    .append("div")
    .attr("class", "head row")
    .selectAll("div.data")
    .data(keyValues)
    .enter()
    .append("div")
    .attr("class", "data")
    .html(function (d) {return d})
    .style("left", function(d,i) {return (i * 100) + "px";});

  d3.select("div.table")
    .selectAll("div.datarow")
    .data(incData, function(d) {return d.content}).enter()
    .append("div")
    .attr("class", "datarow row")
    .style("top",function(d,i) {return (40 + (i * 40)) + "px";});

  d3.selectAll("div.datarow")
    .selectAll("div.data")
    .data(function(d) {return d3.entries(d);})
    .enter()
    .append("div")
    .attr("class", "data")
    .html(function (d) {return d.value})
    .style("left", function(d,i,j) {return (i * 100) + "px";});
};
