import multer from "multer";

const uploader = multer();

const excelFileName = "excelFile";

export const ExcelFileUpload = () => {
  return uploader.single(excelFileName);
};
