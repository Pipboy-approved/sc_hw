import React from 'react';

interface Task {
  name: string;
  start: string;
  end: string;
  comments: string;
  assignedTo: string;
}

const MonthWeekTable: React.FC<{ months: string[]; weeks: number[][]; tasks: Task[]; htc: (task: Task) => void; }> = ({ months, weeks, tasks, htc }) => {
  const calculateBarWidth = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return `${duration * 10}px`; // Näidis: 10px päevas
  };

  const calculateBarPosition = (start: string, firstDayOfQuarter: Date) => {
    const startDate = new Date(start);
    const daysFromFirstDay = (startDate.getTime() - firstDayOfQuarter.getTime()) / (1000 * 3600 * 24);
    return `${daysFromFirstDay * 10}px`; // Näidis: 10px päevas
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

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const firstDayOfQuarter = new Date(new Date().getFullYear(), (weeks[0][0] - 1) * 3, 1); // Calculate the first day of the quarter

  return (
    <div>
      <table className="KvartaliTabel">
        <thead>
          <tr>
            {months.map((month, index) => (
              <th key={index} colSpan={weeks[index].length}>{month}</th>
            ))}
          </tr>
          <tr>
            {weeks.flat().map((week, index) => (
              <td key={index}>{week}</td>
            ))}
          </tr>
        </thead>
      </table>
      <div className="tc">
        {tasks.map((task, index) => {
          return (
            <div
              key={index}
              className={`tb`}
              style={{
                width: calculateBarWidth(task.start, task.end),
                left: calculateBarPosition(task.start, firstDayOfQuarter),
              }}
              onClick={() => htc(task)}
            >
              {task.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthWeekTable; 