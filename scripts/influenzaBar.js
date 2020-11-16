const getData2 = () => {
    $.get("../data/InfluenzaBar.json", (barData) => {
        let influenzaDataClean = Object.values(barData);
       console.log(influenzaDataClean)
        barGraph(influenzaDataClean);
    })
}

getData2();



function barGraph(data){


const margin={left:30, right: 0, bottom: 30, top: 10}
const width=900;
const height=500;



    let xScale=d3.scaleBand(
        data.map(d=>d.DataDate),
        [margin.left, width-margin.right]
    ).padding(.2)

    let yScale=d3.scaleLinear(
        [0, d3.max(data, d=>d.totCapED)],
        [height-margin.bottom, margin.top]

    )

    let xAxis=d3.axisBottom(xScale)
    .tickSizeOuter(0)

    let yAxis=d3.axisLeft(yScale)

let stackGen=d3.stack()
.keys(Object.keys(data[0]).filter(k=>k!==DataDate));

let series=stack(data);

let colors=d3.scaleOrdinal(d3.schemeGnBu[9].slice(3))
.domain(series.map(s=>s.key))

let legend=d3.legendColor()
.shapeWidth(70)
.orient('horizontal')
.scale(color);

d3.select('#legend')
.call(legend);






    }