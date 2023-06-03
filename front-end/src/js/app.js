const btnUpload = $("#btn-upload");
const overlayElm = $("#overlay");
const dropzoneElm = $("#dropzone");
const REST_API_URL = `http://localhost:8080/gallery`;


/* ---------------------------------------------------------------------------- */

// Calling loadAllImages function at start to load all the images already saved in server
loadAllImages();

// Define "Upload Images" button click event -> Display overlayElm when button is clicked
btnUpload.on('click', () => overlayElm.removeClass('d-none'));

// Exit from upload images dropzone -> Hide overlayElm when clicking outside dropzone
overlayElm.on('click', (evt) => {
    if (evt.target === overlayElm[0]) overlayElm.addClass('d-none');
});

// Exit from upload images dropzone -> Set event for Ecs key to hide overlayElm
$(document).on('keydown', (evt) => {
    if (evt.key === 'Escape' && !overlayElm.hasClass('d-none')) {
        overlayElm.addClass('d-none');
    }
});

/* ---------------------------------------------------------------------------- */

// This function send GET request to the server and loaded all the images of the server in to webpage
function loadAllImages() {
    const jqxhr = $.ajax(`${REST_API_URL}/images`);
    jqxhr.done((imageUrlList) => {
        imageUrlList.forEach(imageUrl => {
            const divElm = $(`<div class="image">
                                    <div class="download">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                    </div>
                              </div>`);
            divElm.css('background-image', `url(${imageUrl})`);
            $("main").append(divElm);
        });
    });
}

