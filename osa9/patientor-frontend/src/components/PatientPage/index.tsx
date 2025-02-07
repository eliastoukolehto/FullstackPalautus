import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from '../../types';


const PatientPage = () => {

  const { id } = useParams<{id?: string}>();
  const [patient, setPatient] = useState<null | Patient>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id as string);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return(null);
  }

  return(
    <div>
      <h2>{patient.name}</h2> <span>{patient.gender}</span>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;