import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  todoTitleList: string[] = [];

  constructor() { }

  ngOnInit() {
    this.todos = [];
  }

  deleteTodo(todo:Todo, i: number) {
    var str = todo.title;
    for(let i=0;i<this.todos.length;i++){
      this.todoTitleList.push(this.todos[i].title);
    }
    var index = this.todoTitleList.indexOf(todo.title, 0);
    if (index !== undefined) {
      this.todos.splice(index, 1);
    }
    this.todoTitleList = [];
  }

  addTodo(todo:Todo) {
    this.todos.push(todo);
  }

  update(todo: Todo, title: string) {
    for(let i=0;i<this.todos.length;i++) {
      if(this.todos[i].title == todo.title) {
        this.todos[i].title = title;
      }
    }
  }

}
