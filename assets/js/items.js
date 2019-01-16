var GameItem = function(var_string, name, specialdesc, desc, contents, taken,actionArr,openDesc,useDesc,itemInUse,) {
    this.var_string     = var_string;
    this.name           = name;
    this.specialdesc    = specialdesc;
    this.desc           = desc;
    this.contents       = contents;
    this.taken          = taken;
    this.acctionArr     = actionArr;
    this.openDesc       = openDesc;
    this.useDesc        = useDesc;
    this.itemInUse      = itemInUse;
};

var sack       = new GameItem("sack","sack","", "elongated brown sack, smelling of hot peppers<br />","hot peppers",false, ['open','eat'], "Opening the sack reveals a lunch, and a clove of garlice.","What the heck! You wont make friends this way, but nobody around here is too friendly anyhow. Gulp!<br />",false);
var bottle     = new GameItem("bottle","bottle","A glass bottle is sitting on the table containing a quantity of water.<br />", "A glass bottle is sitting on the table containing<br />a quantity of water.","a quantity of water", false, ['open','drink'], "opened", "Thank you very much. I was rather thirsty (from all this talking, probably).<br />",false);
var leaflet    = new GameItem("leaflet","leaflet","", "small leaflet","WELCOME TO ZORK!<br /><br />ZORK is a game of adventure, danger and low cunning.<br />In it you will explore some of the most amazing territory ever seen by mortals.<br />No computer should be without one!",false,["read"], "", "",false);
var mat        = new GameItem("mat","mat", "A rubber mat saying 'Welcome to Zork!' lies by the door.<br />", "A rubber mat", "", false, [], "","",false);
var egg        = new GameItem("egg","egg", "In the birds nest is a large egg encrusted with precious jewels, apparently scavenged by a childless songbird.<br /> The egg is covered with fine golf inlay, and ornamented in lapis lazuli and mother-of-pearl.<br /> Unlike most eggs, this one is hinged and closed with a delicate looking clasp.<br /> The egg appears extremely fragile.<br />", "", false, ['use'],"You've opened the egg.<br />", "The egg glimmers, blinds you, and you fall to the ground.<br />",false);
var leaves     = new GameItem("leaves","grating","On the ground is a pile of leaves.<br />", "","",false, ['use'], "", "You place the grating on the ground. Great..",false);
var sword      = new GameItem("sword","elven sword","Above the trophy case hangs an elvish sword of great antiquity.<br />", "","",false, ['use','attack'], "You pull the elven sword from you bag and hold it high in the air. It glows with a mystical aura.<br />", "You fiercly swing the sword.<br />",false);
var lantern    = new GameItem("lantern","brass lantern","A battery-powered brass lantern is on the trophy case.<br />", "","",false, ['use','on', 'off'], "", "The brass lantern is now on.<br />",false);
var itemArray = [
    'sack',
    'bottle',
    'leaflet',
    'egg',
    'leaves',
    'sword',
    'lantern'
];