import axios from 'axios';

const API = 'http://localhost:3000';

export const fetchCityList = async () => {
    const { data } = await axios.get(API + '/hotel/city');
    return data;
}



export const fetchRoomType = async () => {
    const { data } = await axios.get(API + '/room/room-type');
    return data;
}



export const fetchTopRoomList = async () => {
    const { data } = await axios.get(API + '/hotel/top-rate');
    return data;
}



export const fetchHotelDetail = async (id) => {
    const { data } = await axios.get(API + '/hotel/detail/' + id)
    return data;
}


export const fetchAllHotel = async () => {
    const { data } = await axios.get(API + '/hotel');
    return data;
}

export const fetchEmptyRoom = async (id, dateStart, dateEnd) => {
    const { data } = await axios.get(API + '/room/empty-room?id=' + id + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd);
    return data
}


export const fetchTransactions = async (id) => {
    const { data } = await axios.get(API + '/transaction?user_id=' + id);
    return data;
}

export const fetchAllTransactions = async () => {
    const { data } = await axios.get(API + '/all-transactions');
    return data;
}


export const createUser = async (dataUser) => {
    const { data } = await axios.post(API + '/createUser', {
        dataUser
    })
    return data
}

export const createHotel = async (dataHotel) => {
    const { data } = await axios.post(API + '/hotel/add-hotel', {
        dataHotel
    })
    return data;
}


export const createNewRoom = async (dataRoom) => {
    const { data } = await axios.post(API + '/room/add-room', {
        dataRoom
    })
    return data;
}



export const updateRoomHotel = async (dataUpdate) => {
    const { data } = await axios.post(API + '/hotel/update-room-hotel', {
        dataUpdate
    });
    return data;
}

export const updateHotel = async (dataUpdate) => {
    const { data } = await axios.post(API + '/hotel/update-hotel', {
        dataUpdate
    })
    return data
}


export const deleteHotel = async (idHotel) => {
    const { data } = await axios.post(API + '/hotel/delete-hotel', {
        idHotel
    });
    return data;
}


export const searchHotel = async (adult, child, city, dateStart, dateEnd) => {
    const { data } = await axios.get(API + '/search?adult=' + adult + '&child=' + child + '&city=' + city + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd);
    return data;
}

export const reverseRoom = async (dataBooked) => {
    const { data } = await axios.post(API + '/transaction/add', {
        dataBooked
    })
    return data;
}


export const auth = async (dataAuth) => {
    const { data } = await axios.post(API + '/auth', {
        dataAuth
    })
    return data;
}

export const isAuth = async () => {
    const { data } = await axios.get(API + '/auth');
    return data;
}

export const logOutUser = async (logoutUser) => {
    const { data } = await axios.post(API + '/logout', {
        logoutUser
    });
    return data;
}



export const isSucessAddUser = async () => {
    const { data } = await axios.get(API + '/createUser');
    return data
}
