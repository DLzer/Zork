/**
 * 
 * Rooms is an object defining the look, items and name of a room
 * 
 * @param {string} name 
 * @param {string} look 
 * @param {string} items 
 */

var Rooms = function(name, look, items) {
    this.name = name;
    this.look = look;
    this.items = items;
    this.visited = false;
};

/**
 * 
 * Add exit creates an exit solution for the room object.
 * 
 * @param {string} direction 
 * @param {string} exit
 */
Rooms.prototype.addExit = function(direction, exit) {
    
    switch(direction){

        case "north":
            this.north = exit;
            break;

        case "northeast":
            this.northeast = exit;
            break;

        case "east":
            this.east = exit;
            break;

        case "southeast":
            this.southeast = exit;
            break;

        case "south":
            this.south = exit;
            break;

        case "southwest":
            this.southwest = exit;
            break;

        case "west":
            this.west = exit;
            break;

        case "northwest":
            this.northwest = exit;
            break;

        case "up":
            this.up = exit;
            break;

        case "down":
            this.down = exit;
            break;
        case "enter":
            this.enter = exit;
            break;
        case "open":
            this.open = exit;
            break;
        case "climb":
            this.climb = exit;
            break;
    }
};

// North of House
var northOfHouse = new Rooms("North of House", "You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.", []);

// Forest Path
var forestPath =  new Rooms("Forest Path", "This is a path winding through a dimly lit forest. The path heads north-south here.<br /> One particulary large tree with some low branches stands at the edge of the path.", [tree]);

// Forest
var forest_one = new Rooms("Forest", "This is a dimly lit forest, with large trees all around", []);

// Forest
var forest_two = new Rooms("Forest", "This is a forest, with trees in all directions.<br />To the east, there appears to be light.", []);

//Storm Tossed Impass
var stormTossed = new Rooms("Forest", "Storm-tossed trees block your way.", []);

// South of House
var southOfHouse = new Rooms("South of House", "You are facing the south side of a white house.<br /> There is no door here, and all the windows are boarded", []);

// West of House
var westOfHouse = new Rooms("West of House", "This is an open field west of a white house, with a boarded front door.", [mailbox, mat]);
westOfHouse.visited = true;

// East of House
var eastOfHouse = new Rooms("East Side of House", "The door is boarded and you can't remove the boards.",[]);

// Behind House
var behindHouse = new Rooms("Behind House", "You are behind the white house. A path leads into the forest to the east. <br />In one corner of the house there is a small window which is slightly ajar.",[]);

// Window Behind House
var windowBehindHouse = new Rooms("Behind House", "You are behind the white house. A path leads into the forest to the east. <br />In one corner of the house there is a small window which is open.",[]);

// Kitchen
var kitchen = new Rooms("Kitchen", "You are in the kitchen of a the white house. A table seems to have been used recently for the<br />preparation of food. A passage leads to the west and a dark staircase can be seen leading upward.<br /> A dark chimney leads down and to the east is a small window which is open.<br />",[sack, bottle]);

// Mailbox
var mailbox = new Rooms("Mailbox", "Opening the mailbox reveals a leaflet.",[leaflet]);

// Tree
var tree = new Rooms("Up A Tree", "You are about 10 feet above the ground nestled among some large branches.<br />The nearest branch above you is out of reach. Besides you on the branch is a small birds nest.", [egg]);

// Forest One
forest_one.addExit("south", stormTossed);
// North of House
northOfHouse.addExit("east", behindHouse);
northOfHouse.addExit("south", westOfHouse);
northOfHouse.addExit("north", forestPath);
northOfHouse.addExit("west", westOfHouse);
//Forest Path
forestPath.addExit("south", northOfHouse);
forestPath.addExit("climb", tree);
// Tree
tree.addExit("climb",forestPath);
// South of House
southOfHouse.addExit("north", westOfHouse);
southOfHouse.addExit("south", forest_one);
southOfHouse.addExit("east", behindHouse);
southOfHouse.addExit("west", westOfHouse);
// East of House
eastOfHouse.addExit("south", southOfHouse);
eastOfHouse.addExit("west", westOfHouse);
// West of House
westOfHouse.addExit("north", northOfHouse);
westOfHouse.addExit("south", southOfHouse);
westOfHouse.addExit("east", eastOfHouse);
westOfHouse.addExit("west", forest_two);
westOfHouse.addExit("open", mailbox)
// Mailbox
mailbox.addExit("north", northOfHouse);
mailbox.addExit("south", southOfHouse);
mailbox.addExit("east", eastOfHouse);
mailbox.addExit("west", forest_two);
//Behind House
behindHouse.addExit("open", windowBehindHouse);
//Window Behind House
windowBehindHouse.addExit("enter", kitchen);



