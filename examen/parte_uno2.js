const margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        `translate(${margin.left}, ${margin.top})`);

// read json data



d3.json("https://raw.githubusercontent.com/anomvlito/visualizacion-de-la-informacion-2022/main/examen/anime.json")
.then(function(data) {

  // Give the data to this cluster layout:
  console.log(data)
  const root = d3.hierarchy(data).sum(function(d){ return d.votos/1000}) // Here the size of each leave is given in the 'value' field in input data
  console.log(root)
  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    .padding(1)
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('name', function (d) { return d.name; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "slateblue")
      .attr("fill", "slateblue")
      // .style("fill", "slateblue").selectAll("rect[name='Gon']")

  

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name })
      .attr("font-size", "15px")
      .attr("fill", "white")
})