import axios from "axios";

class imgApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = null;
    }

    async getImage() {
    try {
        return await axios.get('https://pixabay.com/api/', {
            params: {
                key: "31440578-d40e7eed5873a4f1028e16656",
                q: this.searchQuery,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 40,
                page: this.page,
            }
        }).then(response => { 
            console.log("-> response", response);
            return response.data;
        }).then(data => {
            console.log("-> data", data);
            return data;
        })
        // console.log("-> response", response);
        // return await response;
    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }

    decreaseTotalHits() {
        this.totalHits = this.totalHits - 40;
    }
}



export { imgApiService };