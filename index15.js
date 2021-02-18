// 1. sendGetPhotoRequest тебе не нужен этот метод, у тебя уже есть sendGetPhotosRequest, 
// когда у тебя успешно выполнился sendGetAlbumsRequest ты можешь взять из альбомов первый элемент, 
// у него взять id и вызвать sendGetAlbumsRequest

// 2. Вставлять html, а не создавать элемент через document.createElement

const albumsListElement = document.querySelector('.js-list-albums');
const imageListElement = document.querySelector('.js-gallery-photo');

function sendGetPhotosRequest(albumId) {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then((response) => response.json())
    .then((albums) => {
        imageListElement.innerHTML = '';		
        renderPhotos(albums);
    })
    .catch((error) => console.error('Ошибка:', error));
}

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

function sendGetPhotoRequest() {
    return fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
    .then((response) => response.json())
    .then((albums) => {
        renderPhotos(albums);
    })
    .catch((error) => console.error('Ошибка:', error));
}
sendGetPhotoRequest()

function renderAlbums(title,id) {
    const albumTodo = document.createElement('div');
    albumTodo.className = `alert alert-primary`;
    albumTodo.dataset.id = id + 1;
    albumTodo.textContent = title;
    albumsListElement.append(albumTodo);
}

function renderPhotos(albums) {
    albums.map((photos) => {
        createImgElement(photos);	
    });
}

function addAlbumsListClickEventListener() {
    albumsListElement.addEventListener('click', (event) => {
        const albumItem = event.target.closest('div');
        const albumId = albumItem.dataset.id;
        sendGetPhotosRequest(albumId);
    });	
}
addAlbumsListClickEventListener();

function createImgElement(photo) {
    const img = document.createElement('img');
    img.src = photo.url;
    img.width = 550;
    img.height = 150;
    imageListElement.append(img);
}
