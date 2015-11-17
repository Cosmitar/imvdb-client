'use strict'
import Browser from './Browser';

class Model {
    constructor( data ) {
        this.rawData = data;
        this._massAssign( data );
    }

    _massAssign( data ){
        let notFillable = this.constructor._getNotFillable() || [];
        for( let el in data ){
            if( notFillable.indexOf( el ) === -1 && typeof this[ el ] != 'function' ){
                this[ el ] = data[ el ];
            }
        }
    }
    
    static get SINGLE_TYPE(){ return ''; }

    static get FAMILY_TYPE(){ return ''; }

    static _getNotFillable(){ return []; }


    static where( queryString, params = {} ){
        params.q = queryString;
        let searcher = new Browser();
        searcher.config = params;
        searcher.factory = this;
        return searcher.all();
    }

    get( includes = [] ){
        return new Promise((resolve,reject) => {
            let browser = new Browser({
                id: this.id,
                slug: this.slug || this.song_slug,
                factory: this.constructor
            });
            browser.config = { includes: includes };
            browser.get().then( object => {
                //parasites the returned object to update current one
                this._massAssign( object.rawData );
                this.rawData = object.rawData;
                resolve(this);
            });
        });

/*

        let browser = new Browser({
            id: this.id,
            slug: this.slug,
            factory: this.constructor
        });
        browser.config = { includes: includes };
        return browser.get().then( object => {
            //parasites the returned object to update current one
            this._massAssign( object.rawData );
            this.rawData = object.rawData;
            this.simplified = false;
            return this;
        });*/
    }

    static find( id, includes = [] ){
        let browser = new Browser( { id: id, factory: this } );
        browser.config = { includes: includes };
        return browser.get();
    }
}

export default Model;