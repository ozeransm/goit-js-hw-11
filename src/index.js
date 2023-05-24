import CreateResponce from './js/createResponce'
import debounce from 'lodash.debounce';
import simpleLightbox from 'simplelightbox';
import '../node_modules/simplelightbox/dist/simple-lightbox.min.css'
const refs ={
    form: document.querySelector('.search-form'),
    galery: document.querySelector('.gallery'),
}
refs.form.addEventListener('input',debounce(handlerInput, 300));
refs.galery.addEventListener('click', handlerLink);

function handlerLink(e){
    e.preventDefault();
    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {
	// do something…
});
}

function handlerInput(e){
    const data = new CreateResponce(e.target.value);
    data.pageResponce
    .then(markUpGalery)
    .catch(console.log);
       
}

function markUpGalery(data){
    const markUpHtml = data.data.hits.reduce((akk, {webformatURL, largeImageURL, tags})=>akk + `<a href="${largeImageURL}"><img src="${webformatURL}" width="250" alt="${tags}" title="${tags}"/></a>`,'');
    refs.galery.innerHTML = markUpHtml;
   
}

