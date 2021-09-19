/**
 * Room Service
 */
class RoomService extends RoomData
{

    constructor()
    {
        this.rooms = [];
    }

    storeRooms(room)
    {
        this.rooms.push(room);
    }


    getAllRooms()
    {
        return this.rooms;
    }

}