// 리스트 6.10 엣지를 추가하는 함수

function addEdge() {
  force.stop()

  var oldEdges = force.links();
  var nodes = force.nodes();
  newEdge = {source: nodes[0], target: nodes[8], weight: 5};
  oldEdges.push(newEdge);
  force.links(oldEdges);

  d3.select("svg").selectAll("line.link")
    .data(oldEdges, function(d) {
      return d.source.id + "-" + d.target.id;
    })
    .enter()
    .insert("line", "g.nodes")
    .attr("class", "link")
    .style("stroke", "red")
    .style("stroke-width", 5)
    .attr("marker-end", "url(#Triangle)");

  force.start();
};
