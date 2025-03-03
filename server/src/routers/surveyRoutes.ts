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

export default router;
