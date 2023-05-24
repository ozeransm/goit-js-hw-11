import axios from 'axios';


export default class CreateResponce{
    
    constructor(value){
        this.page=0;
        this.value=value;
    }
    incPage(step=1){
        this.page+=step;
    }
    get pageResponce(){
        this.incPage();
        console.log(this.page);
        const BASE_URL = `https://pixabay.com/api/?key=36684686-da46a32da1515f18ebef67ac3`;
        return axios.get(`${BASE_URL}&q=${this.value}&page=1&per_page=40&image_type='photo'&orientation='horizontal'&safesearch='true'`);
            
    }

    set pageResponce(step=1){
        this.incPage(step);
    }
}