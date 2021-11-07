export const fetchIndividualEntity:any = async(entityID:string) => {
    try {
        // const response = await fetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/${entityID}`);
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}carbonmap/ccm-front-end/master/dummy_data/${entityID}`);
        const data = await response.json();
        return data;
    } 
    catch(error) {
        console.log(error);
        return false;
    }
};