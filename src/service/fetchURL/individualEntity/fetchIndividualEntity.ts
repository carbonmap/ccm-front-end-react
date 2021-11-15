export const fetchIndividualEntity:any = async(entityID:string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}${entityID}`);
        const data = await response.json();
        return data;
    } 
    catch(error) {
        console.log(error);
        return false;
    }
};