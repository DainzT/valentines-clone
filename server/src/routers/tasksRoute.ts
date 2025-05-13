import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { calculateProgress } from "../utils/taskUtils";

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

router.delete("/tasks/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        await prisma.checklistItem.deleteMany({
            where: { taskId: id }
        });
        await prisma.task.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }

});

router.put("/tasks/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { items, ...updateData } = req.body
    try {
        const existingTask = await prisma.task.findUnique({
            where: { id },
            include: { items: true }
        });

        if (!existingTask) {
            res.status(404).json({ error: "Task not found" });
            return
        }

        if (items && existingTask.type === 'checklist') {
            await prisma.checklistItem.deleteMany({
                where: { taskId: id }
            });

            await prisma.checklistItem.createMany({
                data: items.map((item: any) => ({
                    text: item.text,
                    completed: item.completed || false,
                    taskId: id
                }))
            });
        }

        if (existingTask.type === 'checklist') {
            const currentItems = items || existingTask.items || [];
            updateData.progress = calculateProgress(currentItems);
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: updateData,
            include: {
                items: existingTask.type === 'checklist'
            }
        });

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Failed to update task" });
        return;
    }
});

export default router;