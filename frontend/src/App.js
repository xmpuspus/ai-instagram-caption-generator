import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Snackbar, makeStyles, Typography, Paper, Card, CardContent } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './App.css'; // Ensure this is the correct path to your CSS file

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(5), // Increased padding
    backgroundColor: theme.palette.background.default,
  },
  hiddenInput: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(3), // Increased margin
    position: 'relative',
    padding: theme.spacing(2), // Increased padding
    fontSize: '1.25rem', // Larger font size
  },
  card: {
    maxWidth: '100%', // Use maximum width available
    width: 500, // Increased width
    margin: theme.spacing(3), // Increased margin
    position: 'relative', // For the spinner positioning
  },
  media: {
    height: 400, // Increased height
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer', // Makes the image look clickable
  },
  spinnerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2, // Ensure spinner is above the image
  },
  captionContent: {
    padding: theme.spacing(2), // Increased padding
  },
}));

const App = () => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setCaption('');
      setError('');
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleButtonClick = async () => {
    if (!image) {
      triggerFileInput();
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost/captioner', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCaption(response.data.text);
      } catch (error) {
        setError("Error fetching the caption");
        console.error("Error fetching the caption", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h3" component="h1" gutterBottom> {/* Increased size */}
        AI Instagram Caption Generator
      </Typography>
      <input
        accept="image/*"
        className={classes.hiddenInput}
        id="contained-button-file"
        type="file"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={!loading && !image && <CloudUploadIcon />}
        disabled={loading}
        onClick={handleButtonClick}
      >
        {image && loading ? "Generating Caption..." : image ? "Generate Caption" : "Upload Image"}
      </Button>
      <Card className={classes.card}>
        {image && (
          <div
            className={classes.media}
            style={{ backgroundImage: `url(${URL.createObjectURL(image)})` }}
            onClick={triggerFileInput}
          />
        )}
        {loading && (
          <div className={classes.spinnerOverlay}>
            <CircularProgress size={68} /> {/* Increased size */}
          </div>
        )}
        {!loading && caption && (
          <CardContent className={classes.captionContent}>
            <Typography variant="body1" component="p"> {/* Increased size */}
              {caption}
            </Typography>
          </CardContent>
        )}
      </Card>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default App;
