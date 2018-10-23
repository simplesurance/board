// Column indexes
const ROW = 0
const SECTION = 1
const TABLE = 2
const NAME = 3
const ROLE = 4
const HIPCHAT = 5

function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1Mf6l4NasmHx8FKlrhTU_am4bdMzRu5yC1yMQ6PqG1RQ',
    range: 'User Data!A2:F',
  }).then(function(response) {
    const range = response.result
    const people = []

    if (range.values.length > 0) {
      range.values.forEach(row => {
        if (row[HIPCHAT] && row[HIPCHAT] !== '-') {
          people.push({
            username: row[HIPCHAT],
            name: row[NAME],
            position: row[ROLE],
            address: `${row[ROW]}.${row[SECTION]}.${row[TABLE]}`,
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

window.addEventListener('signInSuccess', function () {
  listMajors()
})

function setPeople (people) {
  console.log(people)
  people.forEach(person => {
    const $option = document.createElement('option')
    $option.setAttribute('value', person.username)
    $option.innerText = person.name
    $("#name-options").appendChild($option)
  })
  window.people = people
}
