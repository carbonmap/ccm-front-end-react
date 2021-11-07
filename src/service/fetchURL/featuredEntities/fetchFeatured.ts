export const fetchFeatured = async() => {
    let responses:string[] = [];
    let featuredEntities:{id: string, name: string, emissions: string[]}[] = [];

    // featuredEntities = await fetch("https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json")
    featuredEntities = await fetch(`${process.env.REACT_APP_DATABASE_URL}carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        // .then(async (data: any) => {
            // featuredEntities = await Promise.all(data.map((url: string) => {
            //     return fetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/${url}.json`)
            //         .then(response => {
            //             if(!response.ok) {
            //                 throw new Error(`HTTP error! status: ${response.status}`);
            //             }
            //             return response.json();
            //         })
            //         .then(data => {
            //             responses.push(data);
            //             return responses;
            //         })
            // }))
        // })

    return featuredEntities;
};