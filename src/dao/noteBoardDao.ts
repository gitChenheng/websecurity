import NoteBoard from "@/models/entity/NoteBoard";
import BaseEntity from "@/models/common/BaseEntity";

export const findOneNote = async (id) => {
    return await NoteBoard.getById(id);
}

export const findAllNotes = async () => {
    return await NoteBoard.getList();
}

export const updateNote = async <T extends BaseEntity>(item: T, id) => {
    return await NoteBoard.updateItemById(item, id)
}

export const insertNote = async <T extends BaseEntity>(item: T) => {
    return await NoteBoard.createItem(item);
}

export const deleteNote = async (id) => {
    return await NoteBoard.deleteById(id)
}
