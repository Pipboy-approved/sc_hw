import React, { useState } from 'react';
import './solution.css';
import Header from './components/Header';
import MonthWeekTable from './components/MonthWeekTable';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm';

const Sitavikat: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState(Math.floor((new Date().getMonth() + 3) / 3));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  interface Task {
    name: string;
    start: string;
    end: string;
    comments: string;
    assignedTo: string;
  }

  const months = ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Destember'];

  const getQuarterMonths = (q: number) => {
    const startMonth = (q - 1) * 3;
    return months.slice(startMonth, startMonth + 3);
  };

  const getWeeksForQuarter = (q: number, y: number) => {
    const startMonth = (q - 1) * 3;
    const weeks: number[][] = [[], [], []];

    for (let monthIndex = 0; monthIndex < 3; monthIndex++) {
      const month = startMonth + monthIndex;
      const firstDayOfMonth = new Date(y, month, 1);
      const lastDayOfMonth = new Date(y, month + 1, 0);

      let currentDay = firstDayOfMonth;
      while (currentDay <= lastDayOfMonth) {
        const weekNumber = getWeekNumber(currentDay);
        if (!weeks[monthIndex].includes(weekNumber)) {
          weeks[monthIndex].push(weekNumber);
        }
        currentDay.setDate(currentDay.getDate() + 1);
      }
    }

    return weeks;
  };

  const getWeekNumber = (date: Date) => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  };

  const handleNextQuarter = () => {
    if (quarter === 4) {
      setQuarter(1);
      setYear(year + 1);
    } else {
      setQuarter(quarter + 1);
    }
  };

  const handlePrevQuarter = () => {
    if (quarter === 1) {
      setQuarter(4);
      setYear(year - 1);
    } else {
      setQuarter(quarter - 1);
    }
  };

  const addTask = (task: Task) => {
    if (tasks.length < 10) {
      setTasks([...tasks, task]);
    } else {
      alert('Kümme taski kuus! On selge!');
    }
  };

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => (t.name === updatedTask.name ? updatedTask : t)));
    setEditingTask(null);
  };

  return (
    <div className="App">
      <img src={`${process.env.PUBLIC_URL}/pip512.png`} alt="Logo" className="app-logo" />
      <Header year={year} quarter={quarter} onNext={handleNextQuarter} onPrev={handlePrevQuarter} />
      <MonthWeekTable months={getQuarterMonths(quarter)} weeks={getWeeksForQuarter(quarter, year)} tasks={tasks} handleTaskClick={handleTaskClick} />
      <button onClick={handleAddTask}>Add Task</button>
      {showForm && <TaskForm onSubmit={addTask} onClose={handleCloseForm} />}
      {editingTask && <EditTaskForm task={editingTask} onSubmit={handleEditTask} onClose={() => setEditingTask(null)} />}
    </div>
  );
};

export default Sitavikat;
