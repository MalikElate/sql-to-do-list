console.log('hello from client'); 

$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from jquery'); 
    // Click handlers for add buttons 
    $('.add-btn').on('click', addTask); 
    $('#task-container').on('click', '.btn-delete', deleteTask);
    $('#task-container').on('click', '.task-td', updateStatus);
    // update tasks upon refresh 
    getTasks(); 
} 
function getTasks() { 
    $.ajax({
        type: 'GET', 
        url: '/list', 
    })
    .then(function (response){
        console.log(response);
        renderTasks(response)
    })
    .catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    })
}
function addTask() { 
    // get which button was clicked 
    let listButtonClicked = $(this).attr('id'); 
    // get the value of the input was clicked based on the button 
    let task = $(`#${listButtonClicked}-input`).val(); 
    // basic data validation 
    if (task == "") {
        return 'never added input'; 
    } 
    console.log(`adding task to ${listButtonClicked} list...`); 
    console.log(task); 
    // sending the new task to the server 
    $.ajax({
        method: 'POST',
        url: `/list`, //add id to the url
        data: {
            task: task,
            taskDisplay: listButtonClicked
        }
    }).then( function(response) {
        getTasks(); 
        clearInputs(); 
        console.log('getting tasks...'); 
    }).catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    }) 
}
// delete a tasks 
function deleteTask() { 
    console.log(`deleting task...`); 
    let taskId = $(this).closest('tr').data('id');  
    $.ajax({
        method: 'DELETE',
        url: `/list/${taskId}` //add id to the url
    }).then( function(response) {
        getTasks();
    }).catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    })
} 
function updateStatus() { 
    let taskStatus = $(this).closest('tr').data('status');
    let taskId = $(this).closest('tr').data('id');
    console.log(taskStatus)
    console.log(`updating status of`, taskId);
    $.ajax({
        method: 'PUT',
        url: `/list/${taskId}`, //add id to the url
        data: {taskStatus: taskStatus}
    }).then( function(response) { 
        getTasks();
        console.log('getting tasks...'); 
    }).catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    }) 
} 

// clear inputs 
function clearInputs() { 
    $('#client-input').val('');
    $('#server-input').val('');
    $('#database-input').val('');
}

// append all of the tasks to the DOM 
function renderTasks(allTasks) { 
    // clear out data from the last render 
    $('#client-col').empty();
    $('#server-col').empty();
    $('#database-col').empty();
    
    // using two for loops one for complete tasks and the other for incomplete tasks I can push completed tasks
    // to the bottom of the list. 
    for (let task of allTasks) { 
        if(task.taskDisplay === "client" && task.status === 'false' ) {
            $('#client-col').append(`<tr data-id="${task.id}" data-status="${task.status}"><td class="task-td">${task.task}</td><td><button class="btn-delete">-</button></td></tr>`);
        } 
        else if(task.taskDisplay === "server" && task.status === 'false' ) {
            $('#server-col').append(`<tr data-id="${task.id}" data-status="${task.status}"><td class="task-td">${task.task}</td><td><button class="btn-delete">-</button></td></tr>`);
        } 
        else if(task.taskDisplay === "database" && task.status === 'false' ) {
            $('#database-col').append(`<tr data-id="${task.id}" data-status="${task.status}"><td class="task-td">${task.task}</td><td><button class="btn-delete">-</button></td></tr>`);
        }         
    } 
    for (let task of allTasks) {
        if(task.taskDisplay === "client" && task.status === 'true' ) {
            $('#client-col').append(`<tr data-id="${task.id}" data-status="${task.status}"><td class="task-td complete">${task.task}</td><td><button class="btn-delete">-</button></td></tr>`);
        } 
        else if(task.taskDisplay === "server" && task.status === 'true' ) {
            $('#server-col').append(`<tr data-id="${task.id}" data-status="${task.status}"><td class="task-td complete">${task.task}</td><td><button class="btn-delete">-</button></td></tr>`);
        } 
        else if(task.taskDisplay === "database" && task.status === 'true' ) {
            $('#database-col').append(`<tr data-id="${task.id}" data-status="${task.status}"><td class="task-td complete">${task.task}</td><td><button class="btn-delete">-</button></td></tr>`);
        } 
    }
}