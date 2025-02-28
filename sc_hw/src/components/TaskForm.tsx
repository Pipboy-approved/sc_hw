import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onClose: () => void;
}

interface Task {
  name: string;
  start: string;
  end: string;
  comments: string;
  assignedTo: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose }) => {
  const [task, setTask] = useState<Task>({
    name: '',
    start: '',
    end: '',
    comments: '',
    assignedTo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    onClose();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input type="text" name="name" value={task.name} onChange={handleChange} required />
          </label>
          <label>
            Start:
            <input type="date" name="start" value={task.start} onChange={handleChange} required />
          </label>
          <label>
            End:
            <input type="date" name="end" value={task.end} onChange={handleChange} required />
          </label>
          <label>
            Comments:
            <textarea name="comments" value={task.comments} onChange={handleChange} />
          </label>
          <label>
            Assigned To:
            <input type="text" name="assignedTo" value={task.assignedTo} onChange={handleChange} />
          </label>
          <button type="submit">Lisa ülesanne</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 