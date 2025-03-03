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
    <div className="tfo">
      <div className="tf">
        <button 
          className="cb" 
          title="Lihtsalt vajuta" 
          onClick={onClose} 
        >
          X
        </button>
        <h2>Lisa probleem</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Probleem nimetus:
            <input type="text" name="name" value={task.name} onChange={handleChange} required />
          </label>
          <label>
            Algus:
            <input 
              type="date"
              id="start"
              name="start" 
              value={task.start}
              onChange={handleChange}
              required 
            />
          </label>
          <label>
            Lõpp:
            <input 
              type="date"
              id="end"
              name="end" 
              value={task.end}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ülesande sisu:
            <textarea name="comments" value={task.comments} onChange={handleChange} />
          </label>
          <label>
            Toimkond:
            <input type="text" name="assignedTo" value={task.assignedTo} onChange={handleChange} />
          </label>
          <button type="submit">Lisa probleem</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 