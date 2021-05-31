const fetchGeoData = () : Array<any> => {
    let geoData : Array<any> = [];
    fetch("https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json")
        .then((response) => {
            if (!response.ok) {
                console.error(
                    `Could not retrieve universities list names. 
                    Response status: ${response.status}`
                );
            }
            return geoData;
        })
        .then(async (data) => {
            await Promise.all(data.map((uniName: string) => {
                return fetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/geojson/${uniName}.geojson`)
                    .then(response => {
                        if (!response.ok) {
                            console.error(
                                `Could not retrieve geo location data for ${uniName}. 
                                 Response status: ${response.status}`
                            );
                        }
                        return geoData;
                    })
                    .then(data => {
                        return data;
                    })
            }))
        })
    return geoData;
}

export default fetchGeoData;