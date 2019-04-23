// 리스트 6.7 힘-방향 레이아웃 함수

function forceDirected() {
  queue()
    .defer(d3.csv, "nodelist,csv")
    .defer(d3.csv, "degelist.csv")
    .await(function(error, file1, file2) {
      createForeLayout(file1, file2);
    });

  function createForceLayout(nodes,edges) {
    var nodeHash = {};
    for (x in nodes) {
      nodeHash[nodes[x].id] = nodes[x];
    };
    for (x in edges) {
      edges[x].weight = parseInt(edges[x].weight);
      edges[x].source = nodeHash[edges[x].source];
      edges[x].target = nodeHash[edges[x].target];
    };

    var weightScale = d3.scale.linear()
      .domain(d3.extent(edges, function(d) {return d.weight;}))
      .range([.1,1]);

    // 노드 간의 척력을 정의한다.
    // 음수로 설정하면 노드가 서로 끌어당기도록 만든다.
    var force = d3.layout.force().charge(-1000)
      .size([500,500])
      .nodes(nodes)
      .links(deges)
      // tick 이벤트가 끊임 없이 발생해 이벤트 처리기를 호출한다.
      .on("tick", forceTick);

    // 노드와 엣지에 대한 키값은 나중에 네트워크를 갱신하는 데 도움이 된다.
    d3.select("svg").selectAll("link.link")
      .data(edges, function (d) {return d.source.id + "-" + d.target.id;})
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "black")
      .style("opacity", .5)
      .style("stroke-width", function(d) {return d.weight});

    var nodeEnter = d3.select("svg").selectAll("g.node")
      .data(nodes, function (d) {return d.id})
      .enter()
      .append("g")
      .attr("class", "node");

    nodeEnter.append("circle")
      .attr("r", 5)
      .style("fill", "lightgray")
      .style("stroke", "black")
      .style("stroke-width", "1px");

    nodeEnter.append("text")
      .style("text-anchor", "middle")
      .attr("y", 15)
      .text(function(d) {return d.id;});

    // 네트워크를 초기화하면 "tick" 이벤트가 발생해
    // 노드의 구심도(centrality)를 계산한다.
    force.start();

    function forceTick() {
      // tick 이벤트 처리기로서, 새로 계산한 노드의 위치를 기반으로
      // 엣지와 노드의 위치를 갱신한다.
      d3.selectAll("line.link")
	.attr("x1", function (d) {return d.source.x;})
	.attr("x2", function (d) {return d.target.x;})
	.attr("y1", function (d) {return d.source.y;})
	.attr("y2", function (d) {return d.target.y;});

      d3.selectAll("g.node")
	.attr("transform", function (d) {
	  return "translate("+d.x+","+d.y")";
	})
    };
  };
};
