import { TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useTodoStore } from '@/store/todoStore';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { cn } from '@/lib/utils';

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
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-6 text-center">Todo List</Text>
      
      <View className="flex-row items-center space-x-2 mb-6">
        <TextInput
          className="flex-1 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 text-base"
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo..."
          placeholderTextColor="#666"
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity 
          className="w-12 h-12 bg-blue-500 rounded-lg items-center justify-center"
          onPress={handleAddTodo}
        >
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        {todos.map((todo) => (
          <View 
            key={todo.id} 
            className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 shadow-sm"
          >
            {editingId === todo.id ? (
              <View className="flex-row items-center space-x-2">
                <TextInput
                  className="flex-1 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg px-4"
                  value={editText}
                  onChangeText={setEditText}
                  onSubmitEditing={handleFinishEdit}
                  autoFocus
                />
                <TouchableOpacity 
                  className="p-2"
                  onPress={handleFinishEdit}
                >
                  <FontAwesome name="check" size={20} color={Colors.light.tint} />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="mr-3"
                  onPress={() => toggleTodo(todo.id)}
                >
                  <FontAwesome
                    name={todo.completed ? 'check-square-o' : 'square-o'}
                    size={24}
                    color={Colors.light.tint}
                  />
                </TouchableOpacity>
                <Text
                  className={cn(
                    "flex-1 text-base",
                    todo.completed && "line-through text-gray-400"
                  )}
                  numberOfLines={2}
                >
                  {todo.text}
                </Text>
                <View className="flex-row items-center space-x-2">
                  <TouchableOpacity
                    onPress={() => handleStartEdit(todo.id, todo.text)}
                    className="p-2"
                  >
                    <FontAwesome name="pencil" size={20} color={Colors.light.tint} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeTodo(todo.id)}
                    className="p-2"
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
