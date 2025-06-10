package com.todo.demo.todo.model.service;

import java.util.List;

import com.todo.demo.todo.model.dto.Todo;

public interface TodoService {

	// select todo
	List<Todo> getTodoList();

	// insert todo
	int insertTodo(Todo todo);

	// update isComplete
	int changeIsComplete(Todo todo);

	// update todo_del_fl
	int deleteTodo(Todo todo);

}
