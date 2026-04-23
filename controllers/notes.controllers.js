import Note from "../models/notes.models.js";
import Joi from "joi";




const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

async function addNote(req, res) {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const note = new Note(req.body);
    await note.save();
    res.json(note);
}

async function getNotes(req, res) {
    const notes = await Note.find();
    res.json(notes);
}
export { addNote, getNotes }