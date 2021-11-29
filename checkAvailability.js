/* This function retrieves data from a JSON file and produces
   an array for each room that contains booked dates */


const ROOMS = ["201", "202", "203", "204", "205",
               "301", "302", "303", "304", "305",
               "401", "402", "403", "404", "405",
               "501", "502", "503", "504", "505"
];

/* This function demonstrates how the findBookedDates function is used by calling it and then
   displaying a list of all the booked dates and dates booked for a specific room
 */
function processDates(data) {
    let bookedDates = findBookedDates(data);

    // Display a list of all rooms and the dates that are booked
    for (let i = 0; i < ROOMS.length; i++) {
        console.log(ROOMS[i]);
        for (let j = 0; j < bookedDates[i].length; j++) {
            console.log(bookedDates[i][j]);
        }
    }

    // Display booked dates for specified room
    let specificRoom = "403";
    let roomIndex = ROOMS.indexOf(specificRoom);
    if (roomIndex !== -1) {
        console.log("Booked dates for room " + specificRoom);
        for (let i = 0; i < bookedDates[roomIndex].length; i++) {
            console.log(bookedDates[roomIndex][i]);
        }
    } else {
        console.log ("There isn't a room called " + specificRoom + " in our hotel");
    }
}

/* This function retrieves data from a JSON file and produces
   an array for each room that contains booked dates */
function findBookedDates(data) {
    let dates = [];
    // Set up an empty date array for each room in dates
    for (let i = 0; i < ROOMS.length; i++) {
        dates[i] = [];
    }
    // Go through the JSON file one reservation at a time
    for (let i = 0; i < data.length; i++) {
        // Copy the data for one reservation to the variable resData for ease of reference
        let resData = data[i];
        // Determine if the room in the reservation is a valid room.  If not, ignore the data.
        let roomIndex = ROOMS.indexOf(resData['room']);
        if (roomIndex !== -1) {
            // Add each of the dates between check In and check Out to the relevant array in dates
            let checkOut = new Date(resData['checkOut']);
            let bookedDate = new Date(resData['checkIn']);
            while (bookedDate.toDateString() !== checkOut.toDateString()) {
                dates[roomIndex].push(bookedDate.toDateString());
                bookedDate.setDate(bookedDate.getDate() + 1);
            }
        }
    }
    // Tidy up the date arrays
    for (let i = 0; i < dates.length; i++) {
        // Sort all the dates for each room into chronological order
        dates[i].sort(function (a, b) {
            return new Date(a) - new Date(b)
        })
        // Remove any duplicated dates in the JSON file
        for (let j = dates[i].length - 1; j > 0; j--){
            if (dates[i][j] === dates[i][j-1]){
                dates[i].splice([j], 1);
            }
        }
    }
    return dates;
}