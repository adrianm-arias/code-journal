/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('journal-entries-storage');
data = JSON.parse(previousEntriesJSON);

// this event stores the object models into local storage
window.addEventListener('beforeunload', event => {
  var journalArrayJSON = JSON.stringify(data);
  localStorage.setItem('journal-entries-storage', journalArrayJSON);
});
