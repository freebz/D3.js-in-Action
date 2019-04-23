// 리스트 6.4 인접 행렬 함수

function adjacency() {
  // 먼저 두 개의 데이터셋을 로딩해야 하는데,
  // queue 객체로 비동기식 로딩 작업을 동기화할 수 있다.
  queue()
    .defer(d3.csv, "nodelist.csv")
    .defer(d3.csv, "edgelist.csv")
    .await(function(error, file1, file2) {
      createAdjacencyMatrix(file1, file2);
    });

  function createAdjacencyMatrix(nodes,edges) {
    // 해시로 소스-타깃 쌍이 연결돼 있는지 검사할 수 있다.
    var edgeHash = {};
    for (x in edges) {
      var id = edges[x].source + "-" + edges[x].target;
      edgeHash[id] = edges[x];
    };
    matrix = [];
    for (a in nodes) {
      // 조합할 수 있는 소스-타깃 연결을 모두 만든다.
      for (b in nodes) {
	// 소스-타깃 배열 인덱스에 기초해 XY 좌표를 설정한다.
	var grid =
	  {id: nodes[a].id + "-" + nodes[b].id,
	   x: b, y: a, weight: 0};
	// 엣지 목록에 해당 엣지가 있으면 여기에 가중치를 설정한다.
	if (edgeHash[grid.id]) {
	  grid.weight = edgeHash[grid.id].weight;
	};
	matrix.push(grid);
      };
    };

    d3.select("svg")
      .append("g")
      .attr("transform", "translate(50,50)")
      .attr("id", "adjacencyG")
      .selectAll("rect")
      .data(matrix)
      .enter()
      .append("rect")
      .attr("class", "grid")
      .attr("width", 25)
      .attr("height", 25)
      .attr("x", function (d) {return d.x * 25})
      .attr("y", function (d) {return d.y * 25})
      .style("fill-opacity", function (d) {return d.weight * .2;})

    var scaleSize = nodes.length * 25;
    var nameScale = d3.scale.ordinal()
                      // 노드 ID로부터 ordinal 스케일을 생성한다.
                      .domain(nodes.map(function (el) {return el.id}))
                      // 순서를 나타내는 값으로 사용한다.
                      .rangePoints([0,scaleSize],1);

    // 두 축이 모두 같은 스케일을 사용한다.
    var xAxis = d3.svg.axis()
      .scale(nameScale).orient("top").tickSize(4);
    var yAxis = d3.svg.axis()
      .scale(nameScale).orient("left").tickSize(4);

    d3.select("#adjacencyG").append("g").call(yAxis);
    d3.select("#adjacencyG").append("g").call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
    // X-축에 있는 텍스트를 회전시킨다.
      .attr("transform", "translate(-10,-10) rotate(90)");
  };
};
