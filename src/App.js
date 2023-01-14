import logo from './logo.svg';
import './App.css';
import { Suspense, useState, useDeferredValue, useMemo, useEffect } from 'react';
import List from './List';
// import SearchResults from './SearchResults.js';
// const numbers = [...new Array(10).keys()];
function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResult] = useState("");
  const deferredQuery = useDeferredValue(searchText);
  // eslint-disable-next-line
  const list = useMemo(() => {
    const filteredPersons = results && results.filter(item => {
      return (
        item.name.toLowerCase().includes(searchText.toLowerCase()) 
      );
    });
    return filteredPersons;
    // eslint-disable-next-line
  }, [deferredQuery]);

  const loadData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((err) => console.log(err));
  };
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    loadData();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        useDeferredValue <code>React.js</code> and hook.
        </p>
        <form>
          <label>
            Search Name:
            <input type={'text'} value={searchText} onChange={e => setSearchText(e.target.value)} />
          </label>
          <Suspense fallback={<h2>Loading...</h2>}>
            <List items={list} searchText={deferredQuery} />
          </Suspense>
        </form>
      </header>
    </div>
  );
}

export default App;
