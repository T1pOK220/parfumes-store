import {
  createParfume,
  deleteParfume,
  getAllParfumes,
  updateParfume,
} from "../../service/parfumeService.js";

export const getAllParfumesController = async (req, res) => {
  const parfumes = await getAllParfumes();
  res.status(200).json(parfumes);
};

export const createParfumeController = async (req, res) => {
  const parfume = await createParfume(req.body, key);
  res.status(201).json(parfume);
};

export const updateParfumeController = async (req, res) => {
  const parfume = await updateParfume(req.params.id, req.body);
  res.status(200).json(parfume);
};

export const deleteParfumeController = async (req, res) => {
  const parfume = await deleteParfume(req.params.id);
  res.status(200).json(parfume);
};
