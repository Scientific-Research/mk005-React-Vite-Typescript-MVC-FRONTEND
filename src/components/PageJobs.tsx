import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Jobs from '../data/jobs.json'; getting the data from Backend using axios

interface IJobs {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  todo: string;
}

const jobs_defaultValues = {
  id: null,
  title: 'NONE',
  company: 'NONE',
  url: 'NONE',
  description: 'NONE',
  skillList: 'NONE',
  todo: 'NONE',
};

// const url = 'http://localhost:8000/jobs';
const url = 'http://localhost:8000';

export const PageJobs = () => {
  const [jobs, setJobs] = useState<IJobs[]>([]); // without default value
  // const [jobs, setJobs] = useState([jobs_defaultValues]); // or with default value

  useEffect(() => {
    (async () => {
      // const jobs_API = (await axios.get('http://localhost:8000/jobs')).data; OR with url
      const jobs_API = (await axios.get(`${url}/jobs`)).data;
      console.log(jobs_API);
      const _jobs = [...jobs_API];
      setJobs(_jobs);
    })();
  }, []);

  return (
    <div className="pageJobs">
      <h2>There are {jobs.length} jobs:</h2>
      <div className="jobs">
        {jobs.map((job) => (
          <div className="job" key={job.id}>
            <>
              <a href={job.url} target="_blank">
                <h2>{job.title}</h2>
              </a>
              <h4>{job.company}</h4>
              <p className="description">{job.description}</p>
              <p className="skillList">{job.skillList}</p>
              <p className="todo">{job.todo}</p>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};
