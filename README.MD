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
//keep this var on a scope reachable from UI
let currentPage;

Video.where( 'Abba Mamma Mia', config )
    .then( page => {
        //first time that I've got a page.
        //store the page into a scope to access it from next-click-handler event
        currentPage = page;
        drawVideosList( page.elements );//draw your list here
    });

let onClickNextHandler = () => {
    currentPage.next()
        .then( page => {
            //currentPage automatically updates with the last page recovered.
            drawVideosList( page.elements );//draw your list here
        })
}
```

*Get first video from a search and draw its artists*
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

No more features by now until IMVDb support replies about the API development continuity. Some server-side issues arose in this development process.

## Development
```git clone git@github.com:Cosmitar/imvdb-client.git```

```npm install```

```gulp watch```

Open the localhost:3000/demo/index.html and look for console logs

##Installation
IMVDb discourages production use because API is still in beta.

##License
MIT