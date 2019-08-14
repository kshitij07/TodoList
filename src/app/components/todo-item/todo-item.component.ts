import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { Todo } from 'src/app/models/Todo';
import { TodosComponent } from '../todos/todos.component';

export interface DialogData {
  name: string;
  title: string;
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  public name: string;
  public title: string;

  constructor(public dialog: MatDialog, private todoComponent: TodosComponent) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo) {
    todo.completed = !todo.completed;
  }

  onDelete(todo, i) {
    this.deleteTodo.emit({completed: todo.completed, title: todo.title, id: i});
  }

  openDialog(todo): void {
    const dialogRef = this.dialog.open(EditDialog, {
      height: '400px',
      width: '600px',
      data: {name: this.name, title: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.title = result;
      if(result!=undefined){
        this.todoComponent.update(todo, this.title);
      }
    });
  }
}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
  styleUrls: ['./todo-item.component.css']
})
export class EditDialog {

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
