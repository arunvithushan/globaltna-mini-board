const express = require("express");
const router = express.Router();
const Job = require("../models/JobRequest");

router.get("/", async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const jobs = await Job.find(filter);
  res.json(jobs);
});

router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
});

router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { status } = req.body;

  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(job);
});

router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

module.exports = router;