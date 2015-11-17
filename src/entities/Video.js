"use strict"
import Model from './../classes/Model';
import Entity from './Entity';

class Video extends Model {
    constructor(data) {
        super(data);
        this._artistsCollection = [];
        this._featuredArtistsCollection = [];
    }

    static get SINGLE_TYPE(){
        return 'video';
    }

    static get FAMILY_TYPE(){
        return 'videos';
    }

    static _getNotFillable(){
        return ['artists','featured_artists'];
    }

    get artists() {
        let retVal = [];
        let artistsCollection = [];
        if( this._artistsCollection.length > 0 ){
            retVal = this._artistsCollection;
        }else{
            if( this.rawData.artists.length > 0 ){
                for( let artistData of this.rawData.artists ){
                    artistsCollection.push( new Entity( artistData ) );
                }
                retVal = artistsCollection;
            }
        }
        return retVal;
    }

    get featured_artists() {
        let retVal = [];
        let artistsCollection = [];
        if( this._featuredArtistsCollection.length > 0 ){
            retVal = this._featuredArtistsCollection;
        }else{
            if( this.rawData.featured_artists.length > 0 ){
                for( let artistData of this.rawData.featured_artists ){
                    artistsCollection.push( new Entity( artistData ) );
                }
                retVal = artistsCollection;
            }
        }
        return retVal;
    }
}

export default Video;