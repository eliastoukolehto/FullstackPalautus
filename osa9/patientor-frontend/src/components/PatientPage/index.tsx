import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from '../../types';
import Entries from "../Entries";
import EntryForm from "./EntryForm";
import { EntryFromValues } from "../../types";
import axios from "axios";


const PatientPage = () => {

  const { id } = useParams<{id?: string}>();
  const [patient, setPatient] = useState<null | Patient>(null);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id as string);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (!patient || !id) {
    return(null);
  }

  const handleCreateEntry = (data: EntryFromValues) => {
    patientService.createEntry(data, id).then(responseData => {
      setPatient(responseData);
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        setNotification(JSON.stringify(error.response?.data));
        setTimeout(() => {
          setNotification('');
        }, 5000);
    }});
  };

  return(
    <div>
      <h2>{patient.name} ( {patient.gender} ) </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {notification && 
      <p style={{ color: 'red' }}>{notification}</p>}
      <EntryForm createEntry={handleCreateEntry}/>
      <Entries entries={patient.entries}/>
    </div>
  );
};

export default PatientPage;