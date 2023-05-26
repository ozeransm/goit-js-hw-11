import CreateResponce from './js/createResponce'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
let gallery = null;

const refs ={
    form: document.querySelector('.search-form'),
    galery: document.querySelector('.gallery'),
}
refs.form.addEventListener('click',handlerInput);
refs.form.addEventListener('focusin',handlerClear);
refs.galery.addEventListener('click', handlerLink);

const data = new CreateResponce();

const options = {
    root: null,
    rootMargin: "300px",
   
 };
const target = document.querySelector('.target');
const observer = new IntersectionObserver(callback, options);

function optiScroll(){
const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 1.2,
  behavior: "smooth",
});
}

function callback(entr,obs){

entr.forEach(element => {
    if (element.isIntersecting){
         data.pageResponce()
        .then(markUpGalery)
        .catch(console.log);
        
    }
    });
}

function handlerClear(e){
    
    if((e.target.nodeName==='INPUT')){
        e.currentTarget.reset();
        data.clearPage();
        data.sitePage='';
        observer.unobserve(target);
        e.currentTarget.elements[1].removeAttribute('disabled');
        
    }
   
}

function handlerLink(e){
    e.preventDefault();
}

function handlerInput(e){
    e.preventDefault();
    if((e.target.nodeName==='BUTTON')&&(e.currentTarget.elements[0].value.trim()!=='')){
        refs.galery.textContent='';
        data.sitePage = e.currentTarget.elements[0].value;
        observer.observe(target);
        e.target.setAttribute('disabled',true);
    } else {refs.galery.textContent=''; if(e.target.nodeName==='BUTTON'){Notiflix.Notify.warning('Empty line. Please try again.')};}
}


function markUpGalery(obj){
    if(!obj){return;}
    if((data.sitePage*40)>=obj.data.totalHits){observer.unobserve(target); Notiflix.Notify.info("We're sorry, but you've reached the end of search results."); return;}
    const markUpHtml = obj.data.hits.reduce((akk, {webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>
    akk + `<div class="photo-card">
    <a href="${largeImageURL}" >
    <img src="${webformatURL}" alt="${tags}" width="250" height="200" loading="lazy" title="${tags}"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
    </div>`
       
    ,'');
    refs.galery.insertAdjacentHTML('beforeend', markUpHtml);
    if(data.sitePage===1){gallery = new SimpleLightbox('.gallery a')}else gallery.refresh();
    optiScroll();
    
}
