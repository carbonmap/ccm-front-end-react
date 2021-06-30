export const fetchFeatured = (setFeaturedEntities: any, setIsLoading: any) => {
    let responses:string[] = [];

    fetch("https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/index.json")
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(async (data: any) => {
            await Promise.all(data.map((url: string) => {
                return fetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/reporting_entities/${url}.json`)
                    .then(response => {
                        if(!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        responses.push(data);
                        setFeaturedEntities(responses);
                    })
            }))
        })
        .then(() => setIsLoading(false))
};