var itemService = new ItemService();
var roomService = new RoomService();

var items = '/data/items.json';
var rooms = '/data/rooms.json';

seed(items, itemSeeder);
seed(rooms, roomSeeder);

// Fetch the stored data and pass it to the callback
function seed(data, seedType)
{
    fetch(data)
    .then(response => {
        return response.json();
    })
    .then(data => seedType(data));
}

// Iterate through items and save them in the game instance
function itemSeeder(data) {
    for ( var i=0; i < data.length; i++ )
    {
        let item = new ItemData(
            data.varString,
            data.name,
            data.specialDesc,
            data.description,
            data.contents,
            data.taken,
            data.actionArray,
            data.openDesc,
            data.useDesc,
            data.inUse
        );
        itemService.storeItems(item);
    }
}

// Iterate through rooms and save them in the game instance
function roomSeeder(data) {
    for ( var i=0; i < data.length; i++ )
    {
        let room = new RoomData(
            data.varName,
            data.name,
            data.look,
            data.items,
            data.visited,
            data.roomIsDark,
            data.darkText
        );
        roomService.storeRooms(room);
    }
}