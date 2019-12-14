var vImport = arguments[0];

var vTicketNumber = vImport[0];
var vTicketDate = vImport[1];
var vTicketTime = vImport[2];
var vTicketField = vImport[3];
var vTicketOperator = vImport[4];
var vTicketSplitTickets = vImport[5];
var vTicketSupplyingEquipment = vImport[6];
var vTicketReceivingEquipment = vImport[7];
var vTicketLoadedWeight = vImport[8];
var vTicketUnloadedWeight = vImport[9];
var vTicketFieldComplete = vImport[10];
var vTicketReceivingOperator = vImport[11];
var vTicketDeliveryLocation = vImport[12];
var vTicketStorageBin = vImport[13];
var vTicketTestWeight = vImport[14];
var vTicketMoisture = vImport[15];
var vTicketDamage = vImport[16];
var vTicketForeignMatter = vImport[17];
var vTicketPurity = vImport[18];
var vTicketProtein = vImport[19];
var vTicketNotes = vImport[20];

//Moisture
vTicketMoisture = vTicketMoisture.replace('%', '');
document.getElementById('cart-ticket-create_entity_testMoisture').value = vTicketMoisture;

//Ticket Number
if (vTicketNumber && vTicketNumber.length > 0) {
    document.getElementById('cart-ticket-create_entity_ticketNumber').value = vTicketNumber;
}

//Date
var date = new Date(vTicketDate);
document.getElementById('fillInDate').value = ((((date.getMonth().toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()));

//Time
var time = vTicketTime;
var hours = Number(time.match(/^(\d+)/)[1]);
webFill(document.getElementById('hours'), hours);
var minutes = Number(time.match(/:(\d+)/)[1]);
webFill(document.getElementById('minutes'), minutes);
var AMPM = time.match(/([AaPp][Mm])$/)[1];
setSelectedValue(document.getElementById('ampm'), AMPM);

//Operator
setSelectedValue(document.getElementById('operatorSelect'), vTicketOperator);

//Split Tickets
var vSplitTickets = vTicketSplitTickets;
if (vSplitTickets == "Full Load") {
    vSplitTickets = "Full Truck";
}

setSelectedValue(document.getElementById('cart-ticket-create_entity_split'), vSplitTickets);

//Supplying Equipment
setSelectedValue(document.getElementById('cart-ticket-create_entity_supplyingEquipment'), vTicketSupplyingEquipment);

//Loaded Weight
var loadedWeight = parseFloat(vTicketLoadedWeight.replace(',', ""));
document.getElementById('cart-ticket-create_entity_grossWeight').value = loadedWeight;

//Unloaded Weight
var unloadedWeight = parseFloat(vTicketUnloadedWeight.replace(',', ""));
document.getElementById('cart-ticket-create_entity_tareWeight').value = unloadedWeight;

//Field Complete
if (vTicketFieldComplete == 'Yes' || vTicketFieldComplete == 'YES' || vTicketFieldComplete == 'Y' || vTicketFieldComplete == 'yes') {
    document.getElementById('cart-ticket-create_entity_fieldComplete').checked = true;
}

// Delivery Location
setSelectedValue(document.getElementById('cart-ticket-create_entity_receivingLocation'), vTicketDeliveryLocation);

fireMouseEvent(document.getElementById('cart-ticket-create_entity_receivingLocation'), 'change');

// NOTES
document.getElementById('cart-ticket-create_entity_notes').value = vTicketNotes;


// FUNCTIONS ///////////////////////////////////////////

//FILL WEB FIELD
function webFill(vElement, vWebVariable) {
    if (vWebVariable != null) {
        vElement.value = vWebVariable;
    }
}

// function definition
function setSelectedValue(object, value) {
    object.focus();
    for (var i = 0; i < object.options.length; i++) {
        if (object.options[i].text === value) {
            object.options[i].selected = true;
            var event = new Event('change');
            object.dispatchEvent(event);
            return;

        }
    }
    // Throw exception if option `value` not found.
    var tag = object.nodeName;
    var str = value;
    return str;
}

function fireMouseEvent(obj, evtName) {
    if (obj.dispatchEvent) {
        //var event = new Event(evtName);
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent(evtName, true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        obj.dispatchEvent(event);
    } else if (obj.fireEvent) {
        event = document.createEventObject();
        event.button = 1;
        obj.fireEvent("on" + evtName, event);
        obj.fireEvent(evtName);
    } else {
        obj[evtName]();
    }
}
