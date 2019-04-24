// 리스트 8.6 열 정렬

d3.select("#traditional").insert("button", ".table")
  .on("click", sortColumns).html("sort columns ");
d3.select("#traditional").insert("button", ".table")
  .on("click", restoreColumns).html("restore columns");

function sortColumns() {
  d3.selectAll("div.datarow")
    .selectAll("div.data")
    .transition()
    .duration(2000)
    .style("left", function(d,i,j) {
      return (Math.abs(i - 4) * 100) + "px";
    });
};

function restoreColumns() {
  d3.selectAll("div.datarow")
    .selectAll("div.data")
    .transition()
    .duration(2000)
    .style("left", function(d,i,j) {
      return (i * 100) + "px";
    });
};
