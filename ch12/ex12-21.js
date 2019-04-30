// 리스트 12.21 다중부분 내포

function nestPhoneData() {
  // 내포하면 value 속성을 덮어쓰므로 새로운 속성에 복사해놓는다.
  for (x in data) {
    data[x].oValue = data[x].value;
  }

  // 위치와 형태를 바탕으로 내포된 데이터셋을 만든다.
  nestedData = d3.nest()
                 .key(function (d) {return d.location})
                 .key(function (d) {return d.type})
                 .entries(data);

  // 내포된 데이터를 서클 팩의 루트 노드에 할당한다.
  packableData =
    {id: "root", key: "All Real Estate", values: nestedData}
}
