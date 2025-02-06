import { useState, useEffect } from "react"
import { DiaryEntry } from "./types";
import { getAllEntries } from "./services/diaryService";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])


 return(
  <div>
    <EntryForm entries={entries} setEntries={setEntries}/>
    <Entries entries={entries}/>
  </div>

 )

}

export default App
