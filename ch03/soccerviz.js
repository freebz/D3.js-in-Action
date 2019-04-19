function createSoccerViz() {
  // 데이터를 로딩하고 로딩된 데이터로 overallTeamViz() 함수를 호출한다.
  d3.csv("worldcup.csv", function(data) {
    overallTeamViz(data);
  })

  function overallTeamViz(incomingData) {
    // 팀별로 <g>를 만들어 레이블을 붙인다. 나중에 더 많은 요소를 추가한다.
    d3.select("svg")
      .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(incomingData)
      .enter()
      // <svg> 요소에 <g> 그룹을 추가하고 자신의 콘텐츠를 중앙으로 이동시킨다.
      .append("g")
      .attr("class", "overallG")
      .attr("transform",
	    function (d,i) {return "translate(" + (i * 50) + ", 0)"});

    // d3.selectAll()를 매번 다시 입력할 필요가 없도록 셀렉션을 변수에 할당한다.
    var teamG = d3.selectAll("g.overallG");
    /*
    teamG
      .append("circle")
      .attr("r", 20)
      .style("fill", "pink")
      .style("stroke", "black")
      .style("stroke-width", "1px");
    */
    teamG
      .append("circle")
      .attr("r", 0)
      .transition()
      .delay(function(d,i) {return i * 100})
      .duration(500)
      .attr("r", 40)
      .transition()
      .duration(500)   
      .attr("r", 20);

    teamG
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", 30)
      //.style("font-size", "10px")
      .text(function(d) {return d.team;});

    
    var dataKeys = d3.keys(incomingData[0]).filter(function(el) {
      return el != "team" && el != "region";
    });

    // 수치형 데이터에 기초해 버튼을 생성하므로
    // 문자형인 team과 region을 제외한 모든 속성을 가져온다.
    d3.select("#controls").selectAll("button.teams")
      .data(dataKeys).enter()
      .append("button")
      // 각 버튼에 click 이벤트 처리기를 추가한다.
      // 콜백 메서드를 생성할 때 바인딩된 데이터에 접근할 수 있다.
      .on("click", buttonClick)
      // dataKeys는 속성명의 배열로 구성되므로 d는 속성명에 해당하며,
      // 속성명으로 버튼 제목을 설정할 수 있다.
      .html(function(d) {return d;});

    // 각 버튼을 클릭했을 때 호출하는 함수로서,
    // 바인딩된 데이터가 첫 번째 인자로 자동 전달된다.
    function buttonClick(datapoint) {
      var maxValue = d3.max(incomingData, function(d) {
	return parseFloat(d[datapoint]);
      });

      var radiusScale = d3.scale.linear()
	.domain([ 0, maxValue ]).range([ 2, 20 ]);

      // 이 색생 그레이디언트는 2장에서 원의 반지름을 구하는 데 사용한 스케일과 같은 범위를 갖는다.
      var ybRamp = d3.scale.linear()
	.domain([0,maxValue]).range(["yellow", "blue"]);

      
      // 스케일의 기본 보간법이 마음에 들지 않을 때는 직접 지정한다.
      // 특히 RGB값을 보건하는 방법 이외의 방법으로
      // 색상 스케일을 생성하고자 할 때는 직접 지정해야 한다.
      var ybRamp = d3.scale.linear()
	.interpolate(d3.interpolateHsl)
	.domain([0,maxValue]).range(["yellow", "blue"]);      

      var ybRamp = d3.scale.linear()
	.interpolate(d3.interpolateHcl)
	.domain([0,maxValue]).range(["yellow", "blue"]);      

      var ybRamp = d3.scale.linear()
	.interpolate(d3.interpolateLab)
	.domain([0,maxValue]).range(["yellow", "blue"]);      
    
      /*
      d3.selectAll("g.overallG").select("circle")
	.attr("r", function(d) {
	  return radiusScale(d[datapoint]);
	});
      */
      
      d3.selectAll("g.overallG").select("circle").transition().duration(1000)
	.attr("r", function(d) {
	  return radiusScale(d[datapoint]);
	})
	.style("fill", function(d) {
	  return ybRamp(d[datapoint]);
	});
    };

    function buttonClick(datapoint) {
      var maxValue = d3.max(incomingData, function(d) {
	return parseFloat(d[datapoint]);
      });

      var tenColorScale = d3.scale.category10(
	["UEFA", "CONMEBOL", "CAF", "AFC"]);

      var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
      d3.selectAll("g.overallG").select("circle").transition().duration(1000)
	.style("fill", function(p) {return tenColorScale(p.region)})
	.attr("r", function(p) {return radiusScale(p[datapoint ])});
    };

    // 새로운 buttonClick() 함수는 시각화할 원을 세 개의 범주로 분류해 색상을 할당한다.
    function buttonClick(datapoint) {
      var maxValue = d3.max(incomingData, function(el) {
	return parseFloat(el[datapoint]);
      });
      // quantize 스케일은 수치형 데이터를 최대 3개의 범주로 분류한다.
      // 데이터셋은 세 개의 범주로 분류되고 각 범주에는 서로 다른 빨간색을 할당한다.
      var colorQuantize = d3.scale.quantize()
	.domain([0,maxValue]).range(colorbrewer.Reds[3]);
      var radiusScale = d3.scale.linear()
	.domain([0,maxValue]).range([2,20]);
      d3.selectAll("g.overallG").select("circle").transition().duration(1000)
	.style("fill", function(p) {
	  return colorQuantize(p[datapoint]);
	}).attr("r", function(p) {
	  return radiusScale(p[datapoint]);
	});
    };

    //teamG.on("mouseover", highlightRegion);
    teamG.on("mouseover", highlightRegion2);

    function highlightRegion(d) {
      d3.selectAll("g.overallG").select("circle")
	.style("fill", function(p) {
	  return p.region == d.region ? "red" : "gray";
	});
    };
    /*
    function highlightRegion2(d,i) {
      d3.select(this).select("text").classed("active", true).attr("y", 10);      
      d3.selectAll("g.overallG").select("circle").each(function(p,i) {
	// 마우스 포인터가 올라간 <g> 요소의 "active" 클래스를 활성화하면
	// CSS에 정의된 "g > text.active" 규칙이 적용돼
	// 해당 <g> 요소 안에 들어 있는 텍스트의 폰트가 커진다.
	p.region == d.region ?
	  d3.select(this).classed("active",true)
	  : d3.select(this).classed("inactive",true);
      });
      };
    */
    /*
    function highlightRegion2(d,i) {
      d3.select(this).select("text").classed("active", true).attr("y", 10);      
      d3.selectAll("g.overallG").select("circle")
	.each(function(p, i) {
	  p.region == d.region ?
	    d3.select(this).classed("active",true)
	    : d3.select(this).classed("inactive",true);
	});
      this.parentElement.appendChild(this);
    };
    */
    function highlightRegion2(d,i) {
      var teamColor = d3.rgb("pink");
      d3.select(this).select("text").classed("active", true).attr("y", 10);      
      d3.selectAll("g.overallG").select("circle")
	.style("fill", function(p) {return p.region == d.region ?
				    teamColor.darker(.75) : teamColor.brighter(.5)});
      //this.parentElement.appendChild(this);
    };

    /*
    teamG.on("mouseout", function() {
      d3.selectAll("g.overallG").select("circle").style("fill", "pink");
    });
    */

    teamG.on("mouseout", unHighlight)

    function unHighlight() {
      d3.selectAll("g.overallG").select("circle").attr("class", "");
      d3.selectAll("g.overallG").select("text")
	.classed("active", false).attr("y", 30);
    };


    teamG.select("text").style("pointer-events","none");


    d3.selectAll("g.overallG").insert("image", "text")
      .attr("xlink:href", function(d) {
	return "images/" + d.team + ".png";
      })
      .attr("width", "45px").attr("height", "20px")
      .attr("x", "-22").attr("y", "-10");


    // CSS에 정의된 ID를 갖는 <div> 요소를 새로 만들고
    // modal.html에서 읽은 HTML 내용으로 채운다.
    d3.text("resources/modal.html", function(data) {
      d3.select("body").append("div").attr("id", "modal").html(data);
    });

    teamG.on("click", teamClick);

    // td.data 요소를 선택하고 클릭한 팀의 값으로 갱신한다.
    function teamClick(d) {
      d3.selectAll("td.data").data(d3.values(d))
	.html(function(p) {
	  return p
	});
    };

    
    d3.html("resources/icon.svg", function(data) {console.log(data);});


    d3.html("resources/icon.svg", loadSVG);

    // 데이터 로딩이 완료된 후 loadSVG() 함수에 전달된다.
    function loadSVG(svgData) {
      while(!d3.select(svgData).selectAll("path").empty()) {
	d3.select("svg").node().appendChild(
	  d3.select(svgData).select("path").node());
      }
      d3.selectAll("path").attr("transform", "translate(50,50)");
    };


    function loadSVG(svgData) {
      d3.select(svgData).selectAll("path").each(function() {
	d3.select("svg").node().appendChild(this);
      });
      d3.selectAll("path").attr("transform", "translate(50,50)");
    };


    d3.html("resources/icon_1907.svg", loadSVG);

    function loadSVG(svgData) {
      d3.selectAll("g").each(function() {
	var gParent = this;
	d3.select(svgData).selectAll("path").each(function() {
	  gParent.appendChild(this.cloneNode(true))
	});
      });

      
      d3.selectAll("path").style("fill", "darkred")
	.style("stroke", "black").style("stroke-width", "1px");


      d3.selectAll("g.overallG").each(function(d) {
	d3.select(this).selectAll("path").datum(d)
      });

      var tenColorScale = d3.scale
	.category10(["UEFA", "CONMEBOL", "CAF", "AFC"]);

      d3.selectAll("path").style("fill", function(p) {
	return tenColorScale(p.region)
      }).style("stroke", "black").style("stroke-width", "2px");
      
    };
        
  }
}
