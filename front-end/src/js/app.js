const btnUpload = $("#btn-upload");
const overlayElm = $("#overlay");
const dropzoneElm = $("#dropzone");

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

function loadAllImages() {

}

