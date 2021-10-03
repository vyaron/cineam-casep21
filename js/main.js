'use strict';

// TODO: Render the cinema (7x15 with middle path)
// TODO: Support selecting a seat
// TODO: Only a single seat should be selected
// TODO: Support Unselecting a seat
// TODO: When seat is selected a popup is shown
// TODO: Popup shows the seat identier - e.g.: 3-5 or 7-15
// TODO: Popup should contain seat price (for now 4$ to all) 
// TODO: allow booking the seat ('S', 'X', 'B')
// TODO: Uplift your model - each seat should have its own price... 

// On You:
// TODO: in seat details, show available seats count around 
// TODO: Price is kept only for 10 seconds 

var gElSelectedSeat = null;
var gCinema
var gBookingTimeout;

function init() {
    gCinema = createCinema();
    renderCinema();
}


function createCinema() {
    var cinema = [];
    for (var i = 0; i < 7; i++) {
        cinema[i] = [];
        for (var j = 0; j < 15; j++) {
            var cell = {type: 'SEAT', price: i + 10, isBooked : false}
            if (j === 7) cell = {type: 'EMPTY'}
            cinema[i][j] = cell;
        }
    }
    return cinema;    
}
function renderCinema() {
    var strHTML = '';
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`
        for (var j = 0; j < gCinema[0].length; j++) {
            var cell = gCinema[i][j];
            var className = '';
            if (cell.type === 'SEAT') {
                className += 'seat '
                if (cell.isBooked) className += 'booked'
            }
            // TODO: for cell that is booked add booked class
            strHTML += `\t<td class="cell ${className}" title="${i}-${j}" 
                            onclick="cellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    var elSeats = document.querySelector('.cinema-seats');
    elSeats.innerHTML = strHTML;
}
function cellClicked(elCell, i, j) { 
    var cell = gCinema[i][j]
    console.log('Cell clicked: ', i, j, cell);
        // TODO: ignore none seats and booked
    if (cell.type !== 'SEAT') return

    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }

    if (gElSelectedSeat === elCell) {
        gElSelectedSeat = null;
    } else {
        gElSelectedSeat = elCell;
        gElSelectedSeat.classList.add('selected')
    }

    if (gElSelectedSeat) showSeatDetails({i:i, j:j})
    else hideSeatDetails()

}
function showSeatDetails(pos) {
    var elPopup = document.querySelector('.popup');
    var seat = gCinema[pos.i][pos.j];

    elPopup.querySelector('h2 span').innerText = `${pos.i}-${pos.j}`
    elPopup.querySelector('h3 span').innerText = `$${seat.price}`
    elPopup.querySelector('button').dataset.i = pos.i;
    elPopup.querySelector('button').dataset.j = pos.j;

    elPopup.hidden = false;
    if (gBookingTimeout) clearTimeout(gBookingTimeout)
    gBookingTimeout = setTimeout(function(){
        unSelectSeat()
    }, 3000)
}
function hideSeatDetails() { 
    document.querySelector('.popup').hidden = true    
}

function bookSeat(elBtn) { 
    console.log('Booking seat, button: ', elBtn.dataset);
    gCinema[elBtn.dataset.i][elBtn.dataset.j].isBooked = true;
    renderCinema();
    unSelectSeat()
}

function unSelectSeat() {
    hideSeatDetails();
    gElSelectedSeat.classList.remove('selected')
}



