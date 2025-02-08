import React, { useEffect, useState } from "react";
import { Diagnosis, EntryFromValues, HealthCheckRating } from "../../types";
import diagnosisService from "../../services/diagnoses";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

interface Props {
  createEntry: (data: EntryFromValues) => void
}

const EntryForm = ({ createEntry }: Props) => {

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  
    useEffect(() => {
      const fetchDiagnoses = async () => {
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      };
      void fetchDiagnoses();
  }, []);

  const [view, setView] = useState<string>('');
  const [type, setType] = useState<"Hospital" | "OccupationalHealthcare" | "HealthCheck" >('HealthCheck');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCreiteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployername] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');

  const handleCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {target: { value } } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({ 
      type, description, date, specialist, diagnosisCodes,
      healthCheckRating,
      discharge: {date: dischargeDate, criteria: dischargeCreiteria},
      employerName, sickLeave: {endDate: sickLeaveEndDate, startDate: sickLeaveStartDate}
     });
  };


  return (
    <div>
      {!view &&
        <div>
          <button onClick={() => {setView('HealthCheck'); setType('HealthCheck');}}>New Health Check Entry</button>
          <button onClick={() => {setView('Hospital'); setType('Hospital');}}>New Hospital Entry</button>
          <button onClick={() => {setView('OccupationalHealthcare'); setType('OccupationalHealthcare');}}>New Occupational Healthcare Entry</button>
        </div>}
      {view &&
        <form onSubmit={handleSubmit}>
          <div>
            description <input value={description} onChange={(event) => setDescription(event.target.value)}/>
          </div>
          <div>
            date <input  type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          <div>
            specialist <input value={specialist} onChange={(event) => setSpecialist(event.target.value)}/>
          </div>
          <div> 
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="diagnosisCodesLabel">diagnosisCodes</InputLabel>
              <Select 
                multiple 
                labelId="diagnosisCodesLabel" 
                value={diagnosisCodes} 
                onChange={handleCodesChange} 
                input={<OutlinedInput label="diagnosisCodesLabel" />}
              >
                {diagnoses.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    {d.code}
                  </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          {view === 'HealthCheck' &&
            <div>
              health check rating
              <div>
              Healthy <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating(0)} />
              Low risk <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating(1)} />
              High risk <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating(2)} />
              Critical risk <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating(3)} />
              </div>
            </div>
          }
          {view === 'Hospital' &&
          <div>
            <div>
              discharge date <input  type="date" value={dischargeDate} onChange={(event) => setDischargeDate(event.target.value)} />
            </div>
            <div>
              discharge criteria <input value={dischargeCreiteria} onChange={(event) => setDischargeCriteria(event.target.value)}/>
            </div>
          </div>
          }
          {view === 'OccupationalHealthcare' &&
          <div>
            <div>
            employer name <input value={employerName} onChange={(event) => setEmployername(event.target.value)}/>
            </div>
            <div>
            sickleave start <input  type="date" value={sickLeaveStartDate} onChange={(event) => setSickLeaveStartDate(event.target.value)} />
            sickleave end <input  type="date" value={sickLeaveEndDate} onChange={(event) => setSickLeaveEndDate(event.target.value)} />
            </div>
          </div>
          }
          <button type="submit">add</button>
          <button onClick={() => setView('')}>cancel</button>
        </form>
      }
    </div>
  );
};

export default EntryForm;