# AI Instagram Caption Generator
Upload an image and generate instagram captions.

### Web App

The UI should look like the GIF shown below:

![UI of IG Caption Generator](images/ai_image_gen_vid.gif)

### Frontend

To install packages, run:
```
npm install @material-ui/core @material-ui/icons @material-ui/lab axios
```

To run the web app locally, run the script below:
```
cd frontend
npm start
```

### Backend

First, replace the OpenAI API key with your own API key in the `docker-compose.yml` file. To run the instance, make sure your docker is up, then run:

```
docker-compose up --build -d
```

to expose the captioner endpoint.

