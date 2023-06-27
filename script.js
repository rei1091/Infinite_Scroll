const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const count = 30;
const apiKey = 'API KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all img were loaded
function imgLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//ヘルパー関数でsetAttribute
function setAttributes(element,attributes) {
	for (const key in attributes) {
		element.setAttribute(key,attributes[key]);
	}
}

//displayPhotos
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	//画像読み込み
	photosArray.forEach((photo) => {
		//UnsplashへのLinkのために<a>を加える
		const item = document.createElement('a');
		// item.setAttribute('href',photo.links.html);
		// item.setAttribute('target','_blank');
		setAttributes(item,{
			href: photo.links.html,
			target: '_blank',
		});
		//<img>
		const img = document.createElement('img');
		// img.setAttribute('src',photo.urls.regular);
		// img.setAttribute('alt',photo.alt_description);
		// img.setAttribute('title',photo.alt_description);
		setAttributes(img,{
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		})
		//Event Listener, check when each is finished loading
		img.addEventListener('load',imgLoaded);
		//<a> <img>
		item.appendChild(img);
		imgContainer.appendChild(item);
	});
}

// APIから画像の取得
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	}
	catch (error) {
		alert("error")
	}
}

//ページの末尾に到達したかチェックしてさらに画像を表示
window.addEventListener('scroll',() => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
