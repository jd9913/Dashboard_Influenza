

function getCurrentDay() {
    const event = new Date(Date.now());
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let currentDay = event.toLocaleDateString(undefined, options);

    $('#currentDay').text(currentDay);
}

getCurrentDay();

//place the current day/date in the header field

const color1 = '#FF00FF';
const color2 = '#00FACC';
const color3 = '#FFCC00';
const color4='#00ccaf';
const fontColor = '#504F4F';


const svg=d3.select("#chart-area").append("svg")
.attr("width", 400)
.attr("height", 400)


d3.csv("../Data/Influenza.csv").then(data=>{
    
    data.forEach(d=>{
        d.influenza_ED=Number(d.influenza_ED);
        // d.influenza_ICU=Number(d.influenza_ICU)
        // d.influenza_inpatients=Number(d.influenza_inpatients)
        // d.influenza_vent=Number(d.influenza_vent)
    })

    const y =d3.scaleLinear()
    .domain([0, 1000])
    .range([0, 1000])

    const rects=svg.selectAll("rect")
    .data(data)

    rects.enter().append("rect")
    .attr("y", 0)
    .attr("x", (d,i)=>(i*60))
    .attr("height", d=>d.influenza_ED)
    .attr("fill", "blue")

   console.log(d);
    
}).catch(err=>{
console.log(err);

})