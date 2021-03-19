import './assets/css/index.scss';
const citiesGuinea = {
    cityName: 'Lola',
    regionName: 'South East Guinea',
    specificities: [
        'gorgeous', 'crossroad', 'montaneous'
    ]
}
const otherGuineanCities = {
    ...citiesGuinea,
    cityName: 'N\'Zerekore',
    regionName: 'South East Guinea',
    specificities: [
        'Large', 'old', 'central'
    ],
    cityName: 'Yomou',
    regionName: 'South East Guinea',
    specificities: [
        'Southmost', 'Greener', 'Excellent',
    ]
}
const logIt = (txt) => {
    if(typeof txt === 'object'){
        for (const city in txt) {
            console.log(txt[city])
        }
    } 
    if (typeof txt === 'string'){
    console.log(txt)
    }
}

logIt(citiesGuinea)
logIt(otherGuineanCities)
logIt('Emmanuel Bamba');