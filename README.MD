# IMVDb Web API Client | ES6
Client written in ECMAScript 6. An easy to use SDK for [IMVDb Web API](https://imvdb.com/developers/api/) endpoints.

## Simple usage
Find (by id)
```javascript
Video.find( '121779770452' )
    .then( ... );
```

Search videos by keyword
```javascript
Video.where( 'aerosmith' )
    .then( ... );
```

Get Entity item by id
```javascript
Entity.find( 634 )
    .then( ... );
```

Find a video with includes
```javascript
Video.find( '121779770452', ['credits','sources','featured','popularity'] )
    .then( ... );
```

## Examples
*Search videos with pagination options*
```javascript
let config = {
    per_page: 10,
    page: 2
};
let currentPage;

Video.where( 'Abba Mamma Mia', config )
    .then( page => {
        currentPage = page;
        drawVideosList( page.elements );//draw your list here
    });

let onClickNextHandler = () => {
    currentPage.next()
        .then( page => {
            currentPage = page;
            drawVideosList( page.elements );//draw your list here
        })
}
```

*Get first video from a search and draw its artists name*
```javascript
Video.where( 'uptown funk' )
    .then( page => {
        let video = page.firstElement();
        drawArtistList( video.artists );
    });
```

*Find and Entity by id*
```javascript
Entity.find( 634 )
    .then( entity => {
        drawEntity( entity );
    });

```

*Search a Video and get its featured artists*
```javascript
Video.where( 'Lady Marmalade', ['featured'] )
    .then( page => {
        let video = page.firstElement();
        drawArtistList( video.featured_artists );
    });
````

No more features by now until IMVDb support reply about the API develoment continuity. Many bugs arise in this client development process.

## Development
```git clone git@github.com:Cosmitar/imvdb-client.git```

```npm install```

```gulp watch```

Open the localhost:3000/demo/index.html and look for console.logs

##Installation
Let me know if you'll need it, I can publish it on npm

##License
MIT