var $inputUrl = document.getElementById('url');
var $imgPlaceholder = document.querySelector('.placeholder-img');

// this function updates the url image placeholder
$inputUrl.addEventListener('input', function (event) {
  var photoUrl = $inputUrl.value;
  $imgPlaceholder.setAttribute('src', photoUrl);
});

var $entryForm = document.getElementById('entry-form');

// this event captures the input values and adds them into an object
$entryForm.addEventListener('submit', event => {
  event.preventDefault();
  var journalEntry = {};
  journalEntry.title = $entryForm.elements.title.value;
  journalEntry.imgUrl = $entryForm.elements.url.value;
  journalEntry.notes = $entryForm.elements.notes.value;
  journalEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(journalEntry);
  $imgPlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
