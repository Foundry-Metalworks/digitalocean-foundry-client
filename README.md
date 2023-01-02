# Metalworks Client

Open source alternative to The Forge.

Using DigitalOcean, you only pay for the time your server is on. From personal use it only ends up costing 2.50 a month to host with Metalworks.

Server Specs: https://pcr.cloud-mercato.com/providers/digitalocean/flavors/s-2vcpu-2gb


Functionality is simple. 
- When the underlying FVTT Server is "off", it shows a button to turn it on.
- When the underlying FVTT server is on, it shows 3 buttons:
![image](https://user-images.githubusercontent.com/4323034/204411283-25f08de4-3ed9-45ac-9f1d-df927bebb999.png)
Save updates the snapshot. Closing the server will always update the snapshot.


## Deployment

1. Clone the repo
2. Add a .env file at the root directory, with the following fields:
```
VITE_NAME={your server name here}
VITE_PASSWORD={your desired pwd here}
VITE_TOKEN={your digital ocean token here - read & write}
```
3. npm install
4. npm run deploy, specify the URL, can use custom subdomain if you wish, you'll just have to point to surge DNS
