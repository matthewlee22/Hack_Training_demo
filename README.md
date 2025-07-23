In the backend directory, create a file named '.env', and add the following:
CONNECT_URL=mqtts://(your URL):(your port)
MQTT_USER=(your user)
MQTT_PASS=(your pass)

Then, while still in the directory, make sure to run 
### `npm install`
to install the dependencies.
Finally, you can run 
### `node index.js`
to start the backend.

In a separate terminal, in the frontend directory, make sure to run 
### `npm install`
to install the dependencies.
Then, you can run
### `npm start`
to run the website.

If you have your pico with you, add the files located in the 'pico' directory to your device.
Then, run 'main.py' on your pico.