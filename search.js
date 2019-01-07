const $nameSearch = $('#name-search')
const $nameResults = $('#name-search-results')
const $jobSearch = $('#job-search')
const $jobResults = $('#job-search-results')
const $nameOptions = $('#name-options')
const $userCard = $('.user-card')

function filterAndSort(list = [], needle = '', keys) {
  return list.filter(value => {
    if (keys) {
      return keys.find(key => {
        if (Array.isArray(value[key])) {
          return (value[key].join('')).toLowerCase().includes(needle.toLowerCase())
        } else if (value[key]) {
          return value[key].toLowerCase().includes(needle.toLowerCase())
        }

        return null
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
    let content = ''
    content += `<small>${person.name}</small><br/>`
    content += `<span>${person.position}</span><br/>`
    person.roles.forEach(resp => {
      content += `<small class="responsability">${resp}</small>`
    })
    $option.innerHTML = content
    return $option
  })
}

function findPerson(value, property = 'username') {
  return people.find(person => {
    return person[property] === value
  })
}

function clearSelection() {
  $$('.highlight').forEach(e => e.classList.remove('highlight'))
}

function selectPerson(person, clear = true) {
  address = person.address

  $seat = $(`.table[id="${address}"]`)
  if (clear) {
    clearSelection()
  }
  $seat.classList.add('highlight')
  $jobResults.innerHTML = ''
  $nameResults.innerHTML = ''

  if (clear) {
    $userCard.innerHTML = `<strong>${person.name}</strong><br/>
      <span>${person.position}</span><br/>
      <small>${person.roles.join('<br/>')}</small>`
    $userCard.classList.remove('hidden')
  } else {
    $userCard.innerHTML = ''
    $userCard.classList.add('hidden')
  }
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
on($jobSearch, 'keydown', e => {
  if (e.which == 13 || e.keyCode == 13) { //ENTER
    results = filterAndSort(people, e.target.value, ['position', 'roles'])
    clearSelection()
    results.forEach(person => selectPerson(person, false))
  }
})
on($jobSearch, 'input', e => {
  if (e.target.value.length > 0) {

    results = filterAndSort(people, e.target.value, ['position', 'roles'])
    $jobResults.innerHTML = ''
    toJobResults(results).forEach($result => $jobResults.append($result))
  } else {
    $jobResults.innerHTML = ''
  }
})
on($nameOptions, 'change', e => {
  console.log(e);
  username = e.target.options[e.target.selectedIndex].getAttribute('value')
  person = findPerson(username)
  selectPerson(person)
})
on($jobResults, 'click', e => {
  username = e.target.getAttribute('data-value')
  person = findPerson(username)
  selectPerson(person)
})
on($nameResults, 'click', e => {
  username = e.target.getAttribute('data-value')
  person = findPerson(username)
  selectPerson(person)
})

function handleTableClick () {
  $$('.table').forEach(table => {
    const tableAddress = table.id
    const person = findPerson(tableAddress, 'address')

    if (!person) {
      table.classList.add('empty')
      return
    }
    if (person.hideSeat) {
      table.classList.add('disabled')
      return
    }

    table.addEventListener('click', () => {
      if (!person) {
        clearSelection()
        return
      }
      selectPerson(person)
    })
  })
}
