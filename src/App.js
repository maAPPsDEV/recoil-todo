import {atom, RecoilRoot, selector, useRecoilState, useRecoilValue} from "recoil";

// Atom
const textState = atom({
  key: 'textState', // unique ID
  default: '', // default value
});

// Selector
const charCountState = selector({
  key: 'charCountState', // unique ID
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

function App() {
  return (
    // Wrap
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  // Subscribe
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default App;
