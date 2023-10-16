// import { ISalesOrder, ISalesOrderItem } from "@/types/ISales";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from ".";
import { formatDate } from "@/lib/use-day";
import { deepCopy } from "@/lib/deep-copy";

export interface ISlicer {
  params: {
    sessionSlug;
    termSlug;
  };
  modal: {
    name: ModalName;
    data: any;
  };
  dataPage: {
    id;
    data;
  };
}

export type ModalName =
  | "studentForm"
  | "studentOptions"
  | "applyPayment"
  | "setClass"
  | "updateStudentPayable"
  | undefined;
const initialState: ISlicer = ({
  modal: {
    name: undefined,
    data: null,
    staticList: {},
  },
} as Partial<ISlicer>) as any;
const headerNavSlice = createSlice({
  name: "slicers",
  initialState,
  reducers: {
    updateSlice(state, action: PayloadAction<{ key: keyof ISlicer; data }>) {
      const { key, data } = action.payload;
      // Object.entries(data).map(([k, v]) => {
      //         //   if (v instanceof Date) data[k] = formatDate(v);
      //   if (typeof v == "object") data[k] = transformObject(v);
      // });
      const d = transformObject(data);
      state[key] = d;
    },
    hello(state, action) {
      console.log(">>>>>>");
    },
  },
});
function transformObject(data) {
  if (!data) return;

  try {
    if (data)
      Object.entries(data).map(([k, v]) => {
        if (v instanceof Date) data[k] = formatDate(v);
        else if (typeof v == "object" && v != null) {
          data[k] = transformObject(v);
        }
      });
  } catch (error) {}
  return data;
}
export default headerNavSlice.reducer;
export const { updateSlice, hello: helloSlice } = headerNavSlice.actions;
export function dispatchSlice(key: keyof ISlicer, data: any = null) {
  // if (data) data = deepCopy(data);
  store.dispatch(
    updateSlice({
      key,
      data: deepCopy(data),
    })
  );
}

export async function loadStaticList(key: keyof ISlicer, list, _loader) {
  if (!list) {
    const data = await _loader();

    dispatchSlice(key, deepCopy(data));
  }
}
