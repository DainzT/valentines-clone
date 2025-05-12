import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { title } from "process";

const router: Router = Router();
const prisma = new PrismaClient();

router.get("/tasks", async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                items: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

router.post("/tasks", async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, type, dueDate, reminder, items } = req.body;

        if (dueDate && isNaN(new Date(dueDate).getTime())) {
            res.status(400).json({ error: "Invalid dueDate format" });
            return;
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                type,
                dueDate: type === 'timed' && dueDate ? new Date(dueDate) : undefined,
                reminder: type === 'timed' && reminder ? new Date(reminder) : undefined,
                items: type === 'checklist' ? {
                    create: items?.map((item: any) => ({
                        text: item.text,
                        completed: item.completed || false,
                    }))
                } : undefined,
            },
            include: {
                items: type === 'checklist',
            },
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Failed to create task" });
    }
});

router.delete("/tasks", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.task.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }

});

router.put("/tasks", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedTask = await prisma.task.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
    }
});

export default router;