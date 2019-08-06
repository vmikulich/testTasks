<template>
    <div>
        <div class="container">
            <div class="inputs-container">
                <div class="add-inputs">
                    <div>
                        <h2>Add todo</h2>
                        <label>Your todo:</label>
                        <textarea @keydown.enter="editManager.status ? editTodo() :addTodo()" 
                               v-model="text" 
                               type="text" 
                        ></textarea>
                        <label>Your tags (specify them through the space):</label>
                        <input type="text" v-model="tagList">
                    </div>
                    <div class="btns">
                        <button v-if="!editManager.status" @click="addTodo">Add todo</button>
                        <button v-else @click="editTodo">Save changes</button>
                    </div>
                </div>
                <div class="search-inputs">
                    <input v-model="search" type="text" class="input" placeholder="Search">
                </div>
            </div>
            <div class="content-container">
                <Todo 
                    v-for="(todo, index) in filtredTodos" 
                    :content="todo" 
                    :key="todo.message"
                    @remove-todo="remove(index)"
                    @edit-todo="edit">
                </Todo>
            </div>
        </div>    
    </div>
</template>


<script>

import Todo from "./Todo.vue"
import axios from "axios"

export default {
    name: "Todos",
    components: {
        Todo
    },
    data() {
        return {
            editManager: {
                status: false,
                todo: {
                    message: "",
                    tags: []
                }
            },
            text: "",
            todos: [],
            search: '',
            tagList: ''
        }
    },
    async created() {
        try {
            const res = await axios.get(`http://localhost:3000/todos`);
            this.todos = res.data.map(todo => {
                return {
                    message: todo.message,
                    tags: todo.tags.concat(this.findTags(todo.message))
                }
            });
        } catch(e) {
            console.error(e);
        }
    },
    computed: {
        filtredTodos() {
            if (this.search === '') return this.todos;
            return this.todos.filter(item => item.tags.includes(this.search))
                             .slice()
        }
    },
    methods: {
        editTodo() {
            if (this.text) {
                const index = this.todos.findIndex(todo => todo.message === this.editManager.todo.message);
                const todo = {
                        message: this.text,
                        tags: this.workWithTags()
                }
                this.todos.splice(index, 1, todo);
                this.resetData();
            }
        },
        edit(content) {
            this.text = content.message;
            this.tagList = content.tags.join(' ');
            this.editManager.status = true;
            this.editManager.todo = content;
        },
        remove(index) {
            this.todos.splice(index, 1)
        },
        resetData() {
            this.text = "";
            this.tagList = "";
            this.editManager = {
                status: false,
                todo: {
                    message: "",
                    tags: []
                }
            }
        },
        addTodo() {
            if (this.text) {
                const todo = {
                    message: this.text,
                    tags: this.workWithTags()
                }
                this.todos.push(todo);
                this.resetData();
            }
            
        },
        workWithTags() {
            const tagsFromMessage = this.findTags(this.text);
            if ( this.tagList !== '') {
                const tags = this.tagList.split(' ');
                tags.forEach(tag => {
                    if (!tagsFromMessage.includes(tag) && tag !== '') {
                        this.isWithLattice(tag) ? tagsFromMessage.push('#' + tag) : tagsFromMessage.push(tag);
                    }
                })
            }
            return tagsFromMessage;
        },
        findTags(str) {
            if (!str.match(/#[\wа-яё]+/ig)) return new Array(0);
            return str.match(/#[\wа-яё]+/ig);
        },
        isWithLattice(str) {
            return str.match(/#/) === null;
        }
    }
}
</script>


<style lang="scss" >

    $firstColor: rgb(42, 148, 74);
    $secondColor: #f3f2f27e;
    $fontColor: #2c3e50;

    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
    }
    * {
        box-sizing: inherit;
    }
    body {
        outline: none;
        box-sizing: border-box;
        background-color: $secondColor;
    }
    .container {
        max-width: 900px;
        margin: auto;
        margin-top: 20px;
        .inputs-container {
            display: flex;
            justify-content: space-between;
            .add-inputs {
                width: 40%;
                h2 {
                    margin-bottom: 10px;
                }
                label: {
                    font-size: 15px;
                }
                textarea, input{
                    font-size: 15px;
                    outline: none;
                    width: 100%;
                    border: 0;
                    border-bottom: 2px solid $fontColor;
                    display: block;
                    padding: 10px 5px;
                    margin-bottom: 15px;
                    transition: .2s;
                    background-color:$secondColor;
                }
                textarea {
                    font-family: 'Avenir', Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    resize: vertical;
                }
                input:focus, textarea:focus {
                    border-bottom: 2px solid $firstColor;
                }
                .btns button{
                    width: 100%;
                    height: 40px;
                    text-align: center;
                    padding: 2px 10px;
                    background-color: $firstColor;
                    color: #fff;
                    cursor: pointer;
                    transition: all .3s ease;
                    border: transparent;
                    font-size: 15px;
                    &:hover {
                        background-color: rgb(27, 97, 48);
                    }
                }
            }
            .search-inputs {
                input {
                    outline: none;
                    padding: 2px 10px;
                    border-radius: 50px;
                    border: 1.5px solid $fontColor;
                    width: 250px;
                    height: 30px;
                    background-color: $secondColor;
                    &:focus {
                        border: 1.5px solid $firstColor;
                        background-color: #fff;
                    }
                }               
            }
        }
        .content-container {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
        }
    }
</style>
