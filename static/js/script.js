function ajaxPostRequest(path, data){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState===4&&this.status ===200){
            //callback(this.response);
        }
    };
    request.open("POST", path);
    request.send(data);
  } 

function ajaxGetRequest(path,callback){
  let request = new XMLHttpRequest();
  let toReturn;
  request.onreadystatechange = function(){
    if (this.readyState===4&&this.status ===200){
        callback(this.response);
    }
  };
  request.open("GET", path);
  request.send();
  return toReturn;
}


function populate(data){
    const table = document.getElementById("room-table");
    // Loop through each room
    let rooms = JSON.parse(data);
    console.log(rooms); 

    rooms.forEach(room => {
        // Loop through each person in the room
        room.people.forEach(person => {
        // Create a new row for each person
        const row = table.insertRow();
    
        // Insert the values into the cells
        const roomCell = row.insertCell();
        roomCell.innerHTML = room.roomID;
    
        const idCell = row.insertCell();
        idCell.innerHTML = person.id;
    
        const groupCell = row.insertCell();
        groupCell.innerHTML = person.group;
    
        // Loop through each time slot for the person
        person.time_slots.forEach(time_slots => {
            const timeInCell = row.insertCell();
            timeInCell.innerHTML = time_slots["time_in"];
    
            const timeOutCell = row.insertCell();
            timeOutCell.innerHTML = time_slots["time_out"];
        });
        });
    });
}

function generate(){
    ajaxGetRequest("/data",populate);
}

function rfid_scanner() {
    // Retrieve input values
    const room = document.getElementById('room').value;
    const id = document.getElementById('id').value;
    const group = document.getElementById('group').value;
    const currentTime = new Date().toLocaleTimeString();

    let toSend = JSON.stringify({"room":room,"id":id,"group":group,"time":currentTime});
    ajaxPostRequest("/sensor",toSend);








/*
    // Check if time in and time out fields exist
    const timeInField = document.getElementById('time-in');
    const timeOutField = document.getElementById('time-out');

    // Check if the ID already exists in the table
    const table = document.getElementById('room-table');
    const rows = table.getElementsByTagName('tr');

    let rowToUpdate = null;
    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
        const row = rows[i];
        const existingId = row.cells[1].textContent;

        if (existingId === id) {
            rowToUpdate = row;
            break;
        }
    }

    if (rowToUpdate) {
        if (timeOutField.value === '') {
            // Set time out if ID exists and time out is not already set
            timeOutField.value = currentTime;
            rowToUpdate.cells[4].textContent = currentTime;
        } else {
            // Clear the time out field if ID exists and time out is already set
            timeOutField.value = '';
            rowToUpdate.cells[4].textContent = '';
        }
    } else {
        // Create table row
        const row = document.createElement('tr');
        const roomCell = document.createElement('td');
        const idCell = document.createElement('td');
        const groupCell = document.createElement('td');
        const timeInCell = document.createElement('td');
        const timeOutCell = document.createElement('td');

        // Set cell values
        roomCell.textContent = room;
        idCell.textContent = id;
        groupCell.textContent = group;
        timeInCell.textContent = timeInField.value !== '' ? timeInField.value : '';
        timeOutCell.textContent = '';

        // Clear the time in and time out fields if both are tagged
        if (timeInField.value !== '' && timeOutField.value !== '') {
            timeInField.value = '';
            timeOutField.value = '';
        }

        if (timeInField.value === '') {
            // Set time in if ID does not exist or time out is already set
            timeInField.value = currentTime;
            timeInCell.textContent = currentTime;
        } else {
            // Set time in for a different room
            timeInField.value = currentTime;
            timeInCell.textContent = currentTime;

            // Clear the time out field
            timeOutField.value = '';
        }

        // Append cells to row
        row.appendChild(roomCell);
        row.appendChild(idCell);
        row.appendChild(groupCell);
        row.appendChild(timeInCell);
        row.appendChild(timeOutCell);

        // Append row to table
        table.appendChild(row);
    }

    */
    // Reset form inputs
    document.getElementById('room').value = '';
    document.getElementById('id').value = '';
    document.getElementById('group').value = '';

    location.reload();
}