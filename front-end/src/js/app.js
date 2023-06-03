const btnUpload = $("#btn-upload");
const overlayElm = $("#overlay");
const dropzoneElm = $("#dropzone");
const REST_API_URL = `http://localhost:8080/gallery`;
const cssLoaderHtml = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

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

// Prevent default action of dragover event
dropzoneElm.on('dragover', (evt) =>evt.preventDefault());

overlayElm.on('dragover',(evt)=>evt.preventDefault());

// Prevent default action of drop event
overlayElm.on('drop',(evt)=>evt.preventDefault());

// Get the details of the images dragged to dropzone and upload that images to the server
dropzoneElm.on('drop', (evt) => {
    evt.preventDefault();
    const droppedFiles = evt.originalEvent.dataTransfer.files;
    const imageFiles = Array.from(droppedFiles).filter(file => file.type.startsWith("image/"));
    if (!imageFiles.length) return;
    overlayElm.addClass("d-none");
    uploadImages(imageFiles);
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

// This function send POST request to the server and upload all the images which are dragged to the inside of the dropzone
function uploadImages(imageFiles) {
    alert("dropzone");

    const formData = new FormData();

    imageFiles.forEach(imageFile => {
        const divElm = $(`<div class="image loader"></div>`);
        divElm.append(cssLoaderHtml);
        mainElm.append(divElm);
        formData.append("images",imageFile);
    });

    const jqxhr = $.ajax(`${REST_API_URL}/images`, {
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false
    });


    jqxhr.done((imageUrlList) => {
        imageUrlList.forEach(imageUrl =>{
            const divElm = $(".image.loader").first();
            divElm.css('background-image',`url('${imageUrl}`);
            divElm.empty();
            divElm.removeClass("loader");
        })
    });
    jqxhr.always(() => {
        $(".image.loader").remove();
    });
}


