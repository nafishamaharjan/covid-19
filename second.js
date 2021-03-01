//1 select all element
const country_Name=document.querySelector(".country-box .loading");
const totalCases=document.querySelector(".total-cases .value");
const infectedCases=document.querySelector(".infected .value");
const recoveredCases=document.querySelector(".recovered .value");
const deathsCases=document.querySelector(".deaths .value");
const ctx = document.getElementById("axes_line_chart").getContext("2d");
const datess=document.querySelector(".datas");

//2  variables
let cases_list=[],
recovered_data=[],
death_data=[],
infected_list=[],
dates=[];
// get user country code
let country_name= geoplugin_countryName();
let user_country;
country_list.forEach(country=>{
    if(country.Name=country_name){
        user_country=country.Name;
    }
    console.log(user_country);
});

// 3 fetch ApI
function fetchData(country) {
  user_country = country;
  country_Name.innerHTML = "Loading...";
  // country_Name.innerHTML = user_country;

  (cases_list = []),
    recovered_data = [],
    death_data = [],
    infected_list=[],
    (dates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch("https://pomber.github.io/covid19/timeseries.json",
      requestOptions
    )
      .then(res => 
         res.json()
      )
      .then((data) => {
         console.log(data);
        data[`${country}`].forEach(({date,confirmed,deaths,recovered}) => {
          
          dates.push(date);
          cases_list.push(confirmed);
          recovered_data.push(recovered);
          death_data.push(deaths);
        
        });
      });

    updateUI();
  };

  api_fetch(country);
}

fetchData(user_country);
function updateUI() {
  updateStats();
 axesLinearChart();
}
function updateStats() {
  const total_cases = cases_list[cases_list.length-1];
  const recovered_cases = recovered_data[recovered_data.length-1];
  const infected_cases=total_cases-recovered_cases;
  const deaths_cases = death_data[death_data.length-1];
  const date = dates[dates.length-1];totalCases.innerHTML = total_cases;
    recoveredCases.innerHTML = recovered_cases;
    deathsCases.innerHTML = deaths_cases;
    infectedCases.innerHTML=infected_cases;
    datess.innerHTML = date;
    country_Name.innerHTML= user_country;
  

}


let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "black",
          backgroundColor: "black",
          borderWidth: 1,
        },
        {
          label: "Recovered",
          data: recovered_data,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
        },
        {
          label: "Deaths",
          data: death_data,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
          borderWidth: 1,
        },
      ],
      labels:dates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

