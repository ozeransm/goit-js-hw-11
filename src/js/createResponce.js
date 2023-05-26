import axios from 'axios';
import Notiflix from 'notiflix';

export default class CreateResponce{
    
    constructor(){
        this.page=0;
        this.value='';
        
    }
    incPage(step=1){
        this.page+=step;
        
    }
    clearPage(){
        this.page=0;
    }
    async pageResponce()  {
     if(this.value){ 
        this.incPage();
        const BASE_URL = `https://pixabay.com/api/?key=36684686-da46a32da1515f18ebef67ac3`;
        const result = await axios.get(`${BASE_URL}&q=${this.value}&page=${this.page}&per_page=40&image_type='photo'&orientation='horizontal'&safesearch='true'`);
        if(result.data.totalHits===0){Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); return;}
        else {if(this.page===1){Notiflix.Notify.success(`Hooray! We found totalHits: ${result.data.totalHits} images.`);} return result};
     }      
    }

    get sitePage(){
        return this.page;            
    }

    set sitePage(value=''){
        this.value=value;
        
    }
}