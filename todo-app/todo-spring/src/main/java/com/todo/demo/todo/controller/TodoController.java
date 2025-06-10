package com.todo.demo.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.demo.todo.model.dto.Todo;
import com.todo.demo.todo.model.service.TodoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("todo")
@RequiredArgsConstructor
@Slf4j
public class TodoController {

	// field
	private final TodoService service;

	// select todo
	@GetMapping("getTodoList")
	public ResponseEntity<Object> getTodoList() {
		try {
			List<Todo> todoList = service.getTodoList();

			return ResponseEntity.status(HttpStatus.OK).body(todoList);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	// insert todo
	@PostMapping("insertTodo")
	public ResponseEntity<Object> insertTodo(@RequestBody Todo todo) {
		try {
			int result = service.insertTodo(todo);

			if (result > 0) {
				return ResponseEntity.status(HttpStatus.CREATED).body("insert todo complete");
			}

			return ResponseEntity.status(HttpStatus.CONFLICT).body("insert todo failed");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	// update isComplete
	@PutMapping("changeIsComplete")
	public ResponseEntity<Object> changeIsComplete(@RequestBody Todo todo) {
		int result = 0;
		try {
			result = service.changeIsComplete(todo);
			
			if(result>0) return ResponseEntity.status(HttpStatus.OK).body("change isComplete complete");
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("conflict happen while change isComplete");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	// update todo_del_fl
	@PutMapping("deleteTodo")
	public ResponseEntity<Object> deleteTodo(@RequestBody Todo todo) {
		int result = 0;
		try {
			result = service.deleteTodo(todo);
			
			if(result>0) return ResponseEntity.status(HttpStatus.OK).body("delete complete");
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("delete failed");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
