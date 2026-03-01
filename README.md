# Carlos Ng | Senior QA Automation Engineer Portfolio

A personal portfolio website built with React and Vite. This project showcases professional experience, technical skills, certifications, and QA automation projects.

## Key Features
- Fully responsive, mobile-first layout
- Fast performance via Vite builds
- Visitor counter for total and unique visits
- Resume viewer with download CTA

## Tech Stack
- React 19
- React Router
- Vite 6
- Framer Motion
- Lucide React
- Vanilla CSS (CSS Variables, Flexbox, Grid)

## Project Structure
```text
├── api/
│   ├── download-resume/route.js   # Track resume downloads (CounterAPI)
│   └── serve-resume/route.js      # Force PDF download with headers
├── public/
│   ├── profile.png                # Profile picture
│   ├── cng07-logo.png             # Brand logo
│   └── Carlos_Ng_Resume.pdf       # Downloadable resume
├── src/
│   ├── components/
│   │   ├── Seo.jsx                # SEO meta tags (OG/Twitter/canonical)
│   │   └── CustomIcons.jsx        # Custom icon set
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsAndConditions.jsx
│   │   └── Resume.jsx
│   ├── data/
│   │   └── resumeData.js          # CENTRAL DATA FILE
│   ├── App.jsx                    # Main layout with routing and navigation
│   ├── index.css                  # Global styles and design system
│   └── main.jsx                   # Application entry point
├── vercel.json                    # SPA rewrites for Vercel
├── package.json
└── vite.config.js
```

## Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/cng07/carlosng07.git
   cd carlosng07
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` in your browser.
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview production build:
   ```bash
   npm run preview
   ```

## Deployment
This project is optimized for deployment on Vercel or Netlify.

### Vercel
1. Push your changes to GitHub
2. Import your repository on Vercel
3. Vercel will auto-detect Vite settings and deploy

The `vercel.json` file provides SPA rewrites to route all requests to `index.html`.

### Netlify
1. Connect your repository on Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

## Customization Guide
### Updating Content
All content is centralized in `src/data/resumeData.js`. Update this file to change:
- Personal information (name, role, contact)
- About me bio paragraphs
- Skills
- Work experience
- Education
- Certifications
- Publications

### Styling Customization
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #10b981;        /* Brand color */
  --background: #0f172a;     /* Page background */
  --text-main: #f8fafc;      /* Primary text */
}
```

## Page Sections
- Home: Hero, skill categories, and CTAs
- Experience: Roles, impact, and achievements
- Projects: Automation frameworks and tooling
- Resume: Embedded viewer with download CTA
- Certifications: Certifications and credential links
- Education: Academic background
- About: Career story and QA philosophy
- Contact: Contact channels and links
- Privacy Policy
- Terms & Conditions

---

**Built by Carlos Ng** | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carloangeloeng/) | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cng07)
