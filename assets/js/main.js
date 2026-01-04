const list = document.querySelector('.list')
const input = document.querySelector('.input')
let tasks = []

input.addEventListener('keyup', (event) => {
  if (event.key.toLowerCase() === 'enter' && input.value !== '') {
    const item = input.value.trim()
    tasks.push({
      done: false,
      title: item,
    })
    input.value = ''
    input.focus()
    saveToStorage()
    renderList()
  }
})

function renderList() {
  list.innerHTML = ''
  for (const task of tasks) {
    const li = document.createElement('li')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.done
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked
      saveToStorage()
      renderList()
    })

    li.classList.toggle('done', task.done)

    const text = document.createElement('span')
    text.textContent = task.title
    li.append(checkbox, text)
    list.appendChild(li)
  }
}

function loadFromStorage() {
  const savedTasks = localStorage.getItem('todoTasks')

  if (savedTasks) {
    try {
      tasks = JSON.parse(savedTasks)
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error)
    }
  } else {
    tasks = []
  }

  renderList()
}

function saveToStorage() {
  localStorage.setItem('todoTasks', JSON.stringify(tasks))
}

loadFromStorage()
