import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useTodoStore } from '@/store/todoStore';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function Home() {
  const { todos, addTodo, toggleTodo, removeTodo, editTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleStartEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleFinishEdit = () => {
    if (editingId && editText.trim()) {
      editTodo(editingId, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo..."
          placeholderTextColor="#666"
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.todoList}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            {editingId === todo.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                  onSubmitEditing={handleFinishEdit}
                  autoFocus
                />
                <TouchableOpacity onPress={handleFinishEdit}>
                  <FontAwesome name="check" size={20} color={Colors.light.tint} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.todoContent}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleTodo(todo.id)}
                >
                  <FontAwesome
                    name={todo.completed ? 'check-square-o' : 'square-o'}
                    size={24}
                    color={Colors.light.tint}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.todoText,
                    todo.completed && styles.completedTodoText,
                  ]}
                  numberOfLines={2}
                >
                  {todo.text}
                </Text>
                <View style={styles.todoActions}>
                  <TouchableOpacity
                    onPress={() => handleStartEdit(todo.id, todo.text)}
                    style={styles.actionButton}
                  >
                    <FontAwesome name="pencil" size={20} color={Colors.light.tint} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeTodo(todo.id)}
                    style={styles.actionButton}
                  >
                    <FontAwesome name="trash-o" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 46,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  todoActions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
});
