
const $albumsList = $('.js-list-albums');
const $imageList = $('.js-gallery-photo');

function sendGetPhotosRequest(albumId = 1) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then((response) => response.json())
    .then((albums) => {
        $imageList.html ('');		
        renderPhotos(albums);
    })
    .catch((error) => console.error('Ошибка:', error));
}
sendGetPhotosRequest()

function sendGetAlbumsRequest() {
    return fetch('https://jsonplaceholder.typicode.com/albums')
    .then((response) => response.json())
    .then((albums) => {
        albums.map((item,id) => {
            renderAlbums(item.title,id); 	
        });
    })
    .catch((error) => console.error('Ошибка:', error));
}
sendGetAlbumsRequest();

function renderAlbums(title,id) {
    const albumTodo = document.createElement('div');
    albumTodo.className = `alert alert-primary`;
    albumTodo.dataset.id = id + 1;
    albumTodo.textContent = title;
    $albumsList.append(albumTodo);
    // не получается сделать чтобы при клике менялось изображение
    // const $albumTodo = $('<div/>').addClass(`alert alert-primary`).text(title);
    // $albumTodo.attr("data-id");
    // $albumsList.append($albumTodo);
}

function renderPhotos(albums) {
    albums.map((photos) => {
        createImgElement(photos);	
    });
}

function addAlbumsListClickEventListener() {
    $albumsList.click((event) => {
        const albumItem = event.target.closest('div');
        const albumId = albumItem.dataset.id;
        sendGetPhotosRequest(albumId);
    });	
}
addAlbumsListClickEventListener();

function createImgElement(photo) {
    const $img=$("<img />",{"src":photo.url, "width":550, "height":150});
    $imageList.append($img);
}
