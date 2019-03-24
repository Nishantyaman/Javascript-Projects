//listen to form submit

document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    

    if(!siteName || siteUrl){
        alert('Please fill in the form')
        return false
    }
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //local Storage Test
        // localStorage.setItem('test','Hello World')
        // console.log(localStorage.getItem('test'))
        // localStorage.removeItem('test');
        // console.log(localStorage.getItem('test'))
    //console.log(bookmark)


    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    } else{
        //get bookmarks 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }

    fetchBookmarks();
    //prevent form from submitting
    e.preventDefault();

}

//Delete Bookmark
function deleteBookmark(url){
    //get bookmarks
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //Loop through bookmarks
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }

    // Re-set to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks();

}

//fetch Bookmark
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
                                      '</h3>'+
                                      '</div>'
    }

}