import {findAllNotes, insertNote} from "@/dao/noteBoardDao";

export const getAllNotes = async () => {
    return await findAllNotes();
}

export const addNote = async (noteObject: any) => {
    return await insertNote(noteObject);
}
