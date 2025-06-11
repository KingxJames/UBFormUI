import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { UBTextField } from "../../../../common/UBTextField/UBTextField";
import Box from "@mui/material/Box";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewMeeting,
  removeMeeting,
  updateMeeting,
  IMeeting,
  selectAnnualReport,
} from "../../../../../store/features/annualReportSlice";
import { RootState } from "../../../../../store/store";
import UploadIcon from "@mui/icons-material/Upload";

export const UBFacultyMeetings: React.FC = () => {
  const dispatch = useDispatch();
  const annualReport = useSelector(selectAnnualReport);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleAddMeetings = () => {
    dispatch(addNewMeeting());
  };

  const handleRemoveMeetings = (index: number) => {
    dispatch(removeMeeting(index));
  };

  const handleChange = (index: number, field: keyof IMeeting, value: any) => {
    dispatch(updateMeeting({ index, field, value }));
  };

  const handleFileChange = async (index: number, files: FileList | null) => {
    if (!files) return;
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file[]", file));

    try {
      const response = await fetch(
        "http://127.0.0.1:8088/api/v1/UBForms/uploadMeetings",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();

      if (data) {
        const newFiles = data
          .filter((file: any) => file.generated_name) // Ensure the file has a valid name
          .map((file: any) => ({
            fileURL:
              `http://127.0.0.1:8088/api/v1/UBForms/meetings/` +
              file.generated_name, // Save this to the database
           
          }));

        const meetingMinutesURL = [
          ...newFiles.map((file: any) => ({ meetingURL: file.fileURL })),
        ];

        if (annualReport.meetings[index].meetingMinutesURL) {
          annualReport.meetings[index].meetingMinutesURL?.map((r) => {
            if (r.meetingURL)
              meetingMinutesURL.unshift({ meetingURL: r.meetingURL });
          });
        }

        dispatch(
          updateMeeting({
            index,
            field: "meetingMinutesURL",
            value: meetingMinutesURL,
          })
        );
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Container sx={{ width: 1, m: 1, mb: "100px", p: 1 }}>
      <h3 style={{ marginBottom: "2%", marginTop: "5%" }}>
        <center>Faculty Meetings</center>
      </h3>

      {annualReport.meetings.map((meeting, index) => (
        <Box key={index} mb={4}>
          <Box mb={-6.5}>
            <UBTextField
              question="Type of Meeting"
              SetAnswer={(e) =>
                handleChange(index, "meetingType", e.target.value)
              }
              value={meeting.meetingType}
            />
          </Box>

          <Box mb={-6.5}>
            <UBTextField
              question="Date of Meeting"
              SetAnswer={(e) =>
                handleChange(index, "meetingDate", e.target.value)
              }
              value={meeting.meetingDate}
            />
          </Box>

          {/* Meeting Minutes Upload */}
          <Box
            sx={{
              width: "69%",
              ml: "14.5%",
              mb: "0%",
              p: "1%",
              bgcolor: "#FFD954",
            }}
          >
            <IconButton
              size="small"
              aria-label="upload file"
              component="label"
              sx={{
                border: "1px solid",
                borderRadius: "8px", // Adjusts the roundness of the corners
                width: "150px", // Adjust the width to make it rectangular
                height: "40px", // Adjust the height
                ml: "2%",
                mt: "3%",
              }}
            >
              <UploadIcon sx={{ fontSize: 30 }} />
              <input
                hidden
                // accept="*/*"
                accept=".pdf,.doc,.docx"
                type="file"
                multiple
                onChange={(e) => handleFileChange(index, e.target.files)}
              />
              Upload File
            </IconButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap", // Allows the files to wrap to the next line
                mt: "4%",
              }}
            >
              {meeting.meetingMinutesURL &&
                meeting.meetingMinutesURL.map((minutes, minutesIndex) => {
                  //Iterates over the array of URLs for the meeting minutes.
                  const meetingURL = minutes?.meetingURL || ""; //Extracts the URL from each minutes object.
                  const fileName = meetingURL.split("/").pop(); // Extract the file name from the URL
                  const url = `http://127.0.0.1:8088/api/getFile/meetings/${fileName}`; //Constructs a full API URL to fetch the file using the last part of meetingURL
                  return (
                    minutes.meetingURL && (
                      <a
                        key={minutesIndex}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          margin: "5px", // Margin between items
                          padding: "1% 0% 0% 2%",
                          border: "1px black solid",
                          borderRadius: "8px", // Adjusts the roundness of the corners
                          width: "150px", // Adjust the width to make it rectangular
                          height: "40px", // Adjust the height
                          backgroundColor: "#fff",
                        }}
                      >
                        {`Meeting file ${minutesIndex + 1}`}
                      </a>
                    )
                  );
                })}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: "4%" }}>
            <IconButton onClick={handleAddMeetings}>
              <AddCircleRoundedIcon
                sx={{ color: "#FFD954", cursor: "pointer" }}
              />
            </IconButton>
            {index > 0 && (
              <IconButton onClick={() => handleRemoveMeetings(index)}>
                <RemoveCircleOutlinedIcon
                  sx={{ color: "#FFD954", cursor: "pointer", ml: 1 }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default UBFacultyMeetings;
