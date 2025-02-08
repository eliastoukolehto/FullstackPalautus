import patients from '../../data/patients';
import { NewEntry, NewPatient, Patient, PatientSafe } from '../types';
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
    ...patient, id: id, entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( entry: NewEntry, patient: Patient): Patient => {
  const id = uuid();
  const newEntry = {
    ...entry, id: id
  };
  patient.entries.push(newEntry);
  return patient;
};

const findById = ( id: string ): Patient | undefined => {
  const patient =  patients.find(p => p.id === id);
  if (!patient) {
    return undefined;
  } else {
    return patient;
  }
};

export default { getPatientsSafe, addPatient, findById, addEntry};