"use client";

import { useState } from "react";
import axios from "axios";

export default function NewJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/jobs",
      form
    );

    alert("Job Created");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
        />

        <br /><br />

        <input
          placeholder="Category"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}