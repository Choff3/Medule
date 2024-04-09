import express from "express";
import * as scheduleController from "../controllers/schedule.controller.js";

const router = express.Router();

router.post("/schedule", async (req, res) => {
    const result = await scheduleController.createSchedule(req);
    processResult(result, res);
});
router.get("/schedule", async (req, res) => {
    const schedules = await scheduleController.getAllSchedules();
    res.json(schedules);
});

router.get("/schedule/getSchedulesCount", async (req, res) => {
    const count = await scheduleController.getSchedulesCount();
    res.json(count);
});

router.get("/schedule/:id", async (req, res) => {
    const schedule = await scheduleController.getSchedule(req.params.id);
    res.json(schedule);
});

export default router;
