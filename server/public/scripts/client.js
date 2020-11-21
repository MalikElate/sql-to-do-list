console.log('hello from client'); 

$(document).ready(readyNow); 

function readyNow() { 
    console.log('hello from jquery'); 
    // Click handlers for add buttons 
    $('.add-btn').on('click', addTask); 
} 

function addTask() { 
    let listButtonClicked = $(this).attr('id') 
    console.log(`adding task to ${listButtonClicked} list...`); 
    $.ajax({
        type: 'GET', 
        url: '/list', 
    })
    .then(function (response){
        console.log(response);
    })
    .catch( function(error){
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    })
}

function renderTasks(item) { 
    
}