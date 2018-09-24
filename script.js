
fetch('data.json')
.then(data => data.json())
.then(data => {
  console.log(data)
  data.people.forEach(person => {
    const $option = document.createElement('option')
    $option.setAttribute('value', person.username)
    $option.innerText = person.name
    $("#name-options").appendChild($option)
  })
  window.people = data.people
})
