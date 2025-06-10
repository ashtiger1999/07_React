package com.todo.demo.todo.model.dto;

import lombok.Data;

@Data
public class Todo {
	
	private int todoNo;
	private String title;
	private String content;
	private String isComplete;
	private String enrollDate;
	private String todoDelFl;

}
