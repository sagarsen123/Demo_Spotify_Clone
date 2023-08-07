

export const loginUser = () => {
    return {
        type : "login"
    }
}


export const logOutUser = () => {
    return {
        type : 'logout'
    }
}


export const updateToken = (token) => {
    return {
        type : 'updateToken',
        payload : token
    }
}

export const playSong = () => {
    return {
        type : 'playSong',
    }
}

export const stopSong = () => {
    return {
        type : 'stopSong',
       
    }
}

export const updatePlaySongs = (Songs) => {

    return {
        type : 'playsongs',
        payload : {Songs}
    }
}

export const playingSongs = () => {
   
    return {
        type : 'playingSongs',
    }
}




export const pausingSongs = () => {
   
    return {
        type : 'pausingSongs',
    }
}

export const currTrackIdx = (currIdx) =>{
    return {
        type : 'currTrackIdx',
        payload : currIdx
    }
}