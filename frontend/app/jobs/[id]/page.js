"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JobDetails() {
  const [job, setJob] = useState(null);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/jobs/${params.id}`
    );

    setJob(res.data);
  };

  const updateStatus = async (status) => {
    await axios.patch(
      `http://localhost:5000/api/jobs/${params.id}`,
      { status }
    );

    fetchJob();
  };

  const deleteJob = async () => {
    await axios.delete(
      `http://localhost:5000/api/jobs/${params.id}`
    );

    router.push("/");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job.title}</h1>

      <p>{job.description}</p>
      <p>{job.category}</p>
      <p>{job.location}</p>
      <p>{job.status}</p>

      <select
        onChange={(e) =>
          updateStatus(e.target.value)
        }
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>

      <br /><br />

      <button onClick={deleteJob}>
        Delete
      </button>
    </div>
  );
}