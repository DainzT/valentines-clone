import { Router, Request, Response } from "express"; 
import { PrismaClient } from "@prisma/client";

const router: Router = Router(); 
const prisma = new PrismaClient();

router.post("/send", async (req: Request, res: Response): Promise<void> => {
    try {
        const { answers } = req.body; 

        if (!Array.isArray(answers)) {
            res.status(400).json({ success: false, message: "Invalid data format" });
            return;
        }

        const existingResponse = await prisma.surveyResponse.findFirst();

        let surveyResponse;

        if (existingResponse) {
         
            surveyResponse = await prisma.surveyResponse.update({
                where: { id: existingResponse.id },
                data: { answer: answers },
            });
            console.log("Survey updated:", surveyResponse);
        } else {
     
            surveyResponse = await prisma.surveyResponse.create({
                data: {
                    answer: answers,
                },
            });
            console.log("Survey saved:", surveyResponse);
        }

        res.status(201).json({ success: true, data: surveyResponse });
    } catch (error) {
        console.error("Error saving survey:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/retrieve", async (req: Request, res: Response): Promise<void> => {
    try {
        const surveyResponse = await prisma.surveyResponse.findFirst();

        if (!surveyResponse) {
            res.status(404).json({ success: false, message: "No survey response found" });
            return; 
        }

        res.status(200).json({ success: true, data: surveyResponse });
        return; 
        
    } catch (error: any) {
        console.error("Error retrieving survey:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/message", async (req: Request, res: Response) => {
    try {
        res.status(200).json({Woah: "Hi"})
    } catch (error: any) {
        res.status(500).json({error: error.message || "Internal server error"})
    }
})

router.put

export default router;
