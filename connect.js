// Column indexes
const FLOOR   = 0
const ROW     = 1
const SECTION = 2
const TABLE   = 3
const NAME    = 4
const POSITION = 5
const USERNAME = 6
const ROLES    = 7

function connect() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1Mf6l4NasmHx8FKlrhTU_am4bdMzRu5yC1yMQ6PqG1RQ',
    range: 'User Data!A2:I',
  }).then(function(response) {
    const range = response.result
    const people = []

    if (range.values.length > 0) {
      range.values.forEach(row => {
        if (row[NAME] && row[NAME] !== '-') {
          people.push({
            username: (row[USERNAME] || row[NAME].toLowerCase().replace(/ /, '')).trim(),
            hideSeat: row[NAME].trim() === 'disabled',
            name: row[NAME].trim(),
            position: row[POSITION],
            floor: row[FLOOR],
            address: `${row[FLOOR]}.${row[ROW]}.${row[SECTION]}.${row[TABLE]}`,
            roles: (row[ROLES]||"").split(/,/),
          })
        }
      })
      setPeople(people)
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

function getConfig() {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1Mf6l4NasmHx8FKlrhTU_am4bdMzRu5yC1yMQ6PqG1RQ',
    range: 'Configs!A1:B',
    majorDimension: 'ROWS'
  }).then(function(response) {
    const range = response.result
    window.config = {}

    range.values.forEach(values => {
      window.config[values[0]] = values[1]
    })
    console.log(window.config)

  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

window.addEventListener('signInSuccess', () => {
  getConfig()
  .then(connect)
})
on($('#refresh_button'), 'click', connect)

function setPeople (people) {
  console.log(people)
  window.people = people

  $('.auth-window').classList.add('hidden')

  generateDropdown()
  generateTables()
  handleTableClick()
}
