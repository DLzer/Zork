/**
 * Player Data Model
 */
class PlayerData
{
    /**
     * The Constructor
     * 
     * @param {array}    inventory 
     * @param {integer}  moves 
     * @param {RoomData} currentLocation 
     * @param {string}   locationDescription 
     */
    constructor(inventory, moves, currentLocation, locationDescription)
    {
        this.inventory           = inventory;
        this.moves               = moves;
        this.currentLocation     = currentLocation;
        this.locationDescription = locationDescription;
    }
}