const fs = require('fs');
const path = require('path');

const sharedDir = path.join('src', 'components', 'shared');
const inicioDir = path.join('src', 'pages', 'inicio');
const inicioCompDir = path.join(inicioDir, 'components');

fs.mkdirSync(sharedDir, { recursive: true });
fs.mkdirSync(inicioCompDir, { recursive: true });

const sharedComps = ['Navbar.jsx', 'Footer.jsx'];
const inicioComps = [
  'SeccionHero.jsx', 'LineaAyuda.jsx', 'NuestrosAlcances.jsx',
  'NuestroTrabajo.jsx', 'ProgramasPrioritarios.jsx', 'TarjetaEstadistica.jsx',
  'TarjetaEvento.jsx', 'TarjetaNoticia.jsx', 'TarjetaPrograma.jsx', 'TarjetaTestimonio.jsx'
];

sharedComps.forEach(f => {
  const oldPath = path.join('src', 'components', f);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, path.join(sharedDir, f));
  }
});

inicioComps.forEach(f => {
  const oldPath = path.join('src', 'components', f);
  if (fs.existsSync(oldPath)) {
    const newPath = path.join(inicioCompDir, f);
    fs.renameSync(oldPath, newPath);
    // Update data import
    let content = fs.readFileSync(newPath, 'utf8');
    content = content.replace(/from\s+['"]\.\.\/data\/inicio\.json['"]/g, 'from \'../../../data/inicio.json\'');
    fs.writeFileSync(newPath, content);
  }
});
