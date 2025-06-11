import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the import according to your store file location

interface IStrategicGoals {
  strategicGoalsUnderReview: string;
  implmentationPlans: string;
  plansToAchieveNotCompletedGoals: string;
  strategicGoals: string;
}

interface IAccomplishments {
  accomplishmentList: string;
  accomplishmentAdvancement: string;
  impactfulChange: string;
  why: string;
  applicableOpportunities: string;
}

interface IResearchPartnerships {
  externalFunding: string;
  researchPublications: string;
  partnershipAgencies: string;
  scholarships: string;
}

interface IStudentSuccess {
  studentLearning: string;
  studentClubs: string;
  student1: string;
  reason1: string;
  student2: string;
  reason2: string;
  student3: string;
  reason3: string;
}

interface IEventPicture {
  eventPicture: string;
}

export interface IActivity {
  eventId?: number;
  eventName?: string;
  eventMonth?: string;
  pictureURL?: IEventPicture[];
  personsInPicture: string;
  eventSummary?: string;
}

interface IActivityUpdate {
  index: number;
  field: keyof IActivity;
  value: any;
}

interface IAdministrativeData {
  fullTimeStaff: number;
  partTimeStaff: number;
  significantStaffChanges: string;
}

interface IFinancialBudget {
  fundingSources?: string;
  significantBudgetChanges?: string;
}

interface IMeetingUpdate {
  index: number;
  field: keyof IMeeting;
  value: any;
}

interface IMeetingURL {
  meetingURL: string;
}

export interface IMeeting {
  meetingId?: number;
  meetingType?: string;
  meetingDate?: string; // ISO date string
  meetingMinutesURL?: IMeetingURL[];
}

export interface annualNonReportInitialState {
  id: string;
  academicYearID: string;
  department: string;
  reportsTo: string;
  missionStatement: string;
  strategicGoals: IStrategicGoals;
  accomplishments: IAccomplishments;
  researchPartnerships: IResearchPartnerships;
  studentSuccess: IStudentSuccess;
  activities: IActivity[];
  administrativeData: IAdministrativeData;
  financialBudget: IFinancialBudget;
  meetings: IMeeting[];
  otherComments: string;
  formSubmitted: boolean;
}

const initialState: annualNonReportInitialState = {
  id: "",
  academicYearID: "",
  department: "",
  reportsTo: "",
  missionStatement: "",
  strategicGoals: {
    strategicGoalsUnderReview: "",
    implmentationPlans: "",
    plansToAchieveNotCompletedGoals: "",
    strategicGoals: "",
  },
  accomplishments: {
    accomplishmentList: "",
    accomplishmentAdvancement: "",
    impactfulChange: "",
    why: "",
    applicableOpportunities: "",
  },
  researchPartnerships: {
    externalFunding: "",
    researchPublications: "",
    partnershipAgencies: "",
    scholarships: "",
  },
  studentSuccess: {
    studentLearning: "",
    studentClubs: "",
    student1: "",
    reason1: "",
    student2: "",
    reason2: "",
    student3: "",
    reason3: "",
  },
  activities: [
    {
      eventId: 0,
      eventName: "",
      personsInPicture: "",
      pictureURL: [
        {
          eventPicture: ""
        },
      ],
      eventSummary: "",
      eventMonth: "",
    },
  ],
  administrativeData: {
    fullTimeStaff: 0,
    partTimeStaff: 0,
    significantStaffChanges: "",
  },
  financialBudget: {
    fundingSources: "",
    significantBudgetChanges: "",
  },
  meetings: [
    {
      meetingId: 0,
      meetingType: "",
      meetingDate: "",
      meetingMinutesURL: [],
    },
  ],
  otherComments: "",
  formSubmitted: false,
};

