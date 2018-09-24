const $nameSearch = $('#name-search')
const $nameResults = $('#name-search-results')

function filter(list = [], needle = '', keys) {
  return list.filter(value => {
    return keys.find(key => {
      return value[key].toLowerCase().includes(needle.toLowerCase())
    })
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

on($nameSearch, 'focus', e => {
  $nameResults.classList.remove('hidden')
})
on($nameSearch, 'blur', e => {
  $nameResults.classList.add('hidden')
})
on($nameSearch, 'input', e => {
  if (e.target.value.length > 0) {
    results = filter(people, e.target.value, ['name', 'username'])
    $nameResults.innerHTML = ''
    toOptions(results).forEach($result => $nameResults.append($result))
  }
})
