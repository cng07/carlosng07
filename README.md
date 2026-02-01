# Carlos Ng | Senior QA Automation Engineer Portfolio

A premium, high-performance personal portfolio website built with React, Vite, and Framer Motion. This project showcases professional experience, technical skills, and certifications specifically tailored for a Senior Quality Assurance Automation Engineer.

## ✨ Key Highlights

- **Technology Logos**: All technical skills display official brand logos for instant recognition
- **Enhanced About Page**: Personalized greeting, refined bio, and QA Philosophy section
- **Modern UI/UX**: Dark-themed glassmorphic design with emerald accents and white skill badges
- **Responsive Design**: Mobile-first approach with adaptive navigation and layouts
- **Smooth Animations**: Elegant transitions and scroll effects using Framer Motion
- **Optimized Performance**: Built with Vite for lightning-fast loading

## 🎨 Recent Improvements

### Technology Logos
- **Skills Visualization**: Each technology displays its official logo (Playwright, Selenium, TypeScript, Java, etc.)
- **Browser Icons**: UI testing showcases Chrome, Edge, and Firefox logos
- **White Badge Background**: High-contrast design ensuring all logos are clearly visible
- **Smart Rendering**: Supports both single and multiple logos per skill

### About Page Enhancements
- **Animated Greeting**: Waving hand emoji (👋) with "Hello there!" message
- **Improved Typography**: Larger, more prominent name display
- **Better Readability**: Enhanced text contrast with optimized color values
- **QA Philosophy**: Dedicated section with lightbulb icon highlighting quality mindset
- **Visual Hierarchy**: Reordered content for better flow and engagement

### Layout & Spacing
- **Footer Margin**: Increased spacing between content and footer for better visual separation
- **Centered Elements**: Properly aligned greeting text and profile sections
- **Consistent Padding**: Unified spacing across all page sections

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

## 🎯 Features Breakdown

### Navigation
- Fixed header with glassmorphic effect
- Smooth scroll to sections
- Mobile hamburger menu
- Responsive logo display

### Hero Section
- Profile picture with glow effect
- Animated name and tagline
- Job title badge with emerald accent
- Call-to-action buttons

### Skills Section
- Categorized technical skills
- Official technology logos
- White badges for maximum visibility
- Responsive grid layout

### About Page
- Personalized greeting with waving emoji
- Professional bio
- QA Philosophy statement
- Profile images showcase
- Contact details with icons

### Certifications
- Professional certification cards
- Download buttons for credentials
- Organized by category

---

**Built with 💚 by Carlos Ng** | [LinkedIn](https://www.linkedin.com/in/carloangeloeng/) | [GitHub](https://github.com/cng07)
