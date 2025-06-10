package com.todo.demo.todo.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todo.demo.todo.model.dto.Todo;
import com.todo.demo.todo.model.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class TodoServiceImpl implements TodoService {
	
	// field
	private final TodoMapper mapper;
	
	// select todo
	@Override
	public List<Todo> getTodoList() {
		return mapper.getTodoList();
	}

	// insert todo
	@Override
	public int insertTodo(Todo todo) {
		return mapper.insertTodo(todo);
	}
	
	// update isComplete
	@Override
	public int changeIsComplete(Todo todo) {
		return mapper.changeIsComplete(todo);
	}
	
	// update todo_del_fl
	@Override
	public int deleteTodo(Todo todo) {		
		return mapper.deleteTodo(todo);
	}
}
