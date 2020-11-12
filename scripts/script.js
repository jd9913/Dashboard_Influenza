

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
const color4 = '#00ccaf';
const fontColor = '#504F4F';


const MARGIN = { LEFT: 100, RIGHT: 100, TOP: 100, BOTTOM: 500 }
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 1000 - MARGIN.TOP - MARGIN.BOTTOM


const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
    
    

    //X Label
g.append("text")
.attr("class", "x_axis-label")

// .attr("x", WIDTH/2)
// .attr("y", HEIGHT+110)
.style("font", "20px times")
.attr("text-anchor", "middle")
.text("Date of Visit")

//Y Label

g.append("text")
.attr("class", "y_axis-label")
.attr("x", -(HEIGHT/2))
.attr("y", -60)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text("2020 Suspected or Positive Influenza ED")


d3.csv("../Data/Influenza.csv").then(data => {
    data.forEach(d => {
        d.influenza_ED = Number(d.influenza_ED)
        d.DataDate=new Date(d.DataDate)
 
    })
  
    const x = d3.scaleBand()
        .domain(data.map(d => d.DataDate))
        .range([0, WIDTH])
        .paddingInner(0.3)
        .paddingOuter(0.2)

        

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.influenza_ED)])
        .range([HEIGHT, 0])

     
        const xAxisCall=d3.axisBottom(x)
        g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "25")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

        const yAxisCall=d3.axisLeft(y)
        .ticks(d=>d.influenza_ED)
        .tickFormat(d=>d+"patients")
        g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall)

    const rects = g.selectAll("rect")
        .data(data)

    rects.enter().append("rect")
        .attr("y", d=> y(d.influenza_ED))
        .attr("x", (d) => x(d.DataDate))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT-y(d.influenza_ED))
        .attr("fill", "blue")

})