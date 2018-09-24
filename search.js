const $nameSearch = $('#name-search')
const $nameResults = $('#name-search-results')
const $jobSearch = $('#job-search')
const $jobResults = $('#job-search-results')

function filterAndSort(list = [], needle = '', keys) {
  return list.filter(value => {
    if (keys) {
      return keys.find(key => {
        return value[key].toLowerCase().includes(needle.toLowerCase())
      })
    } else {
      return value.toLowerCase().includes(needle.toLowerCase())
    }
  }).sort((a, b) => {
    return a.name > b.name ? 1
    : a.name < b.name ? -1
    : 0
  })
}

function reduce(list, key) {
  return list.map(obj => obj[key])
}

function toOptions(list) {
  return list.map(person => {
    const $option = document.createElement('div')
    $option.className = "result"
    $option.setAttribute('data-value', person.username)
    $option.innerText = person.name
    return $option
  })
}
function toJobResults(list) {
  return list.map(person => {
    const $option = document.createElement('div')
    $option.className = "result"
    $option.setAttribute('data-value', person.username)
    $option.innerHTML = `<small>${person.name}</small><br/><span>${person.position}</span>`
    return $option
  })
}

function findPerson(username) {
  return people.find(person => {
    return person.username === username
  })
}

on($nameSearch, 'focus', e => {
  $nameResults.classList.remove('hidden')
})
on($nameSearch, 'blur', e => {
  $nameResults.classList.add('hidden')
})
on($nameSearch, 'input', e => {
  if (e.target.value.length > 0) {
    results = filterAndSort(people, e.target.value, ['name', 'username'])
    $nameResults.innerHTML = ''
    toOptions(results).forEach($result => $nameResults.append($result))
  } else {
    $nameResults.innerHTML = ''
  }
})
on($jobSearch, 'input', e => {
  if (e.target.value.length > 0) {
    results = filterAndSort(people, e.target.value, ['position'])
    $jobResults.innerHTML = ''
    toJobResults(results).forEach($result => $jobResults.append($result))
  } else {
    $jobResults.innerHTML = ''
  }
})
on($jobResults, 'click', e => {
  username = e.target.getAttribute('data-value')
  person = findPerson(username)
  console.log(person);
  address = person.address.split('.')

  $seat = $(`.row[data-id="${address[0]}"] .section[data-id="${address[1]}"] .table[data-id="${address[2]}"]`)
  console.log($seat);
  $('.highlight').classList.remove('highlight')
  $seat.classList.add('highlight')

})
