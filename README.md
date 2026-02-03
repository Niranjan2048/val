# Valentine's Day - JJK Theme 💙

A fun and interactive "Can you be my valentine?" website featuring Gojo Satoru from Jujutsu Kaisen, with a gothic aesthetic and cursed energy effects.

## Live Demo

Once deployed, your website will be available at:
`https://[your-username].github.io/val/`

## Features

- **Interactive Question Page** - Gojo asks "Can you be my valentine?"
- **Impossible "No" Button** - The no button evades clicks with progressive difficulty:
  - Moves away from cursor on approach
  - Shrinks with each attempt
  - Becomes nearly invisible after 12+ attempts
  - Displays JJK-themed love quotes
- **Big "Yes" Button** - Large, prominent button with Gojo blue glow effect
- **Domain Expansion Animation** - Triggered when clicking "Yes"
- **Celebration Page** - Special celebration with:
  - Falling hearts animation (💙 and ❤️)
  - Clickable hearts that burst into radial patterns
  - Cursor trail effect with blue particles
  - Rotating infinity symbol
- **Cursed Energy Particles** - Floating background particles throughout
- **Gothic JJK Aesthetic** - Dark gradients, blue/purple color scheme, special fonts
- **Mobile Responsive** - Works beautifully on all devices

## Tech Stack

- Pure HTML5
- CSS3 (with animations and effects)
- Vanilla JavaScript (no frameworks)
- Canvas API for particle effects
- Google Fonts (Cinzel Decorative, Montserrat)

## File Structure

```
val/
├── index.html              # Main HTML structure
├── styles/
│   └── main.css           # All styling and animations
├── scripts/
│   └── app.js             # Interactive functionality
├── assets/
│   └── images/            # Images folder (optional)
├── .nojekyll              # GitHub Pages config
└── README.md              # This file
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/val.git
   cd val
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   # or
   python -m http.server 8000  # Then visit http://localhost:8000
   ```

3. No build process required - it's pure HTML/CSS/JS!

## GitHub Pages Deployment

### Quick Setup

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add JJK Valentine website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll to **Pages** section (in the left sidebar)
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

3. **Wait for deployment** (usually 1-2 minutes)
   - GitHub will show a message: "Your site is live at https://[username].github.io/val/"

4. **Visit your site!**

### Custom Domain (Optional)

If you have a custom domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update the custom domain in GitHub Pages settings

## Customization

### Change Colors

Edit the CSS variables in [styles/main.css](styles/main.css:9-18):

```css
:root {
  --color-gojo-blue: #00D9FF;      /* Main accent color */
  --color-cursed-purple: #8B00FF;  /* Secondary color */
  --color-accent-red: #FF0040;     /* Hearts color */
  /* ... */
}
```

### Add Custom Gojo Image

1. Add your Gojo image to `assets/images/gojo.png`
2. Update [index.html](index.html:48-56) to use `<img>` tag instead of placeholder:

```html
<div class="character__image-container">
  <img src="assets/images/gojo.png" alt="Gojo Satoru" class="character__image">
  <div class="character__glow"></div>
</div>
```

3. Add CSS styling for the image in `main.css`

### Modify Love Quotes

Edit the quotes array in [scripts/app.js](scripts/app.js:96-105):

```javascript
this.quotes = [
  "Your custom quote here!",
  "Add more JJK references!",
  // ...
];
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Target: 60fps on all devices
- Optimized particle count for mobile
- Uses `requestAnimationFrame` for smooth animations
- Canvas-based effects for performance
- CSS transforms for hardware acceleration

## Credits

- **Jujutsu Kaisen** © Gege Akutami
- Created with ❤️ and 💙
- Fan project for personal/educational use

## License

This is a fan project. Jujutsu Kaisen and all related characters are property of Gege Akutami and their respective copyright holders.

## Troubleshooting

### Site not loading on GitHub Pages

1. Check that GitHub Pages is enabled in repository settings
2. Ensure the `.nojekyll` file exists in the repository root
3. Wait a few minutes for deployment to complete
4. Clear browser cache and try again

### Buttons not working

1. Check browser console for JavaScript errors
2. Ensure JavaScript is enabled in your browser
3. Try on a different browser

### Particles not showing

1. Check if your browser supports Canvas API
2. Try disabling hardware acceleration in browser settings
3. Check browser console for errors

## Contributing

Feel free to fork and customize for your own Valentine's Day surprise!

---

Made with Gojo's Infinity ∞ and a whole lot of love 💙
