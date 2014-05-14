(function() {
  var margin = {top: 0, right: 25, bottom: 0, left: 25},
    width = 150 - margin.left - margin.right, //960
    height = 20 - margin.top - margin.bottom;

  var chart = d3.bullet()
      .width(width)
      .height(height);

  d3.json("js/bullets.json", function(error, data) {
    console.log(chart);
    var svg = d3.select(".chart0").selectAll("svg")
        .data(data)
      .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(chart);

        var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + height / 2 + ")");
  });
})();