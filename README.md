# babuba.com - Multi-Language Landing Page

A modern, professional landing page for babuba.com - Turkey's first 100% electric vehicle platform, supporting 4 languages with path-based routing.

## 🌟 Features

- **Multi-language Support**: Turkish (TR), English (EN), Chinese (中文), Arabic (العربية)
- **Modern 2025 UI/UX Design**: Professional, clean, and responsive design
- **Path-based Routing**: `/tr`, `/en`, `/zh`, `/ar` language paths
- **Brand Colors**: Primary blue (#1977ff) and white (#ffffff)
- **Logo Integration**: Gaveto Rough font styling for logo
- **Responsive Design**: Mobile-first approach with full device support
- **RTL Support**: Proper right-to-left layout for Arabic
- **Interactive Features**: Language switcher, phase tabs, smooth scrolling
- **Performance Optimized**: Preloaded resources, lazy loading, animations

## 🚀 Technology Stack

- **HTML5**: Semantic markup with proper meta tags
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Interactive features and language switching
- **Google Fonts**: Inter (primary) and Gaveto Rough (logo)
- **No Dependencies**: Pure vanilla JavaScript and CSS

## 📁 Project Structure

```
babuba-web/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── main.js           # Main JavaScript file
│   ├── fonts/                # Font files (if needed)
│   └── images/
│       └── babuba-beyaz-yazi-logo.png
├── tr/
│   └── index.html            # Turkish version
├── en/
│   └── index.html            # English version
├── zh/
│   └── index.html            # Chinese version
├── ar/
│   └── index.html            # Arabic version
├── index.html                # Main redirect page
└── README.md                 # This file
```

## 🎨 Design Features

### Color Palette
- **Primary Blue**: #1977ff
- **White**: #ffffff
- **Dark Blue**: #0d47a1
- **Light Blue**: #e3f2fd
- **Gray Scale**: #f9fafb to #111827

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Logo Font**: Gaveto Rough (Google Fonts)
- **Font Weights**: 300-900 (Inter), 400-900 (Gaveto Rough)

### Layout
- **Container**: Max-width 1200px with responsive padding
- **Grid System**: CSS Grid and Flexbox
- **Spacing**: Consistent spacing scale with CSS custom properties
- **Border Radius**: 12px (small), 20px (large)
- **Shadows**: Multiple shadow levels for depth

## 🌐 Language Support

### Turkish (TR) - Default
- **Path**: `/tr/`
- **Direction**: LTR
- **Content**: Original Turkish content from markdown

### English (EN)
- **Path**: `/en/`
- **Direction**: LTR
- **Content**: Professional English translation

### Chinese (中文)
- **Path**: `/zh/`
- **Direction**: LTR
- **Content**: Simplified Chinese translation

### Arabic (العربية)
- **Path**: `/ar/`
- **Direction**: RTL
- **Content**: Arabic translation with RTL layout support

## 🔧 Interactive Features

### Language Switcher
- Seamless language switching without page reload
- URL updates with history API
- Active language highlighting
- RTL layout application for Arabic

### Phase Tabs
- Interactive tabs for platform development phases
- Smooth transitions between content
- Responsive tab layout

### Scroll Effects
- Header background change on scroll
- Smooth scrolling for anchor links
- Intersection Observer for animations
- Sticky header with backdrop blur

### Animations
- Fade-in animations on scroll
- Hover effects on cards and buttons
- Smooth transitions throughout
- Loading states and micro-interactions

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

### Mobile Features
- Touch-friendly interface
- Optimized typography scaling
- Collapsible navigation
- Stacked layout for cards

## ⚡ Performance

### Optimization Features
- **Preloaded Resources**: Critical CSS and JS
- **Lazy Loading**: Images with Intersection Observer
- **Minimal Dependencies**: No external frameworks
- **Efficient Animations**: CSS transforms and opacity
- **Compressed Assets**: Optimized file sizes

### SEO Features
- **Meta Tags**: Open Graph and Twitter Cards
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alt attributes
- **Language Attributes**: Proper lang and dir attributes

## 🚀 Getting Started

### Prerequisites
- Web server (Apache, Nginx, or development server)
- Modern web browser with ES6+ support

### Installation
1. Clone or download the project files
2. Upload to your web server
3. Ensure proper file permissions
4. Configure server for clean URLs (optional)

### Local Development
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

## 🔧 Customization

### Colors
Edit CSS custom properties in `assets/css/style.css`:
```css
:root {
  --primary-blue: #1977ff;
  --white: #ffffff;
  /* ... other colors */
}
```

### Content
- Edit HTML files in language-specific folders
- Update meta tags for SEO
- Modify contact information
- Add new sections as needed

### Styling
- Customize typography in CSS variables
- Modify spacing and layout in CSS
- Add new animations and effects
- Update responsive breakpoints

## 📞 Contact Information

- **General Info**: info@babuba.com
- **Marketing & Partnership**: marketing@babuba.com
- **LinkedIn**: [babuba-ev](https://linkedin.com/company/babuba-ev)
- **Instagram**: [@babuba.ev](https://instagram.com/babuba.ev)
- **Twitter**: [@babuba_ev](https://twitter.com/babuba_ev)
- **YouTube**: [babuba-elektrikli](https://youtube.com/babuba-elektrikli)

## 📄 License

© 2024 babuba.com - All rights reserved.

---

*Last Updated: September 2024*
*Version: 1.0.0*
