import { Diagnosis, Entry, HealthCheckRating } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[]
  healthCheckRating: HealthCheckRating
}

const HealthCheckEntry = ({ entry, diagnoses, healthCheckRating } : Props) => {


  return(
    <div>
      <div>{entry.date} ( {entry.type} )</div>
      <div>{entry.description}</div>
      <div>health rating: {healthCheckRating}</div>
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

export default HealthCheckEntry;