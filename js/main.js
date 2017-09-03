// Form Submit Listen
document.querySelector('#myForm').addEventListener('submit', saveBookmark);

// Create Function for save Bookmarks
function saveBookmark(e) {

  // Get values
  const siteName = document.querySelector('#siteName').value;
  const siteUrl = document.querySelector('#siteUrl').value;

  //Validate Form
  if (!validateForm(siteName, siteUrl)){
    return false;
  }

  // Create Object for values
  const bookmark = {
    name: siteName,
    url: siteUrl
  };
  console.log(bookmark);

  // Local storage, check for bookmarks is null
  if (localStorage.getItem('bookmarks') === null){
    //Create array
    const bookmarks =[];

    //Add bookmark to array
    bookmarks.push(bookmark);

    //Set LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get Bookmarks from LocalStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Add bookmarks to array
    bookmarks.push(bookmark);

    //Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  //Re fetch
  fetchBookmarks();

  // Prevent Default
  e.preventDefault();
}

// Delete Bookmarks
function deleteBookmark(url) {
  //Get bookmarks from LocalStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Loop bookmarks
  for (let i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      //Remove from array
      bookmarks.splice(i,  1);
    }
  }
  //Re-set back to LocalStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //Re fetch
  fetchBookmarks();
}

//Fetch Bookmarks

function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output item
  const bookmarkResults = document.querySelector('#bookmarksResults');

  //Build output
  bookmarkResults.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++){
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;
    console.log(name);

    bookmarkResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

//Form validation

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl){
    alert('Enter name and url please :)');
    return false;
  }

  //Here i google RegExp :)
  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please enter valid URL');
    return false;
  }
  return true;
}