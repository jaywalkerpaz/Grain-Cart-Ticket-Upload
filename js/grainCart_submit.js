//document.getElementsByClassName("createSubmit andNew")[0].click();

fireMouseEvent(document.getElementsByClassName("createSubmit andNew")[0], 'click');

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
