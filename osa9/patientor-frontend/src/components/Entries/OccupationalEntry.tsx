import { Diagnosis, Entry, SickLeave } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[]
  employerName: string
  sickLeave: SickLeave | undefined
}

const OccupationalEntry = ({ entry, diagnoses, employerName, sickLeave } : Props) => {


  return(
    <div>
      <div>{entry.date} ( {entry.type} ) <i>{employerName}</i></div>
      <div>{entry.description}</div>
      {sickLeave &&
      <div>sick leave from {sickLeave.startDate} to {sickLeave.endDate}</div>}
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

export default OccupationalEntry;