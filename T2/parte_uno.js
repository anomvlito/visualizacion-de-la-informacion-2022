      
function make_tarea(datos, datos2){

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
        .rangeRound([0, 45])
        // .padding(1); // agregar sepación entre el final y el inicio de una banda.
        
        const escalaY = d3
        .scaleLog()
        .domain([1, d3.max(array, d => d.Artwork)])
        .range([0, 100])
       
        
  
        
    const possiblesCattegories = ["A", "B", "C", "D", "E"]
    
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
            .attr('stroke', d => COLOR(d))
            .attr('stroke-width', d => d.Artist/ 200);
  
            // grupos.append("circle")
            //     .attr('r', d => d.Female)
            //     .attr('cx', d => escalaY(d.Artwork)/2)
            //     .attr('cy', d => escalaY(d.Artwork)/2)
            //     .attr('fill', "blue")
            // // Para cada grupo, le agregamos una barrita
  
            const barra = grupos.append("g");
  
            barra.append("rect")
                .transition()
                .ease(d3.easeBounceOut)
                .duration(500)
                .attr('class', 'barra')
                .attr('width', 15)
                .attr('height', d => escalaPorcentaje(d.Male))
                .attr('x', d => escalaY(d.Artwork)/2 - 10)
                .attr('y', d =>escalaY(d.Artwork)/2 -10)
                .attr('fill', "orange")
  
            barra.append("rect")
                .transition()
                .ease(d3.easeBounceOut)
                .duration(1000)
                .attr('class', 'barra')
                .attr('width', 15)
                .attr('height', d => escalaPorcentaje(d.Female))
                .attr('x', d => escalaY(d.Artwork)/2 - 10)
                .attr('y', d => escalaY(d.Artwork)/2 - 10 - escalaPorcentaje(d.Female))
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
            // const porcentajeshombre = (   ) 
            
            
  
            // grupos.on('mouseover', (d) => {
              
            //   d3.select("g").append("text")
            //   .attr('x', -25)
            //   .attr('y', 100)
            //   .attr("class", "mylabel")
            //   .style("font-size", "10px")
            //   .text(porcentajeshombre)
            //   console.log("Your mouse went over")
            //   console.log(this.parentNode)
            //     // .text2.text(`Posición en el SVG ${d.Male}-${d => d.Female}`)
                  
            //       // .attr('stroke-width',3)
            //   })
            // grupos.on('mouseout',(d) => {
            //     d3.selectAll(".mylabel").remove()
            //     console.log("Your mouse salio")
            //       // .text2.text("")
            //   })
  
            // grupos.on("click", (event, d, a) => {
  
            //     grupos.attr('fill', (dato) => {
            //         return dato.Artist == d.Artist ? 'tomato' : 'skyblue';
            //     }))
  
            return grupos.attr("transform", (_, i) => `translate(${escalaX(i)}, 40)`)
  
  
        })
  
        function handleMouseOver(d, i) {  // Add interactivity
  
          // Use D3 to select element, change color and size
          
  
          // Specify where to put label of text
          d3.select(this).append("text")
          .attr('id',"chart")
          .attr('x', 0)
          .attr('y', 150)
          .style("font-size", "10px")
          .text((d => ` hombre ${d.Male} %  mujer ${d.Female} %`));
        }
  
    function handleMouseOut(d, i) {
          // Use D3 to select element, change color back to normal
          // d3.select(this).attr({
          //   fill: "black",
            
          // });
  
          // Select text by id and then remove
          d3.select("#chart").remove();  // Remove text location
        }
    // grupos.on('mouseover', (d) => {
              
    //   d3.select(this).append("text")
    //     .attr('x', -25)
    //     .attr('y', 100)
    //     .attr("class", "mylabel")
    //     .style("font-size", "10px")
    //     .text((d => ` hombre ${d.Male} %  mujer ${d.Female} %`))
    //     console.log("Your mouse went over")
    //     console.log(d =>d.Male)
    //       // .text2.text(`Posición en el SVG ${d.Male}-${d => d.Female}`)
              
    //           // .attr('stroke-width',3)
    //       })
    //   grupos.on('mouseout',(d) => {
    //       d3.selectAll(".mylabel").remove()
    //       console.log("Your mouse salio")
    //         // .text2.text("")
    //     })
    }

    const SVG = d3.select("#vis-2")
          .append("svg")
          .attr("width", 800)
          .attr("height", 2000);

    function createVis2(artistas) {
    
  
      const domain = [...Array(10).keys()];
      // const SVG2 = d3.select(rute)
      //   .append("svg")
      //   .attr("width", 1000)
      //   .attr("height", 2000);
  
      // const escalaradio = d3
      //   .scaleLinear()
      //   .domain([1, d3.max(array, d => d.TotalArtwork)])
      //   .range([0, 100])
      
      // const escalaX2 = d3
      //   .scaleLinear()
      //   .domain(array.map((d, i) => i))
      //   .range([0, 900])
  
      // const escalaY2 = d3
      //   .scaleLinear()
      //   .domain([0, 8964/10])
      //   .range([0, 2000])
  
      
    
      // // const domain = [...Array(7).keys()]; // Creamos una lista de 0 al 9
    
      //   // Definimos escala de bandas para poner cada dato.
      
    
      // const escalaPorcentaje = d3
      //     .scaleLinear()
      //     .domain([0,100])
      //     .rangeRound([0, 45])
      //     // .padding(1); // agregar sepación entre el final y el inicio de una banda.
    
  
      // const possiblesCattegories = ["A", "B", "C", "D", "E"]
      
      // const COLOR = d3.scaleOrdinal(d3[`schemeTableau10`])
      //       .domain(possiblesCattegories)
    
      // const grupos2 = SVG2
      //     .selectAll("g")
      //     .data(array, d => d.Artist)
      //     .join(enter => {
      //         // Creamos un grupo "g"
      //         const grupos2 = enter.append("g");
      //           // .on("mouseover", handleMouseOver)
      //           // .on("mouseout", handleMouseOut);
              
      //         grupos2.append("circle")
      //             // .transition()
      //             // .ease(d3.easeBounceOut)
      //             .selectAll(".statick-circles")
      //             .attr('r', d => d.TotalArtwork)
      //             .attr('cx', (d, i) => Math.floor(i / 3))
      //             .attr('cy', (d, i) => i % 3)
      //             .attr('fill', "orange")
      //         // // Para cada grupo, le agregamos una barrita
    
      //         const barra = grupos2.append("g");
    
      //         // barra.append("rect")
      //         //     .transition()
      //         //     .ease(d3.easeBounceOut)
      //         //     .duration(500)
      //         //     .attr('class', 'barra')
      //         //     .attr('width', 15)
      //         //     .attr('height', d => escalaPorcentaje(d.Male))
      //         //     .attr('x', d => escalaY(d.Artwork)/2 - 10)
      //         //     .attr('y', d =>escalaY(d.Artwork)/2 -10)
      //         //     .attr('fill', "orange")
      function dataJoin(array) {
        // El código es casi identico al de createVis1
  
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
            .range([5, 10])
  
        
  
        const gruposEnterYUpdate = SVG
            .selectAll("g")
            .data(array, d => d.Artist)
            .join(enter => {
                const grupos = enter.append("g");
  
                grupos.append("circle")
                    .attr('r', d => escalaradio(d.TotalArtwork))
                    .attr('cx', (dato, index) => 0)
                    .attr('cy', (dato, index) => 0)
                    .attr('fill', "orange")
  
                // const sizeRect = 20
                // grupos.append("rect")
                //     .attr('width', sizeRect)
                //     .attr('height', sizeRect)
                //     .attr('x', 25 - sizeRect / 2)
                //     .attr('y', 10)
  
                // grupos.append("rect")
                //     .attr('class', 'barra')
                //     .attr('width', 5)
                //     .attr('height', d => escalaY(d.TotalArtwork))
                //     .attr('x', 25 - 5 / 2)
                //     .attr('y', 35)
  
                // grupos.append("text")
                //     .attr('x', 25)
                //     .attr('y', d => 35 + escalaY(d.TotalArtwork) + 20)
                //     .style("dominant-baseline", "middle")
                //     .style("text-anchor", "middle")
                //     .text(d => d.Artist.slice(0, 8))
  
                // Retornamos los grupos que por defecto ya tendrán su posición definida.
                return grupos.attr("transform", (_, index) => `translate(${-100}, ${-100})`)
              
              },
              update => update)
  
        // Agregamos una transición para que todos los groupos (g) actualizan la traslación
        // en función de la escalaX. 
        gruposEnterYUpdate
            .transition("position")
            .delay(1000)
            .duration(3000)
            .attr("transform", (_, index) => `translate(${escalaX(index % 10)}, ${escalaY(Math.floor(index / 10))})`)
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
        

    function handleClick(event, d){
      console.log(d.Category)
      console.log(datos2)
      createVis2(datos2.filter(d => Math.random() > 0.7).slice(0, 100 ));
      // filtrar por artistas que tengan obrqa
    }



    createVis1(datos, "#vis-1")

    
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
        // joinDeDatos1(datos);
        d3.csv(URL2, parseo2)
        .then((datos2) => {
          console.log(datos2);
          make_tarea(datos, datos2)
        })
       .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }


runCode();



