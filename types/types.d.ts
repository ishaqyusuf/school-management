import {
  AcademicSessionSubjects,
  AcademicTerms,
  AcademicYears,
  ClassRoom,
  StudentTermSheets,
  Students,
  Subjects,
  WalletTransactions,
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
  student: Students;
  classRoom: ClassRoom;
}
export interface IStudent extends Omit<Students, "meta"> {
  termSheet: StudentTermSheets & {
    classRoom: ClassRoom;
  };
  amountOwed;
  meta: IStudentMeta;
}
export interface IStudentMeta {
  schoolFee: number;
}
export interface IStudentFormTerms {
  id;
  amount;
  updateWallet;
}
export interface IStudentTermSheet extends Omit<StudentTermSheets, "meta"> {
  meta: IStudentTermSheetMeta;
  transactions: WalletTransactions[];
  term: AcademicTerms & {
    academicYear: AcademicYears;
  };
}
export interface IStudentTermSheetMeta {
  payable: number;
}
export interface IOwingData {
  term;
  owing;
  termId;
  yearId;
  studentTermId;
}
export interface MakePaymentData extends IOwingData {
  payment: Partial<WalletTransactions>;
  // studentTermId;
  // payable;
}
export type IPaymentType = "school-fee" | "other-payment" | "entrance-fee";
export interface IWalletTransactions
  extends Omit<WalletTransactions, "transaction" | "type"> {
  transaction: "credit" | "debit";
  type: IPaymentType;
  academicTerm: AcademicTerms & {
    academicYear: AcademicYears;
  };
  studentTermSheet: StudentTermSheets & {
    student: Students;
  };
}
export interface ISessionSubjects
  extends Omit<AcademicSessionSubjects, "meta"> {
  subject: ISubject;
}
export interface ISubject extends Omit<Subjects, "meta"> {}
export interface IQuery {
  _classId?;
}
export interface IClassRoom extends ClassRoom {
  studentTermSheets: StudentTermSheets &
    {
      student: Omit<Students, "meta"> & {
        meta: IStudentMeta;
        amountOwed: number;
        studentTermSheets: StudentTermSheets[];
      };
    }[];
  sessionSubjects: ISessionSubjects[];
}
