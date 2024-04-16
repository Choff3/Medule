import express from "express";
import * as scheduleController from "../controllers/schedule.controller.js";
import {addMedication} from "../controllers/schedule.controller.js";

const router = express.Router();

router.post("/schedule/medication", async (req, res) => {
    const response = await scheduleController.addMedication(req);
    res.json(response);
});
router.get("/schedule", async (req, res) => {
    const schedules = await scheduleController.getAllSchedules();
    res.json(schedules);
});

router.get("/schedule/:id", async (req, res) => {
    const schedule = await scheduleController.getSchedule(req.params.id);
    res.json(schedule);
});

export default router;
