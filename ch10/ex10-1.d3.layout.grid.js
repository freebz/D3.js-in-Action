// 리스트 10.1 d3.layout.grid.js

d3.layout.grid = function() {
  function processGrid(data) {
    console.log(data)
  }
  return processGrid;
}

var grid = d3.layout.grid();
grid([1,2,3,4,5]); // 콘솔에 [1,2,3,4,5]를 출력한다.
