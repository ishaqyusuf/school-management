import { ClassRoom, StudentTermSheets, Students } from "@prisma/client";

export interface StudentForm {
  name?;
  parentName?;
  phoneNo?;
  termId?;
  id?;
  classId?;
  sex;
  termSheetId?;
}
export interface IStudentTermSheet extends StudentTermSheets {
  Student: Students;
  ClassRoom: ClassRoom;
}
export interface IStudent extends Students {
  termSheet: StudentTermSheets & {
    ClassRoom: ClassRoom;
  };
}
