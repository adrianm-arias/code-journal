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
  if (data.editing === null) {
    var journalEntry = {};
    journalEntry.title = $entryForm.elements.title.value;
    journalEntry.imgUrl = $entryForm.elements.url.value;
    journalEntry.notes = $entryForm.elements.notes.value;
    journalEntry.entryId = data.nextEntryId;
    data.nextEntryId++;
    var renderNewEntry = renderJournalEntries(journalEntry);
    var ulElement = document.querySelector('ul');
    ulElement.prepend(renderNewEntry);
    data.entries.unshift(journalEntry);
    $dataEntries.className = 'show';
    $imgPlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryForm.reset();
  } else {
    data.editing.title = $entryForm.elements.title.value;
    data.editing.imgUrl = $entryForm.elements.url.value;
    data.editing.notes = $entryForm.elements.notes.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = $entryForm.elements.title.value;
        data.entries[i].imgUrl = $entryForm.elements.url.value;
        data.entries[i].notes = $entryForm.elements.notes.value;
      }
    }
    $imgPlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
    $dataEntries.className = 'show';
    $entryContainer.className = 'hidden';
    data.editing = null;
    // $entryForm.reset();
    // element.remove()
    // data.entries[i].replaceWith()

  }

});

function renderJournalEntries(entries) {
  var liItem = document.createElement('li');
  var rowDiv = document.createElement('div');
  liItem.setAttribute('data-entry-id', entries.entryId);
  rowDiv.className = 'row padding-top-bottom';
  liItem.appendChild(rowDiv);
  // journal image dom creation
  var columnDiv = document.createElement('div');
  columnDiv.className = 'column-half';
  rowDiv.appendChild(columnDiv);

  var imgContainer = document.createElement('div');
  imgContainer.className = 'img-container padding-top-bottom';
  columnDiv.appendChild(imgContainer);
  var img = document.createElement('img');
  img.className = 'placeholder-img';
  img.setAttribute('src', entries.imgUrl);
  img.setAttribute('alt', 'journal entry image');
  imgContainer.appendChild(img);
  // journal text content dom creation
  var columnDivText = document.createElement('div');
  columnDivText.className = 'column-half pos-rel';
  rowDiv.appendChild(columnDivText);

  var entryTitle = document.createElement('h2');
  entryTitle.className = 'entry-title padding-top-bottom';
  entryTitle.textContent = entries.title;
  columnDivText.appendChild(entryTitle);

  var editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pencil edit-icon';
  columnDivText.appendChild(editIcon);

  var entryNotes = document.createElement('p');
  entryNotes.className = 'entry-notes padding-top-bottom';
  entryNotes.textContent = entries.notes;
  columnDivText.appendChild(entryNotes);

  return liItem;
}

function entriesArray() {
  var ulElement = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderJournalEntries(data.entries[i]);
    ulElement.appendChild(render);
  }
}

entriesArray();

var $navEntries = document.querySelector('a');

// this event hides the entry form and shows entries
$navEntries.addEventListener('click', function (event) {
  dataView('entries');
});

var $newEntryButton = document.getElementById('button-new');
// this event hides entries and shows entry form
$newEntryButton.addEventListener('click', function (event) {
  dataView('entry-form');
});

var $entryContainer = document.getElementById('entry-container');

var $dataEntries = document.querySelector('[data-view="entries"]');

function dataView(string) {
  if (string === 'entry-form') {
    $dataEntries.className = 'hidden';
    $entryContainer.className = 'show';
  } else {
    $entryContainer.className = 'hidden';
    $dataEntries.className = 'show';
  }
}

window.addEventListener('beforeunload', event => {
  var dataViewForm = JSON.stringify($entryContainer.className);
  var dataViewEntry = JSON.stringify($dataEntries.className);
  localStorage.setItem('data-form', dataViewForm);
  localStorage.setItem('data-entry', dataViewEntry);
});

document.addEventListener('DOMContentLoaded', event => {
  var dataviewForm = localStorage.getItem('data-form');
  var dataViewEntry = localStorage.getItem('data-entry');
  var viewFormParse = JSON.parse(dataviewForm);
  var dataFormParse = JSON.parse(dataViewEntry);
  if (viewFormParse === 'show' && dataFormParse === 'hidden') {
    $dataEntries.className = 'hidden';
    $entryContainer.className = 'show';
  } else if (viewFormParse === 'hidden' && dataFormParse === 'show') {
    $dataEntries.className = 'show';
    $entryContainer.className = 'hidden';
  }
});

var $renderedList = document.querySelector('ul');

var $editingTitle = document.querySelector('h1');

$renderedList.addEventListener('click', function (event) {
  if (event.target && event.target.matches('I')) {
    $entryContainer.className = 'show';
    $editingTitle.textContent = 'Edit Entry';
    $dataEntries.className = 'hidden';
    var targetId = event.target.closest('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(targetId.getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
        $entryForm.elements.title.value = data.editing.title;
        $entryForm.elements.url.value = data.editing.imgUrl;
        $entryForm.elements.notes.value = data.editing.notes;
        $imgPlaceholder.setAttribute('src', data.editing.imgUrl);
      }
    }
  }
});
