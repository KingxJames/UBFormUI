import React, { useState, useEffect } from "react";
import { Container, Box, IconButton } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { UBTextArea } from "../../../../common/Textarea/UBTextArea";
import { UBTextField } from "../../../../common/UBTextField/UBTextField";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  IActivity,
  selectActivities,
  addNewActivity,
  removeActivity,
  updateActivity,
} from "../../../../../store/features/annualReportSlice";
import { RootState } from "../../../../../store/store";

export const UBActivitiesForTheYear = () => {
  const dispatch = useDispatch();
  const activitiesFromStore = useSelector(selectActivities);
  const [activities, setActivitiesState] = useState([...activitiesFromStore]);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    setActivitiesState([...activitiesFromStore]);
  }, [activitiesFromStore]);

  const handleAddActivity = () => {
    dispatch(addNewActivity());
  };

  const handleRemoveActivity = (index: number) => {
    dispatch(removeActivity(index));
  };

  const handleChange = (index: number, field: keyof IActivity, value: any) => {
    dispatch(updateActivity({ index, field, value }));
  };

  const handleImageChange = async (index: number, files: FileList | null) => {
    if (!files) return;
    const formData = new FormData();
    Array.from(files).map((file) => formData.append("file[]", file));

    const response = await fetch(
      "http://127.0.0.1:8088/api/v1/UBForms/uploadPhoto",
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

    if (data && Array.isArray(data)) {
      // Map the new images to have separate URLs for storage and display
      const newImages = data
        .filter((file: any) => file.generated_name) // Ensure the file has a valid name
        .map((file: any, i: number) => ({
          eventPicture: `/photos/` + file.generated_name, // Save this to the database
          displayURL:
            `http://127.0.0.1:8088/api/v1/UBForms/getFile/photos/` +
            file.generated_name, // Use this for UI display
          id: `activity${index}${i}`, // Unique ID for each image
        }));

      // Update the pictureURL array in the activities
      const updatedPictureURL = (activities[index].pictureURL ?? []).map(
        (pic, i) => {
          if (!pic.eventPicture) {
            // Replace null or invalid entry with a new image if available
            const newImage = newImages.shift();
            return newImage ? { eventPicture: newImage.eventPicture } : pic;
          } else {
            return pic;
          }
        }
      );

      // Append any remaining new images that were not used to replace nulls
      handleChange(index, "pictureURL", [
        ...updatedPictureURL,
        ...newImages.map((img) => ({ eventPicture: img.eventPicture })), // Store only eventPicture URLs in the database
      ]);

      // Display images in the UI using displayURL
      newImages.forEach((img) => {
        downloadFile(img.displayURL, img.id);
      });
    } else {
      console.error("Unexpected response format:", data);
    }
  };

  const downloadFile = (url: string, id: string) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    })
      .then((r) => r.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        let a: HTMLImageElement | null = document.querySelector(`#${id}`);

        a!.src = file;
      });
  };

  return (
    <Container sx={{ width: 1, m: 1, mb: "100px", p: 1 }}>
      <h3 style={{ marginBottom: "2%", marginTop: "6%" }}>
        <center>
          Activities for the year - List activities conducted during the year
          under review.
        </center>
      </h3>

      {activities.map((activity, index) => (
        <Box key={index} mb={4}>
          <Box mb={-6.5}>
            <UBTextField
              question="Name of Event"
              SetAnswer={(e) =>
                handleChange(index, "eventName", e.target.value)
              }
              value={activity.eventName}
            />
          </Box>

          <Box mb={-6.5}>
            <UBTextField
              question="Name of person/s in the pictures"
              SetAnswer={(e) =>
                handleChange(index, "personsInPicture", e.target.value)
              }
              value={activity.personsInPicture}
            />
          </Box>

          <Box mb={-6.5}>
            <UBTextField
              question="Event Month"
              SetAnswer={(e) =>
                handleChange(index, "eventMonth", e.target.value)
              }
              value={activity.eventMonth}
            />
          </Box>

          <Box mb={"0%"} sx={{ width: "101.4%", ml: "-0.7%", mt: "-7%" }}>
            <UBTextArea
              question="Summary of the event."
              SetAnswer={(e) =>
                handleChange(index, "eventSummary", e.target.value)
              }
              value={activity.eventSummary}
            />
          </Box>

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
              aria-label="upload picture"
              component="label"
            >
              <AddPhotoAlternateOutlinedIcon sx={{ color: "", fontSize: 30 }} />
              <input
                hidden
                accept="image/*"
                type="file"
                multiple
                onChange={(e) => handleImageChange(index, e.target.files)}
              />
            </IconButton>

            <Box>
              {activity.pictureURL &&
                activity.pictureURL.map((pic, picIndex) => {
                  const eventPicture = pic.eventPicture;
                  const url = eventPicture
                    ? `http://127.0.0.1:8088/api/v1/UBForms/getFile/photos/${eventPicture.split("/").pop()}`
                    : "";

                  if (eventPicture) {
                    downloadFile(url, `activity${index}${picIndex.toString()}`);
                  }

                  return eventPicture ? (
                    <img
                      id={`activity${index}${picIndex.toString()}`}
                      key={picIndex}
                      src={url} // Display the image using displayURL
                      style={{ width: "100px", height: "100px", margin: "5px" }}
                    />
                  ) : null;
                })}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: "2%" }}>
            <IconButton onClick={handleAddActivity}>
              <AddCircleRoundedIcon
                sx={{ color: "#FFD954", cursor: "pointer" }}
              />
            </IconButton>
            {index > 0 && (
              <IconButton onClick={() => handleRemoveActivity(index)}>
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

export default UBActivitiesForTheYear;