const annualNonReportSlice = createSlice({
  name: "nonAnnualReport",
  initialState,
  reducers: {
    setAnnualNonReportState: (
      state,
      action: PayloadAction<annualNonReportInitialState>
    ) => {
      return { ...state, ...action.payload };
    },
    setAcademicYearID: (state, action: PayloadAction<string>) => {
      return { ...state, academicYearID: action.payload };
    },
    setDepartment: (state, action: PayloadAction<string>) => {
      return { ...state, department: action.payload };
    },
    setReportsTo: (state, action: PayloadAction<string>) => {
      return { ...state, reportsTo: action.payload };
    },
    setMissionStatement: (state, action: PayloadAction<string>) => {
      return { ...state, missionStatement: action.payload };
    },
    setStrategicGoals: (
      state,
      action: PayloadAction<Partial<IStrategicGoals>>
    ) => {
      return {
        ...state,
        strategicGoals: { ...state.strategicGoals, ...action.payload },
      };
    },
    setAccomplishments: (
      state,
      action: PayloadAction<Partial<IAccomplishments>>
    ) => {
      return {
        ...state,
        accomplishments: { ...state.accomplishments, ...action.payload },
      };
    },
    setResearchPartnerships: (
      state,
      action: PayloadAction<Partial<IResearchPartnerships>>
    ) => {
      return {
        ...state,
        researchPartnerships: {
          ...state.researchPartnerships,
          ...action.payload,
        },
      };
    },
    setStudentSuccess: (
      state,
      action: PayloadAction<Partial<IStudentSuccess>>
    ) => {
      return {
        ...state,
        studentSuccess: { ...state.studentSuccess, ...action.payload },
      };
    },
    setActivities: (state, action: PayloadAction<IActivity>) => {
      const { eventId } = action.payload;
      if (eventId !== undefined) {
        const existingActivityIndex = state.activities.findIndex(
          (activity) => activity.eventId === eventId
        );
        if (existingActivityIndex >= 0) {
          state.activities[existingActivityIndex] = {
            ...state.activities[existingActivityIndex],
            ...action.payload,
          };
        } else {
          state.activities.push({
            ...action.payload,
            eventId: state.activities.length,
          });
        }
      }
    },
    removeActivity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.activities.length) {
        state.activities.splice(index, 1);
      }
    },

    addNewActivity: (state) => {
      state.activities.push({
        eventId: state.activities.length,
        eventName: "",
        personsInPicture: "",
        eventMonth: "",
        pictureURL: [
          {
            eventPicture: "",
          },
        ],
        eventSummary: "",
      });
    },

    updateActivity: (state, action: PayloadAction<IActivityUpdate>) => {
      const { index, field, value } = action.payload;
      if (index >= 0 && index <= state.activities.length) {
        state.activities[index] = {
          ...state.activities[index],
          [field]: value,
        };
      }
    },
    setAdministrativeData: (
      state,
      action: PayloadAction<Partial<IAdministrativeData>>
    ) => {
      return {
        ...state,
        administrativeData: { ...state.administrativeData, ...action.payload },
      };
    },
    setFinancialBudget: (state, action: PayloadAction<IFinancialBudget>) => {
      return {
        ...state,
        financialBudget: { ...state.financialBudget, ...action.payload },
      };
    },
    setMeetings: (state, action: PayloadAction<IMeeting>) => {
      const { meetingId } = action.payload;
      if (meetingId !== undefined) {
        const existingMeetingIndex = state.meetings.findIndex(
          (meeting) => meeting.meetingId === meetingId
        );
        if (existingMeetingIndex >= 0) {
          state.meetings[existingMeetingIndex] = {
            ...state.meetings[existingMeetingIndex],
            ...action.payload,
          };
        } else {
          state.meetings.push({
            ...action.payload,
            meetingId: state.meetings.length,
          });
        }
      }
    },

    addNewMeeting: (state) => {
      state.meetings.push({
        meetingId: state.meetings.length,
        meetingType: "",
        meetingDate: "",
        meetingMinutesURL: [
          {
            meetingURL: "",
          },
        ],
      });
    },

    removeMeeting: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.meetings.length) {
        state.meetings.splice(index, 1);
      }
    },

    updateMeeting: (state, action: PayloadAction<IMeetingUpdate>) => {
      const { index, field, value } = action.payload;
      if (index >= 0 && index < state.meetings.length) {
        state.meetings[index] = {
          ...state.meetings[index],
          [field]: value,
        };
      }
    },

    setOtherComments: (state, action: PayloadAction<string>) => {
      return { ...state, otherComments: action.payload };
    },
    setFormSubmitted: (state, _: PayloadAction<boolean>) => {
      return { ...state, formSubmitted: true };
    },
  },
});

export const {
  setAnnualNonReportState,
  setAcademicYearID,
  setDepartment,
  setReportsTo,
  setMissionStatement,
  setStrategicGoals,
  setAccomplishments,
  setResearchPartnerships,
  setStudentSuccess,
  setActivities,
  setAdministrativeData,
  setFinancialBudget,
  setMeetings,
  setOtherComments,
  addNewActivity,
  removeActivity,
  updateActivity,
  addNewMeeting,
  removeMeeting,
  updateMeeting,
  setFormSubmitted,
} = annualNonReportSlice.actions;

export const selectAnnualNonReport = (state: RootState) => {
  return state.nonAnnualReport;
};
export const selectAcademicYearID = (state: RootState) =>
  state.nonAnnualReport.academicYearID;
export const selectDepartment = (state: RootState) =>
  state.nonAnnualReport.department;
export const selectReportsTo = (state: RootState) =>
  state.nonAnnualReport.reportsTo;
export const selectMissionStatement = (state: RootState) =>
  state.nonAnnualReport.missionStatement;
export const selectStrategicGoals = (state: RootState) =>
  state.nonAnnualReport.strategicGoals;
export const selectAccomplishments = (state: RootState) =>
  state.nonAnnualReport.accomplishments;
export const selectResearchPartnerships = (state: RootState) =>
  state.nonAnnualReport.researchPartnerships;
export const selectStudentSuccess = (state: RootState) =>
  state.nonAnnualReport.studentSuccess;
export const selectActivities = (state: RootState) =>
  state.nonAnnualReport.activities;
export const selectAdministrativeData = (state: RootState) =>
  state.nonAnnualReport.administrativeData;
export const selectFinancialBudget = (state: RootState) =>
  state.nonAnnualReport.financialBudget;
export const selectMeetings = (state: RootState) =>
  state.nonAnnualReport.meetings;
export const selectOtherComments = (state: RootState) =>
  state.nonAnnualReport.otherComments;

export default annualNonReportSlice.reducer;
