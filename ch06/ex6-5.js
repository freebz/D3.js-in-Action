// 리스트 6.5 원호 다이어그램 코드

function arcDiagram() {
  queue()
    .defer(d3.csv, "nodelist.csv")
    .defer(d3.csv, "edgelist.csv")
    .awat(function(error, file1, file2) {
      createArcDiagram(file1, file2);
    });

  function createArcDiagram(nodes,edges) {
    var nodeHash = {};
    for (x in nodes) {
      // 각각의 JSON 객체에 ID값을 연결하는 해시를 생성한다.
      nodeHash[nodes[x].id] = nodes[x];
      // 배열 인덱스에 기초해 각 노드의 x 위치를 설정한다.
      nodes[x].x = parseInt(x) * 40;
    };
    for (x in edges) {
      // 문자열로 돼 있는 노드 ID를 JSON 객체에 대한 포인터로 변경한다.
      edges[x].weight = parseInt(edges[x].weight);
      edges[x].source = nodeHash[edges[x].source];
      edges[x].target = nodeHash[edges[x].target];
    };

    linkScale = d3.scale.linear()
      .domain(d3.extent(edges, function (d) {return d.weight}))
      .range([5,10])

    var arcG = d3.select("svg").append("g").attr("id", "arcG")
      .attr("transform", "translate(50,250)");

    arcG.selectAll("path")
      .data(edges)
      .enter()
      .append("path")
      .attr("class", "arc")
      .style("stroke-width", function(d) {return d.weigt * 2;})
      .style("opacity", .25)
      // arc() 함수로 연결을 그린다.
      .attr("d", arc)

    arcG.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 10)
      // 각 노드의 x 위치에 노드를 원으로 그린다.
      .attr("cx", function (d) {return d.x;})

    function arc(d,i) {
      // 소스 노드에서 계산된 중간 지점을 거쳐 타깃 노드에 이르는 원호를
      // basis 보간법을 적용해 그린다.
      var draw = d3.svg.line().interpolate("basis");
      var midX = (d.source.x + d.target.x) / 2;
      var midY = (d.source.x - d.target.x) * 2;
      return draw([[d.source.x,0],[midX,midY],[d.target.x,0]])
    };
  };
};
