# Family Tree Maker

A React application for creating and managing a family tree. Users can add family members with their details, view them on a tree background, and export the family tree as a PDF.

## Features

- Add family members with name, profession, age, family relation, and gender
- Display family members on a tree background
- Delete family members
- Export family tree as PDF
- Data persistence using local storage
- Responsive design

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Create a production build:
   ```
   npm run build
   ```
2. Create an account on [Netlify](https://www.netlify.com/) if you don't have one
3. Go to the Netlify dashboard and click "New site from Git"
4. Connect your Git repository (GitHub, GitLab, or Bitbucket)
5. Select the repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
7. Click "Deploy site"

### Option 2: Deploy via Drag and Drop

1. Create a production build:
   ```
   npm run build
   ```
2. Create an account on [Netlify](https://www.netlify.com/) if you don't have one
3. Go to the Netlify dashboard
4. Drag and drop the `build` folder onto the Netlify dashboard
5. Your site will be deployed instantly

### Option 3: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```
   npm install netlify-cli -g
   ```
2. Login to Netlify:
   ```
   netlify login
   ```
3. Initialize a new Netlify site:
   ```
   netlify init
   ```
4. Follow the prompts to set up your site
5. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [jsPDF](https://github.com/MrRio/jsPDF) - Client-side JavaScript PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) - Screenshots with JavaScript
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React projects
