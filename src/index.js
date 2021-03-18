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
        'Southmost', 'Greener', 'wonderful',
    ]
}
const logIt = (txt) => {
    console.log(txt)
}

logIt(citiesGuinea)
logIt(otherGuineanCities)
logIt('Testing this');