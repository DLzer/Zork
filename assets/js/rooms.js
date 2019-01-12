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
        case "exit":
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
var forestPath =  new Rooms("Forest Path", "This is a path winding through a dimly lit forest. The path heads north-south here.<br /> One particulary large tree with some low branches stands at the edge of the path.", []);

// Forest ( 1 ) 
var forest_one = new Rooms("Forest", "This is a dimly lit forest, with large trees all around", []);

// Forest ( 2 ) 
var forest_two = new Rooms("Forest", "This is a forest, with trees in all directions.<br />To the east, there appears to be light.", []);

// Forest ( 3 ) 
var forest_three = new Rooms("Forest", "This is a dimly lit forest, with large trees all around.", []);

// Forest ( 4 ) 
var forest_four = new Rooms("Forest", "The forest thins out, revealing impassable mountains.", []);


//Storm Tossed Impass
var stormTossed = new Rooms("Forest", "Storm-tossed trees block your way.", []);

// South of House
var southOfHouse = new Rooms("South of House", "You are facing the south side of a white house.<br /> There is no door here, and all the windows are boarded", []);

// West of House
var westOfHouse = new Rooms("West of House", "This is an open field west of a white house, with a boarded front door.", [mailbox, mat]);
westOfHouse.visited = true;

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

// North clearing
var northClearing = new Rooms("Clearing", "You are in a clearing, with a forest surrounding you on all sides. A path leads south.", [leaves]);

// East clearing
var eastClearing = new Rooms("Clearing", "You are in a small clearing in a well marked forest path that extends to the east and west.", []);

// Canyon View
var canyonView = new Rooms("Canyon View", "You are at the top of the Great Canyon on its west wall.<br />From here there is a marvelous view of the canyon and parts of the Frigid River upstream. Across the canyon, the walls of the White Cliffs join the mighty ramparts of the Flathead Mountains to the east.<br /> Following the Canyon upstream to the north, Aragain Falls may be seen, complete with rainbow.<br /> The mighty Frigid River flows out from a great dark cavern. To the west and south can be seen an immense forest, stretching for miles around. A path leads northwest.<br > It is possible to climb down into the canyon from here.", []);

// East clearing
var rockyLedge = new Rooms("Rocky Ledge", "You are on a ledge about halfway up the wall of the river canyon.<br />You can see from here that the main flow from Aragain Falls twists along a passage which it is impossible for you to enter.<br />Below you is the canyon bottom. Above you is more cliff, which appears climbable.", []);

// canyonBottom
var canyonBottom = new Rooms("Canyon Bottom", "You are beneath the walls of the river canyon which may be climbable here.<br />The lesser part of the runoff of Aragain Falls flows by below. To the north is a narrow path.", []);

// canyonBottom
var endOfRainbow = new Rooms("End of Rainbow", "You are on a small, rocky beach on the continuation of the Frigid River past the Falls.<br /> The beach is narrow due to the presence of the White Cliffs. The river canyon opens here and sunlight shines in from above.<br />A rainbow crosses over the falls to the east and a narrow path continues to the southwest.", []);

// Chimney
var chimney = new Rooms("Chimney", "You have moved into a dark place.<br />It is pitch black. You are likely to be eaten by a grue.",[]);


// Forest One
forest_one.addExit("south", stormTossed);
forest_one.addExit("north", southOfHouse);
// Storm Tossed Forest
stormTossed.addExit("north", forest_one);
// North of House
northOfHouse.addExit("east", behindHouse);
northOfHouse.addExit("south", westOfHouse);
northOfHouse.addExit("north", forestPath);
northOfHouse.addExit("west", westOfHouse);
//Forest Path
forestPath.addExit("south", northOfHouse);
forestPath.addExit("climb", tree);
forestPath.addExit("up", tree);
forestPath.addExit("north", northClearing);
// North Clearing
northClearing.addExit("west", forest_two);
northClearing.addExit("east", forest_three);
northClearing.addExit("south", forestPath);
// Forest ( 2 )
forest_two.addExit("east", forestPath);
forest_two.addExit("north", northClearing);
forest_two.addExit("south", westOfHouse);
// Forest ( 3 )
forest_three.addExit('west', forestPath);
forest_three.addExit('east', forest_four);
// Forest ( 4 )
forest_four.addExit('west', forestPath);
// Tree
tree.addExit("climb",forestPath);
tree.addExit("down",forestPath);
tree.addExit("south",northOfHouse);
// South of House
southOfHouse.addExit("north", westOfHouse);
southOfHouse.addExit("south", forest_one);
southOfHouse.addExit("east", behindHouse);
southOfHouse.addExit("west", westOfHouse);
// West of House
westOfHouse.addExit("north", northOfHouse);
westOfHouse.addExit("south", southOfHouse);
westOfHouse.addExit("east", behindHouse);
westOfHouse.addExit("west", forest_two);
westOfHouse.addExit("open", mailbox)
// Mailbox
mailbox.addExit("north", northOfHouse);
mailbox.addExit("south", southOfHouse);
mailbox.addExit("east", behindHouse);
mailbox.addExit("west", forest_two);
//Behind House
behindHouse.addExit("open", windowBehindHouse);
behindHouse.addExit("south", southOfHouse);
behindHouse.addExit("west", westOfHouse);
behindHouse.addExit("east", eastClearing);
// East Clearing
eastClearing.addExit("west", behindHouse);
eastClearing.addExit("east", canyonView);
// Canyon View
canyonView.addExit("west", eastClearing);
canyonView.addExit("east", rockyLedge);
canyonView.addExit("climb", rockyLedge);
canyonView.addExit("down", rockyLedge);
// Rocky Ledge
rockyLedge.addExit("west", canyonView);
rockyLedge.addExit("up", canyonView);
rockyLedge.addExit("down", canyonBottom);
rockyLedge.addExit("climb", canyonBottom);
// Canyon Bottom
canyonBottom.addExit("up", rockyLedge);
canyonBottom.addExit("climb", rockyLedge);
canyonBottom.addExit("north", endOfRainbow);
//End of Rainbow
endOfRainbow.addExit("south", canyonBottom);
//Window Behind House
windowBehindHouse.addExit("enter", kitchen);
// Kitchen
kitchen.addExit("exit", behindHouse);
kitchen.addExit("up", chimney);
// Chimney
chimney.addExit("down", kitchen);





