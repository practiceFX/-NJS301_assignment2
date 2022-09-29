const handleAmount = (amount) => {
    let amountArray = amount.split('-');
    for (let i = 0; amountArray.length > i; i++) {
        amountArray[i] = parseInt(amountArray[i]);
    }
    return amountArray;
}


exports.handleObjectRoom = (objectArray) => {
    const room = [];
    objectArray.forEach(object => {
        object.room.map((item) => {
            room.push(item)
        })
    })
    return room
}


exports.handleObjectTitle = (objectArray) => {
    const roomTitle = [];
    objectArray.forEach(object => {
        roomTitle.push(object.title);
    })
    return roomTitle;
}