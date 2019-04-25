// 리스트 9.4 내포된 데이터 비교

var nestedTweets = d3.nest()
                     .key(function (el) {return el.user})
                     .entries(incData);

// 같은 데이터를 가졌지만, 별개의 객체다.
var nestedTweets2 = d3.nest()
                      .key(function (el) {return el.user})
                      .entries(incData);

packableTweets = {id: "root", values: nestedTweets};

nestedTweets.value[0] == nestedTweets2.value[0] // true
nestedTweets[0] == nestedTweets2[0]		// false
packableTweets.values[0] == nestedTweets[0]	// true
packableTweets.values[0] == nestedTweets2[0]	// false
