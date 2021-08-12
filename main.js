// Query Select Search Button
const searchButton = document.querySelector('#search');

// API Req on Event Listener Search Button - Click / API Request API request to Mapbox using the data in the 'API key' and 'Address' text inputs
searchButton.addEventListener('click', async () => {

    // Make Base URL for API request
    const baseURLMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const baseURLSatPass = 'https://satellites.fly.dev/passes/'

    //Query select value of api key and address text inputs
    const apiKey = document.querySelector('#api-key');
    const address = document.querySelector('#address');
    const norad = document.querySelector('#norad')

    //Empty Variables
    let mapBoxData = '';
    let satPassData = '';
    let satPassDataFixed = '';

    // API Request Function
    async function mapBoxAPIRequest() {
        const rawMapBoxData = await fetch(baseURLMapBox + encodeURI(address.value) + '.json?access_token=' + apiKey.value)
        mapBoxData = await rawMapBoxData.json()
        console.log(mapBoxData.features[0].center[0]);
        console.log(mapBoxData.features[0].center[1]);
        return mapBoxData
    }

    // Call API Request Function - Store return
    mapBoxData = await mapBoxAPIRequest();

    // coordinates
    const latitude = mapBoxData.features[0].center[1];
    const longitude = mapBoxData.features[0].center[0];


    // Query Select html tags prior to displaying my results
    const rise = document.querySelector('#rise')
    const culmination = document.querySelector('#culmination')
    const set = document.querySelector('#set')

    // API Request Satellite 
    async function satPassAPIRequest() {

        // baseURLSatPass + norad.value + '?lat=' + latitude + '&lon=' + longitude + '&limit=1'
        // 'https://satellites.fly.dev/passes/25544?lat=34.0544&lon=-118.2439&limit=1'

        const rawSatPassData = await fetch(baseURLSatPass + norad.value + '?lat=' + latitude + '&lon=' + longitude + '&limit=1');

        const satPassData = await rawSatPassData.json();
        return satPassData;
    }

    // Call API Request - Store return
    satPassData = await satPassAPIRequest();

    function getSatPassData() {

        for (let data of satPassData) {
            satPassDataFixed = data;
        }

        return satPassDataFixed;

    };

    // Call get Satpass
    getSatPassData();

    console.log(satPassDataFixed)

    // Store Rise, Culmination and Set from Satellite
    const riseData = satPassDataFixed.rise.utc_datetime;
    const culminationData = satPassDataFixed.culmination.utc_datetime;
    const setData = satPassDataFixed.set.utc_datetime;

    rise.innerHTML = riseData;
    culmination.innerHTML = culminationData;
    set.innerHTML = setData;


    const resultSection = document.querySelector('.resultSection')
    resultSection.style.display = "inline";

})
// API
