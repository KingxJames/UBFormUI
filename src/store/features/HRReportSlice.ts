import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the path according to your project structure

interface IFacultyCount {
  EducationAndArts: number;
  ManagementAndSocialSciences: number;
  HealthSciences: number;
  ScienceAndTechnology: number;
  Total: number;
}

interface INumberOfStaff {
  FulltimeFaculty: IFacultyCount;
  AdjunctFaculty: IFacultyCount;
  NonTeachingStaff: IFacultyCount;
}

export interface IHRReportState {
  id: string;
  userID: string;
  academicYearID: string;
  department: string;
  deadline: string;
  numberOfStaff: INumberOfStaff;
  dateSubmitted: string | null;
  formSubmitted: boolean;
}

// Initial State
const HRReportInitialState: IHRReportState = {
  id: "",
  userID: "",
  academicYearID: "",
  department: "",
  deadline: "",

  numberOfStaff: {
    FulltimeFaculty: {
      EducationAndArts: 0,
      ManagementAndSocialSciences: 0,
      HealthSciences: 0,
      ScienceAndTechnology: 0,
      Total: 0,
    },
    AdjunctFaculty: {
      EducationAndArts: 0,
      ManagementAndSocialSciences: 0,
      HealthSciences: 0,
      ScienceAndTechnology: 0,
      Total: 0,
    },
    NonTeachingStaff: {
      EducationAndArts: 0,
      ManagementAndSocialSciences: 0,
      HealthSciences: 0,
      ScienceAndTechnology: 0,
      Total: 0,
    },
  },
  dateSubmitted: null,
  formSubmitted: false,
};

const hrReportSlice = createSlice({
  name: "hrReport",
  initialState: HRReportInitialState,
  reducers: {
    setHRReportState: (state, action: PayloadAction<IHRReportState>) => {
      return { ...state, ...action.payload };
    },
    setUserID: (state, action: PayloadAction<string>) => {
      return { ...state, userID: action.payload };
    },
    setAcademicYearID: (state, action: PayloadAction<string>) => {
      return { ...state, academicYearID: action.payload };
    },
    setDepartment: (state, action: PayloadAction<string>) => {
      return { ...state, department: action.payload };
    },
    setDeadline: (state, action: PayloadAction<string>) => {
      return { ...state, deadline: action.payload };
    },
    setNumberOfStaff: (state, action: PayloadAction<INumberOfStaff>) => {
      return { ...state, numberOfStaff: { ...action.payload } };
    },
    setDateSubmitted: (state, action: PayloadAction<string | null>) => {
      return { ...state, dateSubmitted: action.payload };
    },
    setFormSubmitted: (state, _: PayloadAction<boolean>) => {
      return { ...state, formSubmitted: true };
    },
  },
});

export const {
  setHRReportState,
  setUserID,
  setAcademicYearID,
  setDepartment,
  setDeadline,
  setNumberOfStaff,
  setFormSubmitted,
  setDateSubmitted,
} = hrReportSlice.actions;

export const selectHRReport = (state: RootState) => state.hrReport;

export const selectUserID = (state: RootState) => state.hrReport.userID;
export const selectAcademicYearID = (state: RootState) =>
  state.hrReport.academicYearID;
export const selectDepartment = (state: RootState) => state.hrReport.department;
export const selectDeadline = (state: RootState) => state.hrReport.deadline;
export const selectNumberOfStaff = (state: RootState) =>
  state.hrReport.numberOfStaff;
export const selectDateSubmitted = (state: RootState) =>
  state.hrReport.dateSubmitted;
export default hrReportSlice.reducer;
