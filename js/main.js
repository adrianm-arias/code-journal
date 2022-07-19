var $inputUrl = document.getElementById('url');
var $imgPlaceholder = document.querySelector('.placeholder-img');

// this function updates the url image placeholder
$inputUrl.addEventListener('input', function (event) {
  var photoUrl = $inputUrl.value;
  $imgPlaceholder.setAttribute('src', photoUrl);
});

var $entryForm = document.getElementById('entry-form');
var journalArray = [];
var journalEntry = {};
var nextEntryId = 1;

// this event captures the input values and adds them into an object
$entryForm.addEventListener('submit', event => {
  event.preventDefault();
  journalEntry.title = $entryForm.elements.title.value;
  journalEntry.imgUrl = $entryForm.elements.url.value;
  journalEntry.notes = $entryForm.elements.notes.value;
  journalEntry.entryId = nextEntryId;
  nextEntryId++;
  journalArray.unshift(journalEntry);
  journalEntry = {};
  $imgPlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});

// this event stores the object models into local storage
window.addEventListener('beforeunload', event => {
  var journalArrayJSON = JSON.stringify(journalArray);
  localStorage.setItem('journal-entries-storage', journalArrayJSON);
});
