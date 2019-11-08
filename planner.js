// (Done)render the date and time in the header   moment.js library
// (Done)color code red = current, green= future, grey =past
// able to save to the local storage
// (Done)clean up the css
// add calendar selector
let daySchedule = {};

$("#currentDay").text(currentDate());
renderDayPlanner();
renderSchedule();

function renderSchedule() {
    const storedSchedule = JSON.parse(localStorage.getItem("today"));
    // console.log(localStorage.getItem("today"));
    if (storedSchedule) {
        daySchedule = storedSchedule;
        renderHourSchedule();
    }
    else {
        for (let i = 5; i < 18; i++) {
            daySchedule[i] = "";
        }
        renderHourSchedule();
    }
}

$(".container").on("click", "button", function () {
    const inputID = $(this).parents().eq(1).attr('id'); 
    // console.log($(`#${inputID} textarea`)[0]);
    const textValue = $(`#${inputID} textarea`).eq(0).val();
    if (textValue) {
        daySchedule[inputID] = textValue;
        localStorage.setItem("today", JSON.stringify(daySchedule));
    }

})

function renderHourSchedule() {
    for (let [key, value] of Object.entries(daySchedule)) {
        $(`#${key} textarea`).eq(0).val(value);
    }
}


function currentDate() {
    
    return moment().format('dddd, MMMM Do, YYYY');
}

function getCurrentHour() {
    return moment().hour();
}


function renderDayPlanner() {
    for (let i = 9; i < 12; i++) {
        renderInputGroup(i, "a.m", i);
    }
    renderInputGroup(12, "p.m", 12);

    for (let i = 1; i < 6; i++) {
        renderInputGroup(i, "p.m", 12 + i);
    }

}

function renderInputGroup(hour, amPM, militaryHour) {
    const inputPrepend = $("<div>").addClass("input-group-prepend hour-entry").append($("<span>").addClass("hour col-sm-12").text(hour + " " + amPM));
    //const inputPrepend = $(`<span Class="hour col-sm-12"> ${hour} ${amPM} </span>`).appendTo('<div class="input-group-prepend hour-entry"></div>');
    var inputField = $("<textarea>").addClass("form-control").attr("aria-label", "Task details").attr("field-id", `${hour}${amPM}`);
    if (getCurrentHour() === militaryHour) {
        inputField.addClass("present");
    }
    else if (getCurrentHour() <= militaryHour) {
        inputField.addClass("future");
    }
    else {
        inputField.addClass("past");
    }
    //const inputAppend = $("<div>").addClass("input-group-apppend hour-entry").append($("<button>").addClass("btn btn-outline-secondary col-sm-12 saveBtn").html('<i class="far col-sm-12 fa-save"></i>'));
    const inputAppend = $('<div class="input-group-apppend hour-entry"><button class = "btn btn-outline-secondary col-sm-12 saveBtn"><i class="far col-sm-12 fa-save"></i></button></div>').appendTo('<div class="input-group-apppend hour-entry"></div>');

    const newInputGroup = $("<div>").addClass("input-group").attr("id", `${militaryHour}`).append(inputPrepend, inputField, inputAppend);
    $(".container").append(newInputGroup);
}