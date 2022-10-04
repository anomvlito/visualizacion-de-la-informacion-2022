function createVis1(array, rute) {

  const SVG = d3.select(rute)
    .append("svg")
    .attr("width", 1000)
    .attr("height", 400);

  const domain = [...Array(7).keys()]; // Creamos una lista de 0 al 9

    // Definimos escala de bandas para poner cada dato.
  const escalaX = d3
      .scaleBand()
      .domain(domain)
      .rangeRound([0, 1000])
      .padding(1); // agregar sepación entre el final y el inicio de una banda.


  const escalaPorcentaje = d3
      .scaleLinear()
      .domain([0,100])
      .rangeRound([0, 30])
      // .padding(1); // agregar sepación entre el final y el inicio de una banda.

  const escalaY = d3
      .scaleLog()
      .domain([1, d3.max(array, d => d.Artwork)])
      .range([0, 100])


  const grupos = SVG
      .selectAll("g")
      .data(array, d => d.Artist)
      .join(enter => {
          // Creamos un grupo "g"
          const grupos = enter.append("g")
          ;

          // Para cada grupo, le agregamos un círculo


          // Para cada grupo, le agregamos un cuadrado
          const sizeRect = 40
          grupos.append("rect")
          .attr('width', d => escalaY(d.Artwork))
          .attr('height', d => escalaY(d.Artwork))
          .attr('x', 0)
          .attr('y', 0)
          .attr('fill', "white")
          .attr('stroke', "green")
          .attr('stroke-width', d => d.Artist/ 200);

          // grupos.append("circle")
          //     .attr('r', d => d.Female)
          //     .attr('cx', d => escalaY(d.Artwork)/2)
          //     .attr('cy', d => escalaY(d.Artwork)/2)
          //     .attr('fill', "blue")
          // // Para cada grupo, le agregamos una barrita

          const barra = grupos.append("g");

          barra.append("rect")
              .attr('class', 'barra')
              .attr('width', 15)
              .attr('height', d => escalaPorcentaje(d.Male))
              .attr('x', d => escalaY(d.Artwork)/2 - 10)
              .attr('y', d =>escalaY(d.Artwork)/2 -10)
              .attr('fill', "orange")
          barra.append("rect")
              .attr('class', 'barra')
              .attr('width', 15)
              .attr('height', d => escalaPorcentaje(d.Female))
              .attr('x', d => escalaY(d.Artwork)/2 - 10)
              .attr('y', d =>escalaY(d.Artwork)/2 -10 - escalaPorcentaje(d.Female))
              .attr('fill', "green")

          // // Para cada grupo, le agregamos un texto
          const text2 = grupos
              .append("text")
              .attr("x", 10)
              .attr("y", 40)
              .style("font-size", "10px")
              .text("")

          grupos.append("text")
              .attr('x', 25)
              .attr('y',-20)
              .style("dominant-baseline", "middle")
              .style("text-anchor", "middle")
              .style("font-size", "10px")
              .text(d => d.Category)

          // retornamos nuestros grupo ques aprovechamos de aplicar una traslación a
          // cada uno en el eje X.

          grupos.on('mouseover', (d) => {
            const porcentajes = `${d.Male}`
            d3.select("g").append("text")
            .attr('x', -25)
            .attr('y', 100)
            .attr("class", "mylabel")
            .style("font-size", "10px")
            .text(porcentajes)
            console.log("Your mouse went over")
            console.log(this.parentNode)
              // .text2.text(`Posición en el SVG ${d.Male}-${d => d.Female}`)
                
                // .attr('stroke-width',3)
            })
          grupos.on('mouseout',(d) => {
              d3.selectAll(".mylabel").remove()
              console.log("Your mouse salio")
                // .text2.text("")
            })

          return grupos.attr("transform", (_, i) => `translate(${escalaX(i)}, 40)`)
      })


  }


const parseo1 = (d) => (
     {
    // categoria: d.categoria,
    // frecuencia: parseInt(d.frecuencia),
    Category: d["Category"],
    Artist: parseInt(d.Artist),
    Artwork: parseInt(d.Artwork),
    Male: parseInt((+d.Male/(+d.Male + +d.Female)) * 100),
    Female: Math.abs( 100 - parseInt((+d.Male/(+d.Male + +d.Female)) * 100)),
  });

const parseo2 = (d) => (
     {
    Artist: d.Artist,
    Nacionality: d.Nacionality,
    Gender: d.Gender,
    BirthYear: parseInt(d["BirthYear"]),
    DeathYear: parseInt(d.DeathYear),
    TotalArtwork: parseInt(d.TotalArtwork),
    Categories: JSON.parse((d["Categories"].replace(/^"|"$/g, ''))),
  });

function runCode() {

    const URL1= "https://gist.githubusercontent.com/Hernan4444/16a8735acdb18fabb685810fc4619c73/raw/d16677e2603373c8479c6535df813a731025fd4a/CategoryProcessed.csv"
    const URL2 = "https://raw.githubusercontent.com/jeschuwirth/base-de-datos-infovis/4b3a8728d1d768ef69bf4535cb516d122040fa1f/T2/ArtistProcessed.csv"

    d3.csv(URL1, parseo1)
      .then((datos) => {
        console.log(datos);
        createVis1(datos, "#vis-1")
        // joinDeDatos1(datos);
      })
      .catch((error) => console.log(error));

    d3.csv(URL2, parseo2)
      .then((datos) => {
        console.log(datos);
        // joinDeDatos(datos);
      })
      .catch((error) => console.log(error));
}


runCode();



