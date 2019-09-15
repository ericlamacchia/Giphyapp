// Need to create my variables and my array to hold the catergories
const buttons = ["Dogs", "Cats", "Babies", "Turtles"];

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

       class="btn btn-delete fas fa-times-circle"
       >
       </button>
        </div>
       `;

       $('.recent-search').append(button);
   } 
}
renderButton();
$('#submit-button').on('click', function(event) {
    event.preventDefault();
   const value = $('#search').val();
   buttons.push(value);
   renderButton();
   console.log('Value: ', value);
});

