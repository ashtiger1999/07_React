package com.todo.demo.todo.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.todo.demo.todo.model.dto.Todo;

@Mapper
public interface TodoMapper {

	// select todo
	List<Todo> getTodoList();

	// insert todo
	int insertTodo(Todo todo);

	// update isComplete
	int changeIsComplete(Todo todo);

	// update todo_del_fl
	int deleteTodo(Todo todo);

}
