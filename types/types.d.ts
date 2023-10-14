import {
  AcademicTerms,
  AcademicYears,
  ClassRoom,
  StudentPayments,
  StudentTermSheets,
  Students,
} from "@prisma/client";

export interface StudentForm {
  name?;
  parentName?;
  phoneNo?;
  termId?;
  id?;
  classId?;
  sex;
  termSheetId?;
  meta: {
    schoolFee?;
  };
}
export interface PaymentForm {}
export interface IStudentTermSheet extends StudentTermSheets {
  Student: Students;
  ClassRoom: ClassRoom;
}
export interface IStudent extends Students {
  termSheet: StudentTermSheets & {
    ClassRoom: ClassRoom;
  };
  amountOwed;
}
export interface IStudentTermSheet extends Omit<StudentTermSheets, "meta"> {
  meta: {
    payable: number;
  };
  Fees: StudentPayments[];
  Term: AcademicTerms & {
    AcademicYear: AcademicYears;
  };
}
