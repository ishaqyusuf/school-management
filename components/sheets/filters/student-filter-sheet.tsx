"use client";

import { _createStudent, _updateStudent } from "@/app/_action/_student";
import { useParams } from "next/navigation";
import SelectInput from "../../shared/select-input";

import { useTranslation } from "@/app/i18n/client";
import FormInput from "../../shared/form-input";
import {
  _getStudentPaymentInformation,
  _makePayment,
  _setStudentTermPayable,
} from "@/app/_action/_payment";
import FilterSheet from "./filter-sheet";

export default function StudentFilterSheet({ lng, ClassRooms, query }) {
  const p = useParams();
  const { t } = useTranslation(lng);

  async function init(data) {}
  return (
    <FilterSheet
      lng={lng}
      query={query}
      modal="studentFilter"
      Content={({ form }) => (
        <>
          <SelectInput
            label={t("class")}
            rtl
            options={ClassRooms}
            itemValue={"id"}
            itemText={"title"}
            form={form}
            formKey={"_classId"}
          />
          <SelectInput
            label={t("payment")}
            rtl
            options={[
              t("paid"),
              t("part-paid"),
              t("full-or-part"),
              t("not-paid"),
            ]}
            form={form}
            formKey={"_payment"}
          />
        </>
      )}
    />
  );
}
