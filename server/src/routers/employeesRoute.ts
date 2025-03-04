import { Router, Request, Response } from "express"; 

const router: Router = Router(); 

const EmployeeData  =  [{
        name: "Dainz",
        salary: 40000,
    },
    {
        name: "Floyd Torechilla",
        salary: 60000,
    },
    {
        name: "Michael Flores",
        salary: 50000,
    },
    {
        name: "Kaizen Cenat",
        salary: 100000
    },
    {
        name: "Skibidi Sigma",
        salary: 1000
    }
]
router.get("/employees", async (req: Request, res: Response): Promise<void> => {
    try {

        res.status(200).json({ success: true, data: EmployeeData });
        return; 
        
    } catch (error: any) {
        console.error("Error retrieving survey:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router