import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";

export default function EditProfile() {
  const [profileImage, setProfileImage] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    phoneNumber: "",
    gstin: "",
    email: "",
    businessType: "",
    businessCategory: "",
    state: "",
    pincode: "",
    businessAddress: "",
    userid:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getProfile");
      const data = response.data;
      setFormData({
        businessName: data.businessName || "",
        phoneNumber: data.phoneNumber || "",
        gstin: data.gstin || "",
        email: data.email || "",
        businessType: data.businessType || "",
        businessCategory: data.businessCategory || "",
        state: data.state || "",
        pincode: data.pincode || "",
        businessAddress: data.businessAddress || "",
        userid:data._id,
      });
      setProfileImage(data.profileImage || "");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
   

    fetchProfileData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    console.log("called")


    // setIsLoading(true);

    // const data = new FormData();
    // data.append("profileImage", profileImage);
    // data.append("businessName", formData.businessName);
    // data.append("phoneNumber", formData.phoneNumber);
    // data.append("gstin", formData.gstin);
    // data.append("email", formData.email);
    // data.append("businessType", formData.businessType);
    // data.append("businessCategory", formData.businessCategory);
    // data.append("state", formData.state);
    // data.append("pincode", formData.pincode);
    // data.append("businessAddress", formData.businessAddress);


    // try {
    //   const response = await axios.post("http://localhost:4000/api/saveProfile", data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Profile updated successfully:", response.data);
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    // } finally {
    //   setIsLoading(false);
    // }

    //second
   
    
    setIsLoading(true);
    try {
      console.log("called_1")
      const data = new FormData();
      data.append("profileImage", profileImage);  
      data.append("businessName", formData.businessName);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("gstin", formData.gstin);
      data.append("email", formData.email);
      data.append("businessType", formData.businessType);
      data.append("businessCategory", formData.businessCategory);
      data.append("state", formData.state);
      data.append("pincode", formData.pincode);
      data.append("businessAddress", formData.businessAddress);

      console.log("called_2") 
  
      const response = await axios.put(`http://localhost:4000/api/updateProfile/${formData.userid}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProfileData()
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3 }}>
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src={profileImage}
            alt="Profile Picture"
          />
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            Add/Change Logo
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>


        <Grid container spacing={3}>
          {/* Business Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="GSTIN"
              name="gstin"
              value={formData.gstin}
              onChange={handleInputChange}
              placeholder="Enter GSTIN"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email ID"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>

          {/* More Details */}
          <Grid item xs={12} sm={6}>
            <InputLabel>Business Type</InputLabel>
            <Select
              fullWidth
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
            >
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Business Category</InputLabel>
            <Select
              fullWidth
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleInputChange}
            >
              <MenuItem value="NGO & Charitable trust">
                NGO & Charitable trust
              </MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>State</InputLabel>
            <Select
              fullWidth
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <MenuItem value="">Select State</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              {/* Add other states as needed */}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Business Address"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              placeholder="Enter Business Address"
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Add Signature
            </Typography>
            <Button variant="outlined" component="label">
              Upload Signature
              <input type="file" hidden />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
