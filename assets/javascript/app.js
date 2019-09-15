// Need to create my variables and my array to hold the catergories
let buttons = ["Dogs", "Cats", "Babies", "Turtles"];
// Need to create a function for keeping the user added search criteria when the page is reloaded
function loadButtons() {
    const listButtons = JSON.parse(localStorage.getItem('buttons'));
    buttons = listButtons;
}

// Need to make a function that will make the buttons for each category to appear

function renderButton() {
    $('.recent-search').empty();

    for (let i = 0; i < buttons.length; i++) {
        const buttonName = buttons[i];
        const button = `
       <div class="wrap-buttons">
       <button 
       class="btn btn-search"
       data-name="${buttonName}"

       >${buttonName}</button>
       <button
       
       data-name="${buttonName}"
       data-index="${i}"
       class="btn btn-delete fas fa-times-circle">
       

       
       
       </button>
        </div>
       `;

        $('.recent-search').append(button);
    }
    // Need to add a function that will retain user inputed searches into local storage
    localStorage.setItem('buttons', JSON.stringify(buttons));
}
// Need to add a function to make a new button for each new user search
loadButtons();
renderButton();
$('#submit-button').on('click', function (event) {
    event.preventDefault();
    const value = $('#search').val();
    buttons.push(value);
    renderButton();

});
$(document).on('click', '.btn-delete', function () {
    const buttonIndex = $(this).attr('data-index');
    buttons.splice(buttonIndex, 1);
    renderButton();
    console.log('Button Index: ', buttonIndex);

});