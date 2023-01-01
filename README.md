# DO FVTT Client

CLient for ease-of-use hosting FoundryVTT on DigitalOcean

Functionality is simple. 
- When the underlying FVTT Server is "off" (DigitalOcean instance deleted and snapshotted), it shows a button to turn it on.
- When the underlying FVTT server is on, it shows 3 buttons:
![image](https://user-images.githubusercontent.com/4323034/204411283-25f08de4-3ed9-45ac-9f1d-df927bebb999.png)
Save updates the snapshot. Closing the server will always update the snapshot.


## Deployment

1. Clone the repo
2. Add a .env file at the root directory, with VITE_FOUNDRY_URL pointing to your foundry URL and VITE_ORCHESTRATOR_URL pointing to your deployed https://github.com/t2pellet/digitalocean-orchestrator URL
3. npm install
4. npm run deploy, specify the URL, can use custom subdomain if you wish, you'll just have to point to surge DNS
