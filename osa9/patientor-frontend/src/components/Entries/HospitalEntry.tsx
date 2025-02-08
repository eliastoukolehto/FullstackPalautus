import { Diagnosis, Discharge, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[]
  discharge: Discharge
}

const HospitalEntry = ({ entry, diagnoses, discharge } : Props) => {


  return(
    <div>
      <div>{entry.date} ( {entry.type} )</div>
      <div>{entry.description}</div>
      <div>discarge {discharge.date} on criteria {discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
      <ul>
        {entry.diagnosisCodes?.map(c => {
          const diagnosis = diagnoses.find(d => d.code === c);
          return (
            <li key={c}>{c} 
            {diagnosis && <span> {diagnosis.name}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HospitalEntry;