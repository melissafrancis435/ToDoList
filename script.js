const nameInput = document.querySelector('#name');
const username = localStorage.getItem('username')|| '';
todos = JSON.parse(localStorage.getItem('todos'))|| [];
const newtodoform = document.querySelector('#new-todo-form');


nameInput.value = username;

nameInput.addEventListener('change', function(e){
    localStorage.setItem('username', e.target.value)
})

newtodoform.addEventListener('submit', function(e){
    e.preventDefault();
    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));

    e.target.reset();
    DisplayTodos();
})


function DisplayTodos(){
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";

    todos.forEach(function(todo){
        const todoItem = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deletebutton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        todoItem.classList.add('todo-item')
        
    
        
        if (todo.category =='personal'){
            span.classList.add('personal')
        }
        else{
            span.classList.add('business')
        }
        

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deletebutton.classList.add('delete');
        

        content.innerHTML =`<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deletebutton.innerHTML = 'Delete';
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deletebutton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);


        if (todo.done) {
        todoItem.classList.add('done');
    }
    input.addEventListener('change', (e) => {
        todo.done = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));

        if (todo.done) {
            todoItem.classList.add('done');
        } 
        
        else {
            todoItem.classList.remove('done');
        }
        DisplayTodos()
    })

    deletebutton.addEventListener('click',function(){
        todos = todos.filter(t => t!=todo);
        localStorage.setItem('todos',JSON.stringify(todos));
        DisplayTodos()
    })

    edit.addEventListener('click',function(e){
        const input = content.querySelector('input');
        input.removeAttribute('readonly');
        input.focus();
        input.addEventListener('blur',function(e){
            input.setAttribute('readonly', true);
            todo.content = e.target.value;
            localStorage.setItem('todos', JSON.stringify(todos));
            
            DisplayTodos()
        })


    })
 

    
    
    
    })
}
DisplayTodos()


