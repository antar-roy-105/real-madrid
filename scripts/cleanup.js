const fs = require('fs');
const path = require('path');

const files = [
  "src/app/page.tsx",
  "src/app/events-concerts/page.tsx",
  "src/app/tour/page.tsx",
  "src/app/vip-area/page.tsx",
  "src/app/restaurants/page.tsx",
  "src/app/corporate-events/page.tsx"
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');

  // Remove component imports
  content = content.replace(/import Header from "@\/components\/Header";\n?/g, "");
  content = content.replace(/import NavOverlay from "@\/components\/NavOverlay";\n?/g, "");
  content = content.replace(/import Footer from "@\/components\/Footer";\n?/g, "");

  // Remove state line
  content = content.replace(/ *const \[menuOpen, setMenuOpen\] = useState\(false\);\n?/g, "");

  // Remove components from JSX (handle varied spacing)
  content = content.replace(/ *<Header.*?\/>\n?/g, "");
  content = content.replace(/ *<NavOverlay.*?\/>\n?/g, "");
  content = content.replace(/ *<Footer \/>\n?/g, "");

  fs.writeFileSync(file, content);
  console.log(`Cleaned ${file}`);
});
