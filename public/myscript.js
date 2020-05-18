
function getTodoHtml(todoData) {
    const html = `<li data-id="${todoData.id}">
    <form onsubmit="return updateTodo(${todoData.id}")>
    <input type="text" class="js-todo-item-${todoData.id}" value="${todoData.todo}">
    <button type="submit">Save</button>
    </form>
    <button type="button" onclick="deleteTodo(${todoData.id})">X</button>
    </li>`

    return html;
}

function renderTodos() {
    axios.get('/api/todos/')
        .then((response) => {
            const htmlArray = response.data.map(todoItem => {
                return getTodoHtml(todoItem);
            })
            const htmlString = htmlArray.join('');
            const todos = document.querySelector('.js-todos');
            todos.innerHTML = htmlString;
        })
        .catch((error) => {
            alert(`could not get id: ${todoItem.id} + ${error}`);
        })
}

function addTodo(text) {
    axios.get('/api/todos/', {
        todo: text,
    })
        .then((response) => {
            const htmlString = getTodoHtml(response.data);
            const todos = document.querySelector('.js-todos');
            todo.innerHTML += htmlString;
        })
        .catch((error) => {
            alert(`could not add todo: ${text} ${status}`)
        })
}

const addForm = document.querySelector('.js-add-form');

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = document.querySelector('.js-input').value;
    addTodo(text);
    addForm.reset();
})



renderTodos();