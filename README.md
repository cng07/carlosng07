# Carlos Ng | Senior QA Automation Engineer Portfolio

A premium, high-performance personal portfolio website built with React, Vite, and Framer Motion. This project showcases professional experience, technical skills, and certifications specifically tailored for a Senior Quality Assurance Automation Engineer.

## ✨ Key Features

- **Professional Design**: Dark glassmorphic UI with emerald accents and smooth animations
- **Technology Logos**: Official brand logos for all technical skills
- **Fully Responsive**: Mobile-first design with adaptive layouts
- **Fast Performance**: Built with Vite for optimized loading
- **Easy to Customize**: Centralized content management via `resumeData.js`

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) 18
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icon set
- **Styling**: Vanilla CSS with CSS Variables, Flexbox, and Grid
- **Logos**: DevIcons CDN, Simple Icons, and Wikimedia Commons

## 📂 Project Structure

```text
├── public/
│   ├── profile.png           # Profile picture
│   └── Carlos_Ng_Resume.pdf  # Downloadable resume
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Landing page with hero and skills
│   │   ├── About.jsx         # About me, bio, and philosophy
│   │   ├── Education.jsx     # Educational background
│   │   ├── Certifications.jsx # Professional certifications
│   │   ├── Contact.jsx       # Contact information
│   │   └── Resume.jsx        # PDF resume viewer
│   ├── data/
│   │   └── resumeData.js     # ⭐ CENTRAL DATA FILE - Edit here to update content
│   ├── App.jsx               # Main layout with routing and navigation
│   ├── index.css             # Global styles and design system
│   └── main.jsx              # Application entry point
├── package.json
└── vite.config.js
```

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cng07/carlosng07.git
   cd carlosng07
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📦 Deployment

This project is optimized for deployment on **Vercel** or **Netlify**.

### Vercel Deployment
1. Push your changes to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite settings and deploy

### Netlify Deployment
1. Connect your repository on [Netlify](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📝 Customization Guide

### Updating Content
All content is centralized in `src/data/resumeData.js`. Update this file to change:
- Personal information (name, role, contact)
- About me bio paragraphs
- Skills (automatically includes technology logos)
- Work experience
- Education
- Certifications
- Publications

### Adding New Technology Logos
Edit `resumeData.js` skills section:
```javascript
skills: {
  testAutomation: [
    { name: "Tool Name", logo: "https://cdn.example.com/logo.svg" }
  ]
}
```

For multiple logos on one badge (like UI browsers):
```javascript
{ name: "UI", logos: [
  "https://logo1.svg",
  "https://logo2.svg"
]}
```

### Styling Customization
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #10b981;        /* Brand color */
  --background: #0f172a;     /* Page background */
  --text-main: #f8fafc;      /* Primary text */
}
```

## 📄 Page Sections

- **Home**: Hero with profile, categorized skills with logos, and call-to-action buttons
- **About**: Bio, QA philosophy, and professional overview
- **Education**: Educational background
- **Certifications**: Professional certifications with download links
- **Contact**: Contact information and details
- **Resume**: Embedded resume viewer

---

**Built with 💚 by Carlos Ng** | [🔗 LinkedIn](https://www.linkedin.com/in/carloangeloeng/) | [🐙 GitHub](https://github.com/cng07)
