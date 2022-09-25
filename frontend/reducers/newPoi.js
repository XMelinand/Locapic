import AsyncStorage from '@react-native-async-storage/async-storage';

export default function (newPoi = [], action) {
    if (action.type == "savePOI") {
        console.log('add object', action.poi);

    return action.poi
    } else if (action.type == 'deletePOI'){
        console.log('del object', action.POI);
        
        var moidifiedNewPoi = newPoi.filter(e => e.title != action.POI.title)
        AsyncStorage.setItem("AddPOI", JSON.stringify(moidifiedNewPoi))

        return (moidifiedNewPoi)
    } 
    else {
    return newPoi;
    }
}