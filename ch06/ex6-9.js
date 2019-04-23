// 리스트 6.9 네트워크 걸러내기

function filterNewtwork() {
  force.stop();
  // 힘-방향 레이아웃에 연결한 현재의 nodes와 links 배열에 접근한다.
  var originalNOdes = force.nodes();
  var originalLinks = force.links();
  var influentialNodes = originalNOdes.filter(function (d) {
    return d.followers > 20;
  });

  // links 배열에 존재하는 노드를 참조하는 연결만 남긴다.
  var influentialLinks = originalLinks.filter(function (d) {
    return influentialNodes.indexOf(d.source) > -1 &&
           influentialNodes.indexOf(d.target) > -1;
  });

  d3.selectAll("g.node")
    .data(influentialNodes, function (d) {return d.id})
    .exit()
    // exit() 메서드에 전환을 설정하므로, 제거되는 노드만 전환되게 만들고
    // 제거를 완료할 때까지 기다린다.
    .transition()
    .duration(4000)
    .style("opacity", 0)
    .remove();

  d3.selectAll("line.link")
    .data(influentialLinks, function (d) {
      return d.source.id + "-" + d.target.id;
    })
    .exit()
    .transition()
    .duration(3000)
    .style("opacity", 0)
    .remove();

  force
    .nodes(influentialNodes)
    .links(influentialLinks);

  force.start();
};
