function createElement(tag, props, ...children) {
    const element = document.createElement(tag)

    Object.keys(props).forEach(key => element[key] = props[key])
}


function createTodoItem(title) {
    const checkbox = document.createElement('input', {type: 'checkbox', className:'checkbox'})
    checkbox.type = 'checkbox'
    checkbox.className = 'checkbox'

    const label = document.createElement('label')
    label.innerText = title
    label.className = 'title'

    const editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.className = 'textfield'

    const editButton = document.createElement('button')
    editButton.innerText = 'Изменить'
    editButton.className = 'edit'

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Удалить'
    deleteButton.className = 'delete'

    const listItem = document.createElement('li')
    listItem.className = 'todo-item'

    listItem.appendChild(checkbox)
    listItem.appendChild(label)
    listItem.appendChild(editInput)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)

    bindEvents(listItem)

    return listItem
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox')
    const editButton = todoItem.querySelector('button.edit')
    const deleteButton = todoItem.querySelector('button.delete')
    checkbox.addEventListener('change', toogleTodoItem)
    editButton.addEventListener('click', editTodoItem)
    deleteButton.addEventListener('click', deleteTodoItem)
}


function addTodoItem(event) {
    event.preventDefault()

    if (addInput.value === '')
        return alert("Введите название задачи")
    const todoItem = createTodoItem(addInput.value)
    toDoList.appendChild(todoItem)
    addInput.value = ''
}

function toogleTodoItem({target}) {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed')
}

function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title')
    const editInput = listItem.querySelector('.textfield')
    const isEditing = listItem.classList.contains('editing')

    if (isEditing) {
        title.innerText = editInput.value
        this.innerText = "Изменить"
    } else {
        editInput.value = title.innerText
        this.innerText = 'Сохранить'
    }
    listItem.classList.toggle('editing')
}

function deleteTodoItem() {
    const listItem = this.parentNode
    toDoList.removeChild(listItem)
}

const toDoForm = document.getElementById('todo-form')
const addInput = document.getElementById('add-input')
const toDoList = document.getElementById('todo-list')
const toDoItems = document.querySelectorAll('.todo-item')

function main() {
    toDoForm.addEventListener('submit', addTodoItem)
    toDoItems.forEach(item => bindEvents(item))
}
main()

