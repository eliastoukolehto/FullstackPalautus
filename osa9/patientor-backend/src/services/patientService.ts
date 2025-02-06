import patients from '../../data/patients';
import { NewPatient, Patient, PatientSafe } from '../types';
import { v1 as uuid } from 'uuid';


//const patients: Patient[] = patientsData;

const getPatientsSafe = (): PatientSafe[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    ...patient, id: id
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatientsSafe, addPatient};