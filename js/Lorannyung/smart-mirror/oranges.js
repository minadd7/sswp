// Variable Declaration
var amOrPm;
var A = 130;
var realminute;
var numberCount = 0;
var currentTemp, currentHour, intMonth, intDay, intYear, disCountry, disCity;
var start;
var x, y;

function integerMonth() {
  if (month() == 1) return "January";
  if (month() == 2) return "February";
  if (month() == 3) return "March";
  if (month() == 4) return "April";
  if (month() == 5) return "May";
  if (month() == 6) return "June";
  if (month() == 7) return "July";
  if (month() == 8) return "August";
  if (month() == 9) return "September";
  if (month() == 10) return "October";
  if (month() == 11) return "November";
  if (month() == 12) return "December";
}

function weatherLength(){
  if (weather.main.temp.toString().length >= 3 && weather.main.temp.toString().includes('-')) return (weather.main.temp.toString().length - 1.00);
  else if (weather.main.temp.toString().length <= 2) return (weather.main.temp.toString().length);
  else if (weather.main.temp.toString().length >= 3 && weather.main.temp.toString().length < 4 ) return (weather.main.temp.toString().length - 0.5);
  else if (weather.main.temp.toString().length >= 4) return (weather.main.temp.toString().length - 0.75);
  else if (weather.main.temp.toString().length >= 5) return (weather.main.temp.toString().length - 0.25);
  else return (weather.main.temp.toString().length);

}

function weatherLength2(value) {
    var temp = value.toString().split();
    var tempInt = 0;
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "." || temp[i] == "-") {
            tempInt += 0.5;
        } else {
            tempInt++;
        }
    }
}

function drawScreen() {
  // Border
  fill(200);
  rect (15, 15, displayWidth - 30 , height - 30);
  fill(0)
  rect (26, 26, displayWidth - 52 , height - 52);

  // Information
  noStroke();
  fill(255);
  textSize(90);
  text(currentHour + ':' + realminute, 55, 160);
  text(currentTemp, displayWidth - (90/weatherLength()+ (weatherLength()*50) + A), 160);
  textSize(45);
  text("°C", displayWidth - (90/weatherLength()+ (weatherLength()*50) - (textWidth(currentTemp)*2) + A), 115);
  textSize(35);
  text(intMonth + ' ' + intDay + ', ' + intYear, 60, 75);
  text(disCity + ', '+ disCountry, displayWidth - (100/weatherLength()+ (weatherLength()*50) + A), 75);

  // A box
  fill(0);
  rect(x, y, width, height);
}

function logics() {
  numberCount++; // frameRate + resetable

  if (minute() < 10) {
    realminute = "0" + minute();
  } else {
    realminute = minute();
  }

  if (numberCount >= 432000) { // 7200s(2h) * 60fps
    intMonth = integerMonth();
    intDay = day();
    intYear = year();
    currentCount = 0;
  }

  if (numberCount >= 36000) { // 600s(10min) * 60fps
    currentTemp = weather.main.temp;
  }

  if (!start) { // Make the box move
    x = 0; y = 0;
  } else {
    x += width / 100;
    y += height / 100;
  }
}

// Client ID and API key from the Developer Console
var CLIENT_ID = '217282084437-j2nnpaeqbvp83k95fqs7upl58lp35q0h.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDqmgbc93_9F0epmiTvla34He42viSd3M8';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}
