
const FLOORS = 2
const FLOOR_ID_OFFSET = 8
const ROWS = 2
const SECTIONS = 6
const TABLES = 8

const sections = {
  'enginering': ['8.1.1', '8.1.2', '8.1.3', '8.1.4', '8.1.5'],
  'marketing': ['8.1.6'],
  'design': ['8.2.1'],
  'product': ['8.2.2'],
  'integrations': ['8.2.3'],
  'sales': ['8.2.4'],
  'insurance': ['8.2.5', '8.2.6'],

  'hr': ['9.1.1'],
  'founders': ['9.1.2'],
  'office': ['9.2.1'],
  'cc': ['9.1.3', '9.1.4', '9.1.5', '9.1.6', '9.2.2', '9.2.3', '9.2.4', '9.2.5', '9.2.6']
}

function generateTables() {
  for (let floor = 0; floor < FLOORS; floor++) {
    const $floorContainer = document.createElement('div')
    $floorContainer.classList.add('floor-container')

    const $floor = document.createElement('div')
    $floor.classList.add('floor')
    $floor.id = floor + FLOOR_ID_OFFSET
    $floor.setAttribute('data-id', floor + FLOOR_ID_OFFSET)
    for (let row = 1; row <= ROWS; row++) {
      const $row = document.createElement('div')
      $row.classList.add('row')
      $row.id = `${$floor.id}.${row}`
      $row.setAttribute('data-id', row)
      for (let section = 1; section <= SECTIONS; section++) {
        const $section = document.createElement('div')
        $section.classList.add('section')
        $section.id = `${$floor.id}.${row}.${section}`
        $section.setAttribute('data-id', section)
        const $sectionTables = document.createElement('div')
        $sectionTables.classList.add('section-tables')
        $section.appendChild($sectionTables)
        for (let table = 1; table <= TABLES; table++) {
          const $table = document.createElement('div')
          $table.classList.add('table')
          $table.id = `${$floor.id}.${row}.${section}.${table}`
          $table.setAttribute('data-id', table)
          $table.innerText = table
          $table.style.order = table > TABLES/2 ? 2*TABLES - table : table
          $sectionTables.appendChild($table)
        }
        $row.appendChild($section)
      }
      $floor.appendChild($row)
    }
    $floorContainer.appendChild($floor)
    $control = document.createElement('button')
    $control.innerText = `${$floor.id}th Floor`
    $control.setAttribute('data-id', $floor.id)
    on($control, 'click', e => {
      $$('.floor').forEach(e => e.classList.remove('focused'))
      $(`.floor[id='${e.target.getAttribute('data-id')}']`).classList.add('focused')
    })
    $('.floor-control').appendChild($control)

    document.body.appendChild($floorContainer)
    Object.keys(sections).forEach(team => {
      sections[team].forEach(section => {
        $(`.section[id='${section}']`).classList.add(team)
      })
    })

  }

  $('.floor').classList.add('focused')
}
