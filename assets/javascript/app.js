// Need to create my variables and my array to hold the catergories
let buttons = ["Dogs", "Cats", "Babies", "Turtles"];
//This is my api key for giphy
const API_key = '0hEuDgipAuGeggYJPaJEuRvUd0lVdCLk';
//This is the url link
const endpoint = 'http://api.giphy.com/v1/gifs/search?api_key=0hEuDgipAuGeggYJPaJEuRvUd0lVdCLk';
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

loadButtons();
renderButton();

//Below I need to render a function that will delete the new buttons that the user adds
function removeButton() {
    const buttonIndex = $(this).attr('data-index');
    buttons.splice(buttonIndex, 1);
    renderButton();
    console.log('Button Index: ', buttonIndex);

}
// Need to add a function to make a new button for each new user search
function addButton(value) {
    buttons.push(value);
    renderButton();
}

function renderGiph(giph) {
    $('.giphy-content').empty();

    for (let i = 0; i < giph.length; i++) {
     const giphy =  giph[i]; 
     const images = giphy.images;

     const giphTemplate = `
     <div class="giphy">
     <i class="far fa-star favorite" data-id="${giph.id}" data-star="false">
     </i>
     <div class="giphy-image">
         <img
          src="${images.original_still.url}"
           data-still="${images.original_still.url}"
            data-animate="${images.original.url}"
             data-state="still">
         <i class="fa fa-play img-play"></i>
     </div>
     <div class="giphy-info">
         <p>Rating: g</p>
         <p>Posted A Year Ago</p>
     </div>
   
     <div class="giphy-footer" data-link="${giphy.embed_url}"> 
         <p>Copy Link <i class="fa fa-link"></i></p>
     </div>
   </div>
     `;
      $('.giphy-content').append(giphTemplate); 
    }
}
function fetchGiph(value) {
    const url = endpoint + '&q=' + value;
    $.ajax({ url: url })
    .then(function (response) {
        const giph = response.data;
        renderGiph(giph);
        console.log('Giph: ', giph);
    })
    .catch(function(error) {
        console.log('Error: ', error);
    });
}
//This will be where i program the search function to actually pull from giphy
function searchGiph(event) {
    event.preventDefault();

    const value = $('#search').val();

    addButton(value);
    fetchGiph(value);
// Made it so that after you click search the input field resets.
    $('#search').val('');

    
}
// Need to add functionality to pause and play the gif
function imgCardClick() {
    const giphyCard = $(this);

    const img = giphyCard.find('img');
    const icon = giphyCard.find('i');

    const still = img.attr('data-still');
    const animate = img.attr('data-animate');
    const state = img.attr('data-state');

    if (state === 'still') {
        img.attr({
            src: animate,
            'data-state': "animate"

        });
        icon.removeClass('img-play');
    }
    else {
        img.attr({
            src: still,
            'data-state': 'still'
        });
        icon.addClass('img-play')
    }
    
}
// Here I will add the logic to actually copy the link to the clipboard
function clipToClipBoard(value) {
    const tempElement = $('<input>');
    $('body').append(tempElement);

    tempElement.val(value).select();
    document.execCommand('copy');
    tempElement.remove();
}
function copyLink() {
    const link = $(this).attr('data-link');
    const content = $(this).html();

    clipToClipBoard(link);

    $(this).html('Copied');
    setTimeout(() => $(this).html(content), 3000);
}
function searchGiphyByButt() {
    const buttonName = $(this).attr('data-name');
    const parent = $(this).parent();
    $('.btn').parent().removeClass('active');
    parent.addClass('active');
    fetchGiph(buttonName);
}
// Needed to actually add the logic to my reset button, it now clears all the gifs after being hit
function resetResult(event) {
    event.preventDefault();
    $('.btn').parent().removeClass('active');
    $('.giphy-content').html('<p>Results Cleared</p>');
}
$(document).on('click', '.btn-delete', removeButton);
$(document).on('click', '.giphy-image', imgCardClick);
$(document).on('click', '.giphy-footer', copyLink);
$(document).on('click', '.btn-search', searchGiphyByButt);
$('#submit-button').on('click', searchGiphyByButt);
$('#reset-results').on('click', resetResult);





