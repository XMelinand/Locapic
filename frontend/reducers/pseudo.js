export default function (pseudo = '', action) {
    if (action.type == "savePseudo") {
        console.log('reducer pseudo',action.pseudo);
    
    return action.pseudo;
    } else {
    return pseudo;
    }
}