function rfid_scanner() {
    // Retrieve input values
    const room = document.getElementById('room').value;
    const id = document.getElementById('id').value;
    const group = document.getElementById('group').value;
    const timeIn = document.getElementById('time-in').value;
    const timeOut = document.getElementById('time-out').value;


    // Create table row
    const row = document.createElement('tr');
    const roomCell = document.createElement('td');
    const idCell = document.createElement('td');
    const groupCell = document.createElement('td');
    const timeCell = document.createElement('td');


    // Set cell values
    roomCell.textContent = room;
    idCell.textContent = id;
    groupCell.textContent = group;
    timeCell.textContent = `(${timeIn}, ${timeOut})`;


    // Append cells to row
    row.appendChild(roomCell);
    row.appendChild(idCell);
    row.appendChild(groupCell);
    row.appendChild(timeCell);


    // Append row to table
    const table = document.getElementById('room-table');
    table.appendChild(row);


    // Reset form inputs
    document.getElementById('room').value = '';
    document.getElementById('id').value = '';
    document.getElementById('group').value = '';
    document.getElementById('time-in').value = '';
    document.getElementById('time-out').value = '';
}