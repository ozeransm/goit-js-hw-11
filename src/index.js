import CreateResponce from './js/createResponce'
import debounce from 'lodash.debounce';
import simpleLightbox from 'simplelightbox';
import '../node_modules/simplelightbox/dist/simple-lightbox.min.css'
const refs ={
    form: document.querySelector('.search-form'),
    galery: document.querySelector('.gallery'),
}
refs.form.addEventListener('click',handlerInput);
refs.galery.addEventListener('click', handlerLink);

function handlerLink(e){
    e.preventDefault();
    let gallery = new simpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {
	// do something…
});
}

function handlerInput(e){
    e.preventDefault();
    if((e.target.nodeName==='BUTTON')&&(e.currentTarget.elements[0].value.trim()!=='')){
        const data = new CreateResponce(e.currentTarget.elements[0].value);
        observePage(data);
    }   
}


function markUpGalery(data){
    const markUpHtml = data.data.hits.reduce((akk, {webformatURL, largeImageURL, tags})=>akk + `<a href="${largeImageURL}"><img src="${webformatURL}" width="250" height="200" alt="${tags}" title="${tags}"/></a>`,'');
    refs.galery.insertAdjacentHTML('beforeend', markUpHtml);
   
}

function observePage(data){
const options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "300px",
   
  };

const target = document.querySelector('.target');
const observer = new IntersectionObserver(callback, options);
observer.observe(target);

  function callback(entr,obs){
    
        entr.forEach(element => {
            if (element.isIntersecting){
                console.log();
                data.pageResponce
                .then(markUpGalery)
                .catch(console.log);
            }
        });
  }
}