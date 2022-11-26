
width = 1000
height = 1000

console.log(2)


var canvas = d3.select("vis-1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
        .attr("transform", "translate(50,50");

var pack = d3.layout.pack()
    .size([width, height -50])
    .padding(10);


    
d3.json("mydata.json")
    .then((datos) => {
    var nodes = pack.nodes(datos);
      console.log(datos);
    //   joinDeDatos(datos);
    

    var node = canvas.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")";});

    node.append("circle")
        .attr("r", function (d) {return d.r; }) 
        .attr("fill", "red")    
        .attr("opacity", 0.25)
        .attr("",)    
        .attr("stroke", "#ADADAD")
        .attr("stroke-width", "2");

    node.append("text")
        .text(function (d) {return d.children ? "": d.name })

}).catch((error) => console.log(error))