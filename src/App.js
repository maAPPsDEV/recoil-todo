import {atom, RecoilRoot, selector, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useState} from 'react';

// @RECOIL: Atom
const todoListState = atom({
  key: 'todoListState',
  default: [],
});


// @RECOIL: Selector

function App() {
  return (
    // @RECOIL: Wrap
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

// utility for array
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0,index), ...arr.slice(index + 1)];
}

function TodoList() {
  // @RECOIL: subscriber
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  // @RECOIL: updater
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

function TodoItem({item}) {
  // @RECOIL: subscribe
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <input type="text" value={item.text} onChange={editItemText} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

export default App;
