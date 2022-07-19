var $inputUrl = document.getElementById('url');
var $imgPlaceholder = document.querySelector('.placeholder-img');

// this function updates the url image placeholder
$inputUrl.addEventListener('input', function (event) {
  var photoUrl = $inputUrl.value;
  $imgPlaceholder.setAttribute('src', photoUrl);
});

var $entryForm = document.getElementById('entry-form');

var journalEntry = {};

// this function adds input values into object (in progress)
$entryForm.addEventListener('submit', event => {
  event.preventDefault();
  journalEntry.title = $entryForm.elements.title.value;
  journalEntry.imgUrl = $entryForm.elements.url.value;
  journalEntry.notes = $entryForm.elements.notes.value;
});
