import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png';

export interface Task {
  id: number;
  title: string;
  edit: boolean;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  editTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TasksList({
  tasks,
  setTasks,
  editTask,
  toggleTaskDone,
  removeTask,
}: TasksListProps) {
  const [selectedTaskId, setSelectedtaskId] = useState<Number | null>(null);
  const [editedTask, setEditedTask] = useState('');
  const inputRef = useRef<TextInput>(null);

  function startEdittingTask({ id, title }: Task) {
    editTask(id);
    setSelectedtaskId(id);
    setEditedTask(title);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }

  function doneEdittingTask() {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTaskId) {
        return {
          ...task,
          title: editedTask,
          edit: false,
        };
      } else return task;
    });

    setTasks(updatedTasks);
  }

  function cancelEdditingTask(id: number) {
    editTask(id);
    setSelectedtaskId(null);
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            {!item.edit ? (
              <>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                  >
                    <View
                      testID={`marker-${index}`}
                      style={
                        item.done ? styles.taskMarkerDone : styles.taskMarker
                      }
                    >
                      {item.done && (
                        <Icon name="check" size={12} color="#FFF" />
                      )}
                    </View>

                    <Text
                      style={item.done ? styles.taskTextDone : styles.taskText}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  testID={`edit-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => startEdittingTask(item)}
                >
                  <Icon name="edit-3" size={20} color="#B8B8B8" />
                </TouchableOpacity>

                <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingRight: 24 }}
                  onPress={() => removeTask(item.id)}
                >
                  <Image source={trashIcon} />
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={inputRef}
                  value={editedTask}
                  style={styles.input}
                  onChangeText={setEditedTask}
                  returnKeyType="done"
                  onSubmitEditing={() => doneEdittingTask()}
                />
                <TouchableOpacity
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => cancelEdditingTask(item.id)}
                >
                  <Icon name="x" size={22} color="#B8B8B8" />
                </TouchableOpacity>
              </View>
            )}
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 24,
    height: 51,
    width: '70%',
    color: '#666',
  },
});
