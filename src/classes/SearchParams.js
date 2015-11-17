'use strict'

class SearchParams {
    constructor( params = {} ) {
        this.q = params.q || '';
        this.includes = params.includes || [];
    }
}

export default SearchParams;