# Guia Ràpida de Desplegament

Aquesta guia et mostra les maneres més ràpides i senzilles de desplegar la Gimcana Educativa a producció.

## 🚀 Opció 1: Docker (Recomanada) - 2 minuts

La manera més fàcil i ràpida de desplegar l'aplicació:

```bash
# Només cal executar:
docker-compose up -d
```

✅ L'aplicació estarà disponible a http://localhost

### Comandes útils:
```bash
# Aturar l'aplicació
docker-compose down

# Veure els logs
docker-compose logs -f

# Reconstruir després de fer canvis
docker-compose up -d --build
```

## 🌐 Opció 2: Netlify - 1 minut

La manera més ràpida per tenir l'aplicació en línia:

1. **Connecta el teu repositori a Netlify:**
   - Ves a https://app.netlify.com
   - Fes clic a "Add new site" → "Import an existing project"
   - Selecciona el teu repositori GitHub

2. **Netlify detecta automàticament la configuració** (ja inclosa a `netlify.toml`)

3. **Deploy!** - L'aplicació estarà en línia en menys d'1 minut

🎉 Netlify et donarà una URL com: `https://gimcana-educativa.netlify.app`

## ☁️ Opció 3: Vercel - 1 minut

Igual de ràpid que Netlify:

```bash
# Instal·la Vercel CLI
npm install -g vercel

# Deploy amb un sol comandament
vercel --prod
```

Segueix les instruccions interactives i ja està!

## 🔥 Opció 4: Firebase Hosting - 3 minuts

```bash
# 1. Instal·la Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicialitza (només la primera vegada)
firebase init hosting

# 4. Build i deploy
npm run build
firebase deploy
```

## 📦 Opció 5: GitHub Pages - 5 minuts

```bash
# 1. Instal·la la eina
npm install -g angular-cli-ghpages

# 2. Build amb base-href
ng build --base-href /gimcana_ciber_1/

# 3. Deploy
npx angular-cli-ghpages --dir=dist/gimcana-app/browser
```

L'aplicació estarà a: `https://[el-teu-usuari].github.io/gimcana_ciber_1/`

## 🖥️ Opció 6: Servidor Web Propi

### Nginx (Linux)

```bash
# 1. Build l'aplicació
npm run build:prod

# 2. Copia els fitxers al servidor
sudo cp -r dist/gimcana-app/browser/* /var/www/html/gimcana/

# 3. Utilitza la configuració nginx.conf inclosa
sudo cp nginx.conf /etc/nginx/sites-available/gimcana
sudo ln -s /etc/nginx/sites-available/gimcana /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache (Linux)

```bash
# 1. Build l'aplicació
npm run build:prod

# 2. Copia els fitxers
sudo cp -r dist/gimcana-app/browser/* /var/www/html/gimcana/

# 3. Crea .htaccess
cat > /var/www/html/gimcana/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF

# 4. Reinicia Apache
sudo systemctl reload apache2
```

## 📋 Checklist abans de desplegar

- [ ] Executa `npm run build:prod` sense errors
- [ ] Verifica que la carpeta `dist/gimcana-app/browser` s'ha creat
- [ ] Comprova la mida del build (hauria de ser ~1MB)
- [ ] (Opcional) Prova el build localment amb `http-server dist/gimcana-app/browser`

## 🆘 Problemes comuns

### Error: "Cannot find module @angular/..."
**Solució:** `npm install`

### Build falla
**Solució:** `rm -rf node_modules dist && npm install && npm run build`

### L'aplicació no carrega (pàgina en blanc)
**Solució:** Comprova la consola del navegador i verifica que el servidor web està configurat per servir una SPA (veure nginx.conf o .htaccess)

### Rutes no funcionen (404)
**Solució:** El servidor web necessita redirigir totes les rutes a index.html (configuració SPA)

## 📖 Més informació

Per a opcions avançades, configuració de seguretat, HTTPS, i més detalls, consulta:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guia completa de desplegament
- [README.md](README.md) - Documentació de l'aplicació

## 🎯 Recomanació per començar

**Si ets nou en desplegament web:** Utilitza Netlify o Vercel (opcions 2 o 3)
**Si vols control total:** Utilitza Docker (opció 1)
**Si tens un servidor propi:** Utilitza Nginx o Apache (opció 6)
