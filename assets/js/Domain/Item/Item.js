/**
 * Item Data Model
 */
 class Item
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

  
    getAllItems()
     {
         return this.items;
     }

    addItem(item)
    {
        this.items.push(item);
    }

 }

var sack       = new Item("sack","sack","", "elongated brown sack, smelling of hot peppers","hot peppers",false, ['open','eat'], "Opening the sack reveals a lunch, and a clove of garlice.","What the heck! You wont make friends this way, but nobody around here is too friendly anyhow. Gulp!<br />",false);
var bottle     = new Item("bottle","bottle","A glass bottle is sitting on the table containing a quantity of water.", "A glass bottle is sitting on the table containing<br />a quantity of water.","a quantity of water", false, ['open','drink'], "opened", "Thank you very much. I was rather thirsty (from all this talking, probably).<br />",false);
var leaflet    = new Item("leaflet","leaflet","", "small leaflet","WELCOME TO ZORK!<br /><br />ZORK is a game of adventure, danger and low cunning.<br />In it you will explore some of the most amazing territory ever seen by mortals.<br />No computer should be without one!",false,["read"], "", "",false);
var mat        = new Item("mat","mat", "A rubber mat saying 'Welcome to Zork!' lies by the door.", "A rubber mat", "", false, [], "","",false);
var egg        = new Item("egg","egg", "In the birds nest is a large egg encrusted with precious jewels, apparently scavenged by a childless songbird.<br /> The egg is covered with fine golf inlay, and ornamented in lapis lazuli and mother-of-pearl.<br /> Unlike most eggs, this one is hinged and closed with a delicate looking clasp.<br /> The egg appears extremely fragile.<br />", "", false, ['use'],"You've opened the egg.<br />", "The egg glimmers, blinds you, and you fall to the ground.<br />",false);
var leaves     = new Item("leaves","grating","On the ground is a pile of leaves.", "","",false, ['use'], "", "You place the grating on the ground. Great..",false);
var sword      = new Item("sword","elven sword","Above the trophy case hangs an elvish sword of great antiquity.", "","",false, ['use','attack'], "You pull the elven sword from you bag and hold it high in the air. It glows with a mystical aura.<br />", "You fiercly swing the sword.<br />",false);
var lantern    = new Item("lantern","brass lantern","A battery-powered brass lantern is on the trophy case.", "","",false, ['use','on', 'off'], "", "The brass lantern is now on.<br />",false);

var itemArray = [
    'sack',
    'bottle',
    'leaflet',
    'egg',
    'leaves',
    'sword',
    'lantern',
];

var itemObjects = {
    'sack': sack,
    'bottle': bottle,
    'leaflet': leaflet,
    'mat': mat,
    'egg': egg,
    'leaves': leaves,
    'sword': sword,
    'lantern': lantern
}