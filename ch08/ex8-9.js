// 리스트 8.9 캔버스에 원 100개 그리기

imageArray = [];

d3.select("#traditional").append("canvas")
  .attr("height", 500).attr("width", 500);

var context = d3.select("canvas").node().getContext("2d");
context.textAlign = "center";
context.font = "200px Georgia";
// 이 스케일들은 난수를 생성하려는 것이다.
colorScale = d3.scale.quantize().domain([0,1])
               .range(colorbrewer.Reds[7]);
lineScale = d3.scale.quantize().domain([0,1]).range([10,40]);

// 임의의 색상으로 원을 100번 그린다.
for (var x=0;x<100;x++) {
  context.clearRect(0,0,500,500);
  context.strokeStyle = colorScale(Math.random());
  context.lineWidth = lineScale(Math.random());
  context.fillStyle = colorScale(Math.random());
  context.beginPath();
  context.arc(250,250,200,0,2*Math.PI);
  context.fill();
  context.stroke();

  context.fillStyle = "black";
  context.fillText(x,250,280);
  // 각 그림의 데이터 URL을 가져와 배열에 넣는다.
  var dataURL = d3.select("canvas").node().toDataURL();
  imageArray.push({x: x, url: dataURL});
}

d3.select("#tranditional")
  .append("div").attr("class", "gallery")
  // 배열을 이용해 그림을 100개 만든다.
  .selectAll("img").data(imageArray)
  .enter().append("img")
  .attr("src", function(d) {return d.url})
  // <img> 요소는 자동으로 크기가 조정되므로
  // 이 높이에 맞게 그림의 너비가 자동으로 조정돼 그림이 왜곡되지 않느다.
  .style("height", "50px")
  .style("float", "left");
