import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../types";
import diagnosisService from "../../services/diagnoses" ;
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";

interface Props {
  entries: Entry[]
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Entries = ({ entries }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);



  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} diagnoses={diagnoses} healthCheckRating={entry.healthCheckRating}/>;
      case "Hospital": 
        return <HospitalEntry entry={entry} diagnoses={diagnoses} discharge={entry.discharge}/>;
      case "OccupationalHealthcare":
        return <OccupationalEntry entry={entry} diagnoses={diagnoses} employerName={entry.employerName} sickLeave={entry.sickLeave}/>;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h2>entries</h2>
      {entries.map(e => {
      return <EntryDetails entry={e} key={e.id}/>;
      })}
    </div>
  );
};

export default Entries;

