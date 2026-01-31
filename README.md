# Carlos Ng | Senior QA Automation Engineer Portfolio

A premium, high-performance personal portfolio website built with React, Vite, and Framer Motion. This project showcases professional experience, technical skills, and certifications specifically tailored for a Senior Quality Assurance Automation Engineer.

## 🚀 Features

- **Modern UI/UX**: Dark-themed, glassmorphic design with emerald accents.
- **Responsive Navigation**: Adaptive header that handles long names and mobile views gracefully.
- **Scroll Animations**: Smooth transitions and entry animations using Framer Motion.
- **Data-Driven**: Centralized resume data in `src/data/resumeData.js` for easy updates.
- **Performance Optimized**: Built with Vite for ultra-fast loading and development.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Modern Vanilla CSS with CSS Variables and Flexbox/Grid.

## 📂 Project Structure

```text
├── public/                 # Static assets (profile picture, favicon)
├── src/
│   ├── components/         # Reusable UI components
│   ├── data/
│   │   └── resumeData.js   # CENTRAL DATA FILE (Edit this to update resume)
│   ├── App.jsx             # Main site layout and sections
│   ├── index.css           # Global design system and styles
│   └── main.jsx            # Application entry point
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cng07/carlosng07.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📦 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your changes to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically detect the settings and deploy your site.

## 📝 Updating Your Resume

To update your information (experience, skills, certifications), simply modify the data in:
`src/data/resumeData.js`

The Changes will reflect across the site instantly.

---

