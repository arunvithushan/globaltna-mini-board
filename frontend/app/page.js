"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [category]);

  const fetchJobs = async () => {
    const url = category
      ? `http://localhost:5000/api/jobs?category=${category}`
      : `http://localhost:5000/api/jobs`;

    const res = await axios.get(url);
    setJobs(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Service Request Board</h1>

      <Link href="/new-job">Create New Job</Link>

      <br /><br />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
      </select>

      <div>
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px"
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.category}</p>
            <p>{job.status}</p>

            <Link href={`/jobs/${job._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}