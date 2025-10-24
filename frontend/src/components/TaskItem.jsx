function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

export default TaskItem;
