/**
 * Room Data Model
 */
class RoomData
{   
    /**
     * The Constructor
     * 
     * @param {string}  varName The room identifier
     * @param {string}  name The room name
     * @param {string}  look The outward facing description of the room
     * @param {array}   items The list of Items in the room
     * @param {bool}    isDark Is the room dark
     */
    constructor(varName, name, look, items, isDark)
    {
        this.varName    = varName;
        this.name       = name;
        this.look       = look;
        this.items      = items;
        this.visited    = false;
        this.isDark     = isDark;
        this.darkText   = "You have moved into a dark place.<br />It is pitch black. You are likely to be eaten by a grue.<br />";
    }
}