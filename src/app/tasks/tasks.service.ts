import { Injectable, signal } from '@angular/core';

import { type NewTaskData } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'Do groceries',
      summary:
        'Vegies are over. Need to get them from walmart.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Run',
      summary: 'Need to go for a run. Atleast 40 min.',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Check your tomorrow`s calender ',
      summary:
        'Plan your tomorrow in advance.',
      dueDate: '2024-06-15',
    },
    {
      id: 't4',
      userId: 'u1',
      title: 'Trip planning',
      summary:
        'Plan for your august trip.',
      dueDate: '2025-08-31',
    },
    {
      id: 't5',
      userId: 'u1',
      title: 'Car hunting',
      summary:
        'Look for car brokers.',
      dueDate: '2024-06-15',
    },
    {
      id: 't6',
      userId: 'u1',
      title: 'Book movie ticket',
      summary:
        'Book tickets for a movie night.',
      dueDate: '2024-06-15',
    }
  ]);

  allTasks = this.tasks.asReadonly();

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
