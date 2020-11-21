console.log('hello from client'); 

$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from jquery'); 
    // Click handlers for add buttons 
    $('.add-btn').on('click', addTask); 
    getTasks()
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
        alert('please add inputs') 
        return 'never added input'; 
    } 
    console.log(`adding task to ${listButtonClicked} list...`); 
    console.log(task); 
    // sending the new task to the server 
    $.ajax({
        method: 'POST',
        url: `/tasks`, //add id to the url
        data: {
            task: task,
            published: published
        }
    }).then( function(response) {
        getBooks();
        console.log('getting books...'); 
    }).catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    }) 
}

function renderTasks(allTasks) { 
   
    for (let task of allTasks) { 
        if(task.taskDisplay === "client") {
            $('#client-col').append(`<tr><td>${task.task} <button>-</button></td></tr>`);
        } 
        else if(task.taskDisplay === "server") {
            $('#server-col').append(`<tr><td>${task.task} <button>-</button></td></tr>`); 
        } 
        else if(task.taskDisplay === "database") { 
            $('#database-col').append(`<tr><td>${task.task} <button>-</button></td></tr>`);
        }
    }
}