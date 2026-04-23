import { Router } from "express";
import { addNote, getNotes } from "../controllers/notes.controllers.js";
import auth from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/notes", auth, addNote);
router.get("/notes", auth, getNotes);

export default router;