import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    let data = await response.json();
    return data;
  }
  catch{
    // Place holder for functionality to work in the Stubs
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  console.log(reservations);

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length === 0){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";

    /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    let table = document.getElementById("reservation-table");
    let options = {dateStyle: 'long', timeStyle: 'medium'};

    reservations.forEach(reservation => {
      
      const date = new Date(reservation.date);
      const time = new Date(reservation.time);

      table.innerHTML += `
      <tr>
        <td scope="col">${reservation.id}</td>
        <td scope="col">${reservation.name}</td>
        <td scope="col">${reservation.adventureName}</td>
        <td scope="col">${reservation.person}</td>
        <td scope="col">${date.toLocaleDateString("en-IN")}</td>
        <td scope="col">${reservation.price}</td>
        <td scope="col">${time.toLocaleString("en-IN",options).replace(" at", ",")}</td>
        <td scope="col" id=${reservation.id}><a href="../../frontend/pages/adventures/detail/?adventure=${reservation.adventure}" class="reservation-visit-button">Visit Adventure</a></td>
      </tr>
      `;
    });

    
  }
}

export { fetchReservations, addReservationToTable };
