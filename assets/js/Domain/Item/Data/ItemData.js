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
     * @param {string}  specialdesc Item special descriptor
     * @param {string}  desc Item simple descriptor
     * @param {string}  contents Item contents ( If more than one )
     * @param {boolean} taken If item has been taken
     * @param {array}   actionArr List of actions an item can provide
     * @param {string}  openDesc Upon opening description
     * @param {string}  useDesc Upon usage description
     * @param {boolean} itemInUse If item is currently in use
     */
    constructor(
        varString, name, specialdesc, desc, contents, taken,actionArr,openDesc,useDesc, inUse
    ) {
        this.varString      = varString;
        this.name           = name;
        this.specialdesc    = specialdesc;
        this.desc           = desc;
        this.contents       = contents;
        this.taken          = taken;
        this.acctionArr     = actionArr;
        this.openDesc       = openDesc;
        this.useDesc        = useDesc;
        this.inUse          = inUse;
    }
}