//get data

const getData = () => {
    $.get("../data/Influenza.json", (hospitalData) => {
        let influenzaDataClean = Object.values(hospitalData);
        
        graph(influenzaDataClean);
    })
}

getData();


let lineED = []; // array to hold data for ED line on line chart
let lineVent = []; //array to hold data for vent in use line on line chart
let lineInpt = []; //array to hold data for inpatients line on line chart
let lineIcu = []; //array to hold data for icu line on line chart

//variables for the colors on the charts

const color3 = '#590995';
const color2 = '#03C4A1';
const color1 = '#C62A88';
const color4 = '#150485';
const fontColor = '#504F4F';

//referencing the DOM to place the line chart in the appropriate place
const fluLineEl = document.getElementById('fluLine');

//variables for the labels on the line chart

let xAxisLabels = []; //variable for the x axis labels
let labelED = ['ED'];
let labelVent = ['Vents'];
let labelInpt = ['Inpatients'];
let labelIcu = ['ICU'];

//put current date in the header near the title;

function getCurrentDay() {
    const event = new Date(Date.now());
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let currentDay = event.toLocaleDateString(undefined, options);

    $('#currentDay').text(currentDay);
}


//place the current day/date in the header field

getCurrentDay();


function graph(data1) {

    //adding the date filter to only pull dates with valid data

    let dateFilter = '10/28/2020';

   $('#asOfDate').text(dateFilter);



    let validData = data1.filter(function (data, i) {
        return new Date(dateFilter) <= new Date(data.DataDate);
    })

    //sort array ascending function
    let data = validData.sort(function (a, b) {
        let date1 = new Date(a.DataDate);
        let date2 = new Date(b.DataDate);
        return (date1 - date2);
    });


    //populate the variables with data for the line graph

    lineED = data.map((d) => {
        return (d.influenza_ED);
    });

    lineInpt = data.map((d) => {
        return (d.influenza_inpatients);
    });

    lineVent = data.map((d) => {
        return (d.influenza_vent);
    });

    lineIcu = data.map((d) => {
        return (d.influenza_ICU);
    });



    xAxisLabels = data.map((d) => {
        return new Date(d.DataDate).toLocaleDateString('month');
    });

    //create the options variable for the chart

    let lineOptions = {

        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        pointDot: true,
        pointDotRadius: 4,
        layout: {
            padding: 0,
        },
        responsive: true,
        legend: {
            display: true,
            position: 'bottom',

            Labels: {
                fontColor: fontColor,
                fontFamily: "'Arial','sans-serif', 'Helvetica'",
                fontSize: 10,
                generateLabels: true,
            }
        }
    }
    //variable for the line graph

    let ctxLine = fluLineEl;

    let influenzaLine = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: xAxisLabels,
            datasets: [
                {
                    label: labelIcu,
                    data: lineIcu,
                    fill: false,
                    borderColor: color1
                },
                {
                    label: labelED,
                    data: lineED,
                    fill: false,
                    borderColor: color2
                },
                {
                    label: labelInpt,
                    data: lineInpt,
                    fill: false,
                    borderColor: color3
                },
                {
                    label: labelVent,
                    data: lineVent,
                    fill: false,
                    borderColor: color4
                }
            ]

        },
        options: lineOptions

    });

}
    //stacked bar chart as a function of total capacity in each area

    const fluCapacityEl = document.getElementById('fluCapacity');

   //stacked bar chart data








