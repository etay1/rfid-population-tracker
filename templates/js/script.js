function rfid_scanner() {
    // Retrieve input values
    const room = document.getElementById('room').value;
    const id = document.getElementById('id').value;
    const group = document.getElementById('group').value;
    const currentTime = new Date().toLocaleTimeString();

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

    // Reset form inputs
    document.getElementById('room').value = '';
    document.getElementById('id').value = '';
    document.getElementById('group').value = '';
}
