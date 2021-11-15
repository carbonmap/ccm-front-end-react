export const fetchIndividualEntityData:any = async(dataType:string, entityID:string, fileType:string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DATABASE_URL}/${dataType}/${entityID}.${fileType}`);
        const data = await response.json();
        return data;
    } 
    catch(error) {
        console.log(error);
        return false;
    }
};