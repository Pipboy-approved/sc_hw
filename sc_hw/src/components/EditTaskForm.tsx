import React, { useState } from 'react';

interface EditTaskFormProps {
  task: Task;
  onSubmit: (updatedTask: Task) => void;
  onClose: () => void;
}

interface Task {
  name: string;
  start: string;
  end: string;
  comments: string;
  assignedTo: string;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSubmit, onClose }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(updatedTask);
    onClose();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input type="text" name="name" value={updatedTask.name} onChange={handleChange} required />
          </label>
          <label>
            Start:
            <input type="date" name="start" value={updatedTask.start} onChange={handleChange} required />
          </label>
          <label>
            End:
            <input type="date" name="end" value={updatedTask.end} onChange={handleChange} required />
          </label>
          <label>
            Comments:
            <textarea name="comments" value={updatedTask.comments} onChange={handleChange} />
          </label>
          <label>
            Assigned To:
            <input type="text" name="assignedTo" value={updatedTask.assignedTo} onChange={handleChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm; 