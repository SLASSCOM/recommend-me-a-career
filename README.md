This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

Install dependencies
```bash
npm install 
```

Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on GitHub Pages

This repository is configured to deploy on GitHub Pages. To deploy, simply commit to the `main` branch and push to GitHub. GitHub Actions will automatically build and deploy the site to GitHub Pages.


## Backend

The backend is a simple Google AppScript that is deployed as a web app. The code is located in the `backend` folder. To deploy, simply copy the code into a new Google AppScript project and deploy as a web app. The web app should be deployed as `Anyone, even anonymous` and `Access: Anyone`. The web app URL should be copied into the `quixcomponent.js` file. This AppScript saves the data to a Google Sheet. The Google Sheet is saved under the Google Drive of `bridge@slasscom.lk` user.