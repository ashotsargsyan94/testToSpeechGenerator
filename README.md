
# Text To Speech (Voice Generator)

Application for generating text to speech voice with your own configurations


## Author

- [@ashotsargsyan94](https://github.com/ashotsargsyan94)


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```
```bash
  npx tailwindcss -i ./src/input.css -o ./src/main.css --watch
```
## Environment Variables

To run this project, you will need to add ```Google Console Credentials``` Json file from your account to document root directory, 
and you will need to create file ```.env``` with content of ```.env.example``` file,and edit the following environment variables with actual values

`GOOGLE_APPLICATION_CREDENTIALS`=YOUR_GOOGLE_CONSOLE_CREDENTIALS.JSON_FILE_PATH

Start the server

```bash
  npm run serve
```




