// 리스트 6.11 노드와 엣지를 추가하는 함수

function addNodesAndEdges() {
  force.stop();

  var oldEdges = force.links();
  var oldNOdes = force.nodes();
  var newNOde1 = {id: "raj", followers: 100, following: 67};
  var newNode2 = {id: "wu", followers: 50, following: 33};
  var newEdge1 = {source: oldNodes[0], target: newNode1, weight: 5};
  var newEdge2 = {source: oldNodes[0], target: newNode2, weight: 5};

  oldEdges.push(newEdge1,newEdge2);
  oldNOdes.push(newNode1,newNode2);

  force.links(oldEdges).nodes(oldNOdes);

  d3.select("svg").selectAll("line.link")
    .data(oldEdges, function(d) {
      return d.source.id + "-" + d.target.id
    })
    .enter()
    .insert("line", "g.node")
    .attr("class", "link")
    .style("stroke", "red")
    .style("stroke-width", 5)
    .attr("marker-end", "url(#Triangle)");

  var nodeEnter = d3.select("svg").selectAll("g.node")
    .data(oldNOdes, function (d) {
      return d.id
    }).enter()
    .append("g")
    .attr("class", "node")
    .call(force.drag());

  nodeEnter.append("circle")
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "darkred")
    .style("stroke-width", "2px");

  nodeEnter.append("text")
    .style("text-anchor", "middle")
    .attr("y", 15)
    .text(function(d) {return d.id;});

  force.start();
};
