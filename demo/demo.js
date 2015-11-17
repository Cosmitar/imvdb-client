"use strict"
import Video from '../src/entities/Video';
import Entity from '../src/entities/Entity';

let Demo = {
    index: 0,
    continuous: false,
    all: function(){
        this.continuous = true;
        this.next();
    },
    next: function(){
        console.groupEnd();
        console.log('------------------------');
        console.group();
        this.index++;
        if( this[`demo${this.index}`] && this.continuous ){
            this[`demo${this.index}`]();
        }
    },
    demo1: function(){
        //DEMO SEARCH VIDEO
        let _self = this;
        console.log('DEMO SEARCH VIDEO');
        let config = {
            per_page: 10,
            page: 2
        };
        Video.where( 'Abba Mamma Mia', config ).then( page => {
            let videosCollection = page.elements;
            for( let video of videosCollection ){
                console.log( video.song_title );
            }
            _self.next();
        });
    },
    demo2: function(){
        //DEMO GET 1ST VIDEO FROM SEARCH AND SHOW ARTISTS NAMES
        let _self = this;
        console.log('DEMO GET 1ST VIDEO FROM SEARCH AND SHOW ARTISTS NAMES');
        Video.where( 'uptown funk' ).then( page => {
            let video = page.firstElement();
            for( let artist of video.artists ){
                console.log(`    ${artist.name}`);
            }
            _self.next();
        });
    },
    demo3: function(){
        //FIND AN ENTITY BY ID
        let _self = this;
        console.log('FIND AN ENTITY BY ID');
        Entity.find( 634 ).then( entity => {
            console.warn('This request return attribute byline as null even when doc say it should be Director');
            console.log( entity );
            _self.next();
        });
    },
    demo4: function(){
        //FIND A VIDEO BY ID WITH INCLUDES
        let _self = this;
        console.log('FIND A VIDEO BY ID WITH INCLUDES');
        Video.find( '121779770452', ['credits','sources','featured','popularity'] ).then( video => {
            //console.warn('This request return attribute byline as null even when doc say it should be Director');
            console.log( video );
            _self.next();
        });
    },
    demo5: function(){
        //SEARCH A VIDEO, GET ITS FEATURED ARTISTS
        let _self = this;
        console.log('SEARCH A VIDEO, GET ITS FEATURED ARTISTS');
        Video.where( 'Lady Marmalade' ).then( page => {
            let video = page.firstElement();
            console.log(video);
            video.get(['credits','sources','featured','popularity']).then( video => {
                console.log(video.featured_artists);
                for( let artist of video.featured_artists ){
                    console.log( `getting ${artist.name}` );
                    //Until /entity/{slug}/?method=slug works, to find an entity by slug you should:
                    //search an entity by name: http://imvdb.com/api/v1/search/entities?q={artist.name}
                    //iterate over results matching artist.slug
                    artist.get().then( artist => {
                        console.log( `    ${artist.name}` );
                        console.log( artist );
                    });
                }
            })
            _self.next();
        });
    },
    //@TODO If I get featured_artists from Video.get() doesn't have the artist id. So I need to find the artist by slug. I must implement a fallback on Model.get() to search by slug when id isn't present
    demoX: function(){
        let _self = this;
        _self.next();
    }
};

//Demo.all();
Demo.demo5();