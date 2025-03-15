import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express"; 

const router: Router = Router(); 
const prisma = new PrismaClient();

router.post("/add", async (req: Request, res: Response) => {
    console.log("Received request body:", req.body); 
    try {
        const { firstName, lastName, groupName, role, expectedSalary, expectedDateOfDefense } = req.body;
        console.log(req.body)

        if (!firstName || !lastName || !groupName || !role || !expectedSalary || !expectedDateOfDefense) {
            res.status(400).json({ error: "All fields are required" })
            return;
        }

        const newEmployee = await prisma.employee.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                groupName: groupName,
                role: role,
                expectedSalary: Number(expectedSalary), 
                expectedDateOfDefense: new Date(expectedDateOfDefense),
            },
        });

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/retrieve", async (req: Request, res: Response) => {
    try {
        const employees = await prisma.employee.findMany();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;



