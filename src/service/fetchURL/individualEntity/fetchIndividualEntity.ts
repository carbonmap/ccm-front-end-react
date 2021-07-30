export const fetchIndividualEntity:any = async(entityID:string) => {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/carbonmap/ccm-front-end/master/dummy_data/${entityID}`);
        const data = await response.json();
        return data;
    } 
    catch(error) {
        alert("Sorry, something went wrong when trying to find this location. Please try again later")
        console.log(error);
    }
};