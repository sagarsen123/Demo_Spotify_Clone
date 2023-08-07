
const inititalState = {
    login : false,
    userToken : null,
    isPlaying : false,
    listingofweeksongs : [],
    currIdx : -1,
    playingSongs : true,
}

const loginAndLogout = (state = inititalState ,action ) =>{
    switch(action.type) {
        case 'login' : return state.login=true;
        case 'logout' : return state.login =false;
        case 'updateToken' : return {
            ...state,
            userToken : action.payload
        }
        case 'playSong' : return {
            ...state,
            isPlaying : true
        }
        case 'stopSong' : return {
            ...state,
            isPlaying : false
        }
        case 'playsongs' :       
        return {
            ...state,
            listingofweeksongs : action.payload
        }
        case "playingSongs" : return {
            ...state,
            playingSongs : true
        }
        case "pausingSongs" : return {
            ...state,
            playingSongs : false
        }
        case "currTrackIdx" : return {
            ...state,
            currIdx : action.payload
        }
        default : return state;
    }
}

export default loginAndLogout;