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
    <div className="tfo">
      <div className="tf">
        <button className="cb" title="Lihtsalt vajuta" onClick={onClose}>X</button>
        <h2>Muuda probleemi</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Ülesanne:
            <input type="text" name="name" value={updatedTask.name} onChange={handleChange} required />
          </label>
          <label>
            Algus:
            <input 
              type="date"
              id="algus" 
              name="start" 
              placeholder="päev/kuu/aasta"
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Tähtaeg:
            <input 
              type="date"
              id="tähtaeg"
              name="end" 
              placeholder="päev/kuu/aasta"
              onChange={handleChange}
              required 
            />
          </label>
          <label>
            Kirjeldus:
            <textarea name="Kommentaarid" value={updatedTask.comments} onChange={handleChange} />
          </label>
          <label>
            Toimkond:
            <input type="text" name="Toimkond" value={updatedTask.assignedTo} onChange={handleChange} />
          </label>
          <button type="submit" className="salvesta">Salvesta probleem</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm; 