      
function make_tarea(datos, datos2){

  function createVis1(array, rute) {

    const SVG = d3.select(rute)
      .append("svg")
      .attr("width", 1200)
      .attr("height", 300);
  
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
        .rangeRound([0, 50])
        // .padding(1); // agregar sepación entre el final y el inicio de una banda.
        
        const escalaY = d3
        .scaleLog()
        .domain([1, d3.max(array, d => d.Artwork)])
        .range([0, 100])
       
        
  
        
    const possiblesCattegories = ["A", "B", "C", "D", "E","F"]
    
    const COLOR = d3.scaleOrdinal(d3[`schemeTableau10`])
          .domain(possiblesCattegories)
  
    const grupos = SVG
        .selectAll("g")
        .data(array, d => d.Artist)
        .join(enter => {
            // Creamos un grupo "g"
            const grupos = enter.append("g")
              .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut)
              .on("click", handleClick);
            ;
  
            
            const sizeRect = 40
            grupos.append("rect")
            // .transition()
            // .duration(500)
            .attr('width', d => escalaY(d.Artwork))
            .attr('height', d => escalaY(d.Artwork))
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', "white")
            .transition("change-color")
            .ease(d3.easeBounceOut)
            .duration(500)
            .attr('stroke', (d, i)=> COLOR(i))
            .attr('stroke-width', d => d.Artist/ 200);

            d =>console.log(COLOR(d));
  
            const barra = grupos.append("g");
  
            barra.append("rect")
                .transition()
                .ease(d3.easeBounceOut)
                .duration(1000)
                .attr('class', 'barra')
                .attr('width', 14)
                .attr('height', d => escalaPorcentaje(d.Female))
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', "green")
            barra.append("rect")
                .transition()
                .ease(d3.easeBounceOut)
                .duration(500)
                .attr('class', 'barra')
                .attr('width', 14)
                .attr('height', d => escalaPorcentaje(d.Male))
                .attr('x', 0 )
                .attr('y', d => escalaPorcentaje(d.Female))
                .attr('fill', "orange")
  
            barra.append("rect")
                .transition()
                .ease(d3.easeBounceOut)
                .duration(1000)
                .attr('class', 'barra')
                .attr('width', 14)
                .attr('height', d => escalaPorcentaje(d.Female))
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', "green")

            barra.attr("transform", (d, i) => `translate(${escalaY(d.Artwork)/2 - 7},${ escalaY(d.Artwork)/2 -25 })`)
  
            // // Para cada grupo, le agregamos un texto
            // const text2 = grupos
            //     .append("text")
            //     .attr("x", 10)
            //     .attr("y", 40)
            //     .style("font-size", "10px")
            //     .text("")
  
            grupos.append("text")
                .attr('x', d =>escalaY(d.Artwork)/2 )
                .attr('y',-20)
                .style("margin", "center")
                .style("dominant-baseline", "middle")
                .style("text-anchor", "middle")
                .style("font-size", "10px")
                .text(d => d.Category)

  
            return grupos.attr("transform", (_, i) => `translate(${escalaX(i)}, 40)`)
  
  
        })
  
    function handleMouseOver(d, i) {  // Add interactivity
  
          d3.select(this).append("text")
          .attr('id',"chart")
          .attr('x', 0)
          .attr('y', 150)
          .style("font-size", "10px")
          .text((d => ` hombre ${d.Male} %  mujer ${d.Female} %`));
        }
  
    function handleMouseOut(d, i) {
          
          d3.select("#chart").remove();  // Remove text location
        }
    
    }

    const SVG = d3.select("#vis-2")
          .append("svg")
          .attr("alignment-baseline", "center")
          .attr("width", 800)
          .attr("height", 800);

    function createVis2(artistas, color) {
    
  
      const domain = [...Array(10).keys()];
      
      function dataJoin(array) {
        
        const escalaX = d3
            .scaleBand()
            .domain(domain)
            .rangeRound([0, 800])
            .padding(0.1);
            
        const escalaY = d3
            .scaleBand()
            .domain(domain)
            .rangeRound([0, 800])
            .padding(0.1);
            
  
        const escalaR = d3
            .scaleSqrt()
            .domain([0, d3.max(array, d => d.TotalArtwork)])
            .range([0, 40])
  
        const escalaradio = d3
            .scaleLinear()
            .domain([1, d3.max(array, d => d.TotalArtwork)])
            .range([4, 11])
  
        const escalatallo = d3
            .scaleLinear()
            .domain([1, d3.max(array, d => d.Age)])
            .range([1, 40])
  
        const gruposEnterYUpdate = SVG
            .selectAll("g")
            .data(array, d => d.Artist)
            .join(enter => {
                const grupos = enter.append("g")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .on("click", handleClick);

                grupos.append("text")
                    .attr('x', 4)
                    .attr('y', d =>  - escalaradio(d.TotalArtwork)*(1.5))
                    .style("dominant-baseline", "middle")
                    .style("text-anchor", "middle")
                    .style("font-size", "7px")
                    .text(d => `${d.Artist.slice(0,7)}...` )
  
                grupos.append("circle")
                    .attr('id',"chart2")
                    .attr('r', d => escalaradio(d.TotalArtwork))
                    .attr('cx', 0)
                    .attr('cy', 0)
                    .attr('fill', color)
  
                    .text(d => d.Artist.slice(0, 8))
                
                grupos.append("rect")
                    .attr('class', 'barra')
                    .attr('width', 5)
                    .attr('height', d => escalaradio(d.TotalArtwork) + escalatallo(d.Age))
                    .attr('x', -2.5)
                    .attr('y', d =>  escalaradio(d.TotalArtwork))

                grupos.append("rect")
                    .attr('class', 'barra')
                    .attr('width', 2)
                    .attr('height', 8)
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr("transform", (_, index) => `translate(${0}, ${escalatallo(_.Age)/2 + escalaradio(_.TotalArtwork)})rotate(+135) `)
                
                // const hoja = grupos.append("g")
                
                grupos.filter(d => d.DeathYear == -1).append("path")
                    .attr('id',"chart2")
                    .attr('class', 'barra')
                    .attr('d','M0,0 C2.5,4.0 2.5,7.0 0,10 L0,10 C-2.5,7.0 -2.5,4.0 0,0')
                    .attr("transform", (_, index) => `translate(${-4}, ${escalatallo(_.Age)/2 + escalaradio(_.TotalArtwork) -2})rotate(+135) `)
                    // .attr("transform", rotate)
                    .attr('fill', color)
                    // .attr("transform", (_, index) => `rotate(45deg) `)
                             
              
                
                    

                
                
                const textito = grupos.append("g")
                
                grupos.append("text")
                      .attr('id',"chart")
                      .attr('x', 10)
                      .attr('y', 2)
                      .style("font-size", "4px")
  
                // Retornamos los grupos que por defecto ya tendrán su posición definida.
                return grupos.attr("transform", (_, index) => `translate(${-100}, ${-100})`)
                
              
              },
              update => {update.selectAll("#chart2")
                              .attr("fill", color)
                            return update},

              exit => exit.transition("position")
                
                .duration(500)
                .style("opacity",0)
                .remove())
        
          
  
        // Agregamos una transición para que todos los groupos (g) actualizan la traslación
        // en función de la escalaX. 
        gruposEnterYUpdate
            .transition("position")
            .delay(500)
            .duration(1500)
            .attr("transform", (_, index) => `translate(${escalaX(index % 10)+30}, ${escalaY(Math.floor(index / 10))+10})`)
        
        function handleMouseOver(event,d, i) {  // Add interactivity
  
              d3.select(this).append("text")
              .attr('id',"chart")
              .attr('x', 20)
              .attr('y', 2)
              .style("font-size", "4px")
              .text((d => `Nombre ${d.Artist.slice(0,20)}`));
              
              d3.select(this).append("text")
              .attr('id',"chart")
              .attr('x', 20)
              .attr('y', 6)
              .style("font-size", "4px")
              .text((d => ` Nacionalidad ${d.Nacionality}`));

              d3.select(this).append("text")
              .attr('id',"chart")
              .attr('x', 20)
              .attr('y', 10)
              .style("font-size", "4px")
              .text((d => ` Genero ${d.Gender}`));
          

              d3.select(this).append("text")
              .attr('id',"chart")
              .attr('x', 20)
              .attr('y', 14)
              .style("font-size", "4px")
              .text((d => `Nacio el año :${d.BirthYear}`));
              
              d3.select(this).append("text")
              .attr('id',"chart")
              .attr('x', 20)
              .attr('y', 18)
              .style("font-size", "4px")
              .text((d => `Edad ${d.Age }`));
              
              d3.select(this).append("text")
              .attr('id',"chart")
              .attr('x', 20)
              .attr('y', 24)
              .style("font-size", "4px")
              .text(`${event.offsetX}-${event.offsetY}`)
              
              


            }
            // nombre completo, g ´ enero, nacionalidad, ´fecha de nacimiento y edad
        function handleMouseOut(d, i) {
              
              d3.selectAll("#chart").remove();  // Remove text location
            }  
        function handleClick(event, d){
              console.log(Object.keys(d.Categories))}
           
        SVG.on("mousemove", (event,d,i) => {
                d3.select("h2")
                
              })
                // circle.attr("cx", event.offsetX).attr("cy", event.offsetY);
          }
  
    // Llamamos nuestra función con los datos iniciales
    dataJoin(artistas);
  
    // Me conecto con el selector al evento "change". El cual,
    // cada vez que cambie la opción seleccionada, gatille nuestra función
    d3.select("#orderBy").on("change", (event) => {
        // Obtengo el valor del selector
        const value = event.target.value;
  
        // Hago una copia de los datos originales
        const copy = JSON.parse(JSON.stringify(artistas));
  
        // Si el selector me dice que ordene por nombre, ordeno la copia por el nombre
        if (value == "nombre") {
            copy.sort((a, b) => a.Artist.localeCompare(b.Artist));
            // Llamo a dataJoin con la lista ordenado
            dataJoin(copy);
        }
        // En otro caso, llamo a dataJoin con la lista original
        else {
            dataJoin(copy);
        }
    })
  
  }
        

    function handleClick(event, d,i){
      
      console.log(d.Category)
      const categoria = d.Category
      // console.log(d.getAttribute('stroke'))
      console.log(event.target.attributes.stroke.value)
      const colorcito = event.target.attributes.stroke.value
      function categomatch(elemento) {
        return  categoria in elemento;
      }

      const datos3 = datos2.filter( l => Object.keys(l.Categories).includes(categoria))
      console.log(datos3)
      console.log(categoria)
      createVis2(datos3.filter((l,i) =>  ( Math.random() > 0.7  )).slice(0, 100 ), colorcito);
      // console.log(datos2.filter( d => d.Categories.))
      // filtrar por artistas que tengan obrqa
    }



    createVis1(datos, "#vis-1")

    
}
            
function calculaedad (x, y) {
  if (y == -1) { return 2022 - x}
  else {return y-x}
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
    Age: calculaedad(d.BirthYear, d.DeathYear),
    TotalArtwork: parseInt(d.TotalArtwork),
    Categories: JSON.parse((d["Categories"].replace(/^"|"$/g, ''))),
  });

function runCode() {

    const URL1= "https://gist.githubusercontent.com/Hernan4444/16a8735acdb18fabb685810fc4619c73/raw/d16677e2603373c8479c6535df813a731025fd4a/CategoryProcessed.csv"
    const URL2 = "https://raw.githubusercontent.com/jeschuwirth/base-de-datos-infovis/4b3a8728d1d768ef69bf4535cb516d122040fa1f/T2/ArtistProcessed.csv"

    
    
    d3.csv(URL1, parseo1)
      .then((datos) => {
        console.log(datos);
        // joinDeDatos1(datos);
        d3.csv(URL2, parseo2)
        .then((datos2) => {
          console.log(datos2);
          console.log(datos2["Categories"]);
          make_tarea(datos, datos2)
        })
       .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }


runCode();





