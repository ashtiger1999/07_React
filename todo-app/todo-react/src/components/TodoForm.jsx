function TodoForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
}) {
  return (
    <div>
      <input type="text" value={title} onChange={onTitleChange} />
      <input type="text" value={content} onChange={onContentChange} />
      <button onClick={onSubmit}>제출하기</button>
    </div>
  );
}
export default TodoForm;
