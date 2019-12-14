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

//Storage Location
if (document.getElementById('cart-ticket-create_entity_targetEquipment').disabled == false) {
    setSelectedValue(document.getElementById('cart-ticket-create_entity_targetEquipment'), vTicketStorageBin);
}

//Field
// This uses a specific function to find the beginning of the Field string, because the system tags on extra strings after the field name.
setSelectedField(document.getElementById('crop'), vTicketField);

// Receiving Operator
setSelectedValue(document.getElementById('cart-ticket-create_entity_receivingOperator'), vTicketReceivingOperator);

//Receiving Equipment
// This function has specific translations for the customer
recEquip(vTicketReceivingEquipment);

function recEquip(receivingEquipment) {
    var recEquipment;
    switch (receivingEquipment) {
        case 'BLUE STRIPER':
            recEquipment = 'Semi - Blue Striper';
            break;
        case 'INTERNATIONAL':
            recEquipment = 'Semi - International';
            break;
        case 'RED FREIGHTLINER':
            recEquipment = 'Semi - Red Freightliner';
            break;
        case 'VOLVO':
            recEquipment = 'Semi - Volvo';
            break;
        case 'WHITE VOLVO':
            recEquipment = 'Semi - Volvo';
            break;
        case 'WHITE FREIGHTLINER':
            recEquipment = 'Semi - White Freightliner';
            break;
        case 'WHITE GMC':
            recEquipment = 'Semi - White GMC';
            break;
        default:
            recEquipment = vTicketReceivingEquipment;
    }
    setSelectedValue(document.getElementById('cart-ticket-create_entity_receivingEquipment'), recEquipment);
}


// FUNCTIONS ///////////////////////////

//SET SELECTED VALUE
// setSelectedValue
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

// SET SELECTED FIELD
function setSelectedField(object, value) {
    if (value) {
        object.focus();
        for (var i = 0; i < object.options.length; i++) {
            if (object.options[i].text.startsWith(value)) {
                object.options[i].selected = true;
                var event = new Event('change');
                object.dispatchEvent(event);
                return;
            }
        }
    }
    fireMouseEvent(object, value);
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
