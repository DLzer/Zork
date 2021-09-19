/**
 * Item Data Model
 */
class ItemData
{
    /**
     * The Constructor
     * 
     * @param {string}  varString Single word identifier
     * @param {string}  name Item name
     * @param {string}  specialDesc Item special descriptor
     * @param {string}  description Item simple descriptor
     * @param {string}  contents Item contents ( If more than one )
     * @param {boolean} taken If item has been taken
     * @param {array}   actionArray List of actions an item can provide
     * @param {string}  openDesc Upon opening description
     * @param {string}  useDesc Upon usage description
     * @param {boolean} inUse If item is currently in use
     */
    constructor(
        varString, name, specialDesc, description, contents, taken,actionArray,openDesc,useDesc, inUse
    ) {
        this.varString      = varString;
        this.name           = name;
        this.specialdesc    = specialDesc;
        this.description    = description;
        this.contents       = contents;
        this.taken          = taken;
        this.actionArray    = actionArray;
        this.openDesc       = openDesc;
        this.useDesc        = useDesc;
        this.inUse          = inUse;
    }
}