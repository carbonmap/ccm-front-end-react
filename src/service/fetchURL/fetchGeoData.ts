export const fetchFeaturedGeoData = async () => {
    let geoData : Array<any> = [];
    return fetch(`${process.env.REACT_APP_DATABASE_URL}carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Could not retrieve universities list names. 
                    Response status: ${response.status}`
                );
            } else {
                return response.json();
            }
        })
        .then(async (data) => {
            await Promise.all(data.map((uniName: string) => {
                return fetch(`${process.env.REACT_APP_DATABASE_URL}carbonmap/ccm-front-end/master/dummy_data/geojson/${uniName}.geojson`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(
                                `Could not retrieve geo location data for ${uniName}. 
                                 Response status: ${response.status}`
                            );
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {
                        geoData.push(data);
                    })
            }))
            return geoData;
        })
        .then((response) => {
            return geoData;
        })
        .catch((error) => {
            console.log(error);
        });
}