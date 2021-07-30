import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function hasEqualTask(newTask: string) {
    return tasks.some((task) => task.title === newTask);
  }

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      edit: false,
      done: false,
    };

    if (hasEqualTask(newTaskTitle)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar task com o mesmo nome',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      return;
    }

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        } else return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover Task', 'Deseja realmente remover Task?', [
      {
        text: 'Confirmar',
        onPress: () => {
          setTasks((olsState) => olsState.filter((task) => task.id !== id));
        },
      },
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancelar'),
        style: 'cancel',
      },
    ]);
  }

  function handleEditTask(id: number) {
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === id) {
          return { ...task, edit: !task.edit };
        } else return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        setTasks={setTasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
