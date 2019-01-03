// Column indexes
const FLOOR   = 0
const ROW     = 1
const SECTION = 2
const TABLE   = 3
const NAME    = 4
const ROLE    = 5
const USERNAME   = 6

function connect() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1Mf6l4NasmHx8FKlrhTU_am4bdMzRu5yC1yMQ6PqG1RQ',
    range: 'User Data!A2:G',
  }).then(function(response) {
    const range = response.result
    const people = []

    if (range.values.length > 0) {
      range.values.forEach(row => {
        if (row[NAME] && row[NAME] !== '-') {
          people.push({
            username: row[USERNAME],
            name: row[NAME],
            position: row[ROLE],
            address: `${row[FLOOR]}.${row[ROW]}.${row[SECTION]}.${row[TABLE]}`,
            responsabilities: [],
          })
        }
      })
      setPeople(people)
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

window.addEventListener('signInSuccess', connect)

function setPeople (people) {
  console.log(people)
  people.forEach(person => {
    const $option = document.createElement('option')
    $option.setAttribute('value', person.username)
    $option.innerText = person.name
    $("#name-options").appendChild($option)
  })
  window.people = people
  $('.auth-window').classList.add('hidden')

  generateTables()
  handleTableClick()
}
