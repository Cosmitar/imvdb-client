'use strict'

class Paginator {
    constructor( data = {} ) {
        this._limit = data.per_page || Paginator.LIMIT_DEFAULT;
        this._offset = data.page || Paginator.OFFSET_DEFAULT;
        this._total_pages = 0;
        this._total_results = 0;
        this._currentIndex = 1;
        this._currentPage = [];//new Page( data, this );
        this._pagesCache = [];
    }

    get searchParams() { return this._searchParams; }

    get elements() { return this._currentPage; }

    get limit() { return this._limit; }

    get offset() { return this._offset; }

    get total_pages() { return this._total_pages; }

    get currentIndex() { return this._currentIndex; }

    get page_size() { return this._limit; }

    set browser( value ) {
        this._browser = value;
    }

    update( data = {} ) {
        this._offset = data.current_page || data.page || this._offset;
        this._limit = data.per_page || this._limit;
        this._total_results = data.total_results || this._total_results;
        //this._currentIndex = data.current_page || data.offset + 1;//offset can be 0 but index starts in 1
        this._total_pages = data.total_pages || Math.ceil(this._total_results / this._limit);
    }

    setPage( items ) {
        this._currentPage = items;
    }

    firstElement() {
        return this._currentPage[0];
    }
    lastElement() {
        return this._currentPage[this._currentPage.length-1];
    }
    elementAt( index ) {
        return this._currentPage[index];
    }


    hasNextPage() { return this._currentIndex < this._total_pages };
    hasPrevPage() { return this._currentIndex > 1; }
    nextPage() {
        let retVal = new Promise((resolve,reject) => {
            if( this.hasNextPage() ){
                this._offset++;
                resolve( this._browser.all() );
            }else{
                reject(null);
            }
        });
        return retVal;
    }
    prevPage() {
        let retVal = new Promise((resolve,reject) => {
            if( this.hasPrevPage() ){
                this._offset--;
                resolve( this._browser.all() );
            }else{
                reject(null);
            }
        });
        return retVal;
    }
    firstPage() {
        let retVal = new Promise((resolve,reject) => {
            this._offset = 0;
            resolve( this._browser.all() );
        });
        return retVal;
    }
    lastPage() {
        let retVal = new Promise((resolve,reject) => {
            this._offset = this._total_pages;
            resolve( this._browser.all() );
        });
        return retVal;
    }
    goToPage( index ) {
        let retVal = new Promise((resolve,reject) => {
            this._offset = index;
            resolve( this._browser.all() );
        });
        return retVal;
    }
}

Paginator.LIMIT_DEFAULT = 50;
Paginator.OFFSET_DEFAULT = 1;

export default Paginator;