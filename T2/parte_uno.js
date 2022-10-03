// Creamos un SVG en body.
const svg = d3.select("body").append("svg");

// Creamos una función que se encarga de actualizar el SVG según los datos que llegan.
function joinDeDatos1(datos) {
  // Definimos el ancho y largo del SVG.
  svg.attr("width", 50 + datos.length * 100).attr("height", 500);

  // Vinculamos los datos con cada elemento rect con el comando join.
  const enter_and_update = svg.append("g")
    .selectAll("g")
    .data(datos)
    .join((enter) => enter{
        let g = enter

        g.append('g')

        g.append("rect")
        .attr("width", (d) => (d.Artwork/1000))
        .attr("fill", "orange")
        .attr("height", (d) => (d.Artwork/100))
        .attr("x", (_, i) => 50 + i * 80)
        },
        (update) => update,
        (exit) => exit
        .transition()
        .duration(1000)
        .attr("height", 0)
        .remove() 
    )
}


const parseo1 = (d) => (
     {
    // categoria: d.categoria,
    // frecuencia: parseInt(d.frecuencia),
    Category: d["Category"],
    Artist: parseInt(d.Artist),
    Artwork: parseInt(d.Artwork),
    Male: parseInt(d.Male),
    Female: parseInt(d.Female),
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
    
    // const BASE_URL = "https://gist.githubusercontent.com/Hernan4444/";
    // const URL = BASE_URL + "16a8735acdb18fabb685810fc4619c73/raw/d16677e2603373c8479c6535df813a731025fd4a/ArtistProcessed.csv"
    
    const URL1= "https://gist.githubusercontent.com/Hernan4444/16a8735acdb18fabb685810fc4619c73/raw/d16677e2603373c8479c6535df813a731025fd4a/CategoryProcessed.csv"
    const URL2 = "https://raw.githubusercontent.com/jeschuwirth/base-de-datos-infovis/4b3a8728d1d768ef69bf4535cb516d122040fa1f/T2/ArtistProcessed.csv"
    
    d3.csv(URL1, parseo1)
      .then((datos) => {
        console.log(datos);
        joinDeDatos1(datos);
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



