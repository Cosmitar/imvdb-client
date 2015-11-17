'use strict'
import Client from './../services/APIClient';
import Paginator from './Paginator';
import SearchParams from './SearchParams';

class Browser {
    constructor( params = {} ) {
        //this.q = params.q || '';
        this.factory = params.factory || null;
        this.id = params.id || 0;
        this.slug = params.slug || '';
        this._config = new SearchParams;
        this._paginator = new Paginator;
    }

    set config( searchParams = {} ) {
        Object.assign( this._config, searchParams );
        this._paginator.update( searchParams );
    }

    _getSearchUrl() {
        //let url = `/search/${ this.factory._getFamilyType() }?q=${ this.q }`;
        let url = `/search/${ this.factory.FAMILY_TYPE }?q=${ escape(this._config.q) }` +
            `&per_page=${ this._paginator.limit }` + 
            `&page=${ this._paginator.offset }`;

        return url;
    }

    _getItemUrl() {
        //check if there is ID or SLUG to search
        let url = this.id
            ? `/${ this.factory.SINGLE_TYPE }/${ this.id }`
            : `/${ this.factory.SINGLE_TYPE }/${ this.slug }?method=slug`;
        if( !this.id ){ console.warn('Search etity by slug returns 500 Internal Server Error'); }
        if( this._config.includes.length > 0 ){
            url += '?include=' + this._config.includes.join(',');
        }
        return url;
    }

    _getClient() {
        return Client;
    }

    _query( url ) {
        return this._getClient().request( url );
    }

    all() {
        let url = this._getSearchUrl();
        let promise = this._query( url );
        return promise.then( response => {
            let collection = [];
            for( let item of response.results ){
                collection.push( new this.factory( item ) );
            }

            //update paginator
            this._paginator.update( response );
            this._paginator.setPage( collection );
            return this._paginator;
        }, reject => {
            console.log(reject);
            return reject;
        });
    }

    first() {
        return this.all().then( val => {
            return val[0];
        });
    }

    get(){
        let url = this._getItemUrl();
        return this._query( url ).then( response => {
            return new this.factory( response );
        });
    }
}

export default Browser;