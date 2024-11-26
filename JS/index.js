var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var bookmarksTable = document.getElementById('bookmarksTable');
var nameErrIcon = document.getElementById('nameErrIcon');
var urlErrIcon = document.getElementById('urlErrIcon');
var validRules = document.getElementById('validRules');
var allBookmarks = [];


if(localStorage.getItem('allBookmarks')){
    allBookmarks = JSON.parse(localStorage.getItem('allBookmarks'));
    displayBookmarks();
}


function addBookmark(){
    bookmark = {
        bName: siteName.value,
        bURL: siteURL.value
    };

    bookmark.bName = bookmark.bName.charAt(0).toUpperCase() + bookmark.bName.slice(1);

    var bookmarkExists = false;

    for(var i = 0; i < allBookmarks.length; i++){
        if(allBookmarks[i].bName.toLowerCase() == bookmark.bName.toLowerCase()){
            bookmarkExists = true;
        }
    }

    if(bookmarkExists || bookmark.bName.length < 3 && validateUrl(bookmark.bURL) == false){
        siteName.classList.add('error-control');
        siteURL.classList.add('error-control');

        nameErrIcon.classList.remove("d-none");
        urlErrIcon.classList.remove("d-none");

        validRules.classList.remove("d-none");
    } 
    
    else if(bookmarkExists || bookmark.bName.length < 3){
        siteName.classList.add('error-control');

        nameErrIcon.classList.remove("d-none");

        validRules.classList.remove("d-none");
    } 
    
    else if(validateUrl(bookmark.bURL) == false){
        siteURL.classList.add('error-control');

        urlErrIcon.classList.remove("d-none");

        validRules.classList.remove("d-none");
    }
    
    else{
        siteName.classList.remove('error-control');
        siteURL.classList.remove('error-control');
        
        nameErrIcon.classList.add("d-none");
        urlErrIcon.classList.add("d-none");
        
        validRules.classList.add("d-none");

        allBookmarks.push(bookmark);
        localStorage.setItem('allBookmarks', JSON.stringify(allBookmarks));
        clearInput();
        displayBookmarks();
    }
};


function validateUrl(str) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return pattern.test(str);
}


function clearInput(){
    siteName.value = null;
    siteURL.value = null;
};


function displayBookmarks(){
    var bookmarksList = ``;

    for(var i = 0; i < allBookmarks.length; i++){
        bookmarksList += `
            <tr class="py-3">
                <td>${i + 1}</td>
                <td>${allBookmarks[i].bName}</td>
    
                <td>
                    <a href="${allBookmarks[i].bURL}" target="_blank" class="btn btn-visit"><span class="pe-2"><i class="fa-solid fa-eye"></i></span>Visit</a>
                </td>
    
                <td>
                    <button onclick="deleteBookmark(${i})" class="btn btn-delete"><span class="pe-2"><i class="fa-solid fa-trash-can"></i></span>Delete</button>
                </td>
            </tr>
        `
    }

    bookmarksTable.innerHTML = bookmarksList;
}


function deleteBookmark(index){
    allBookmarks.splice(index, 1);
    localStorage.setItem('allBookmarks', JSON.stringify(allBookmarks));
    displayBookmarks();
}