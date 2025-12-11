# Guia de Desplegament a Producció

Aquest document descriu com transpilar i desplegar l'aplicació Gimcana Educativa a producció.

## Taula de Continguts

1. [Transpilació (Build)](#transpilació-build)
2. [Desplegament amb Docker](#desplegament-amb-docker)
3. [Desplegament en Servidors Web](#desplegament-en-servidors-web)
4. [Desplegament en Serveis Cloud](#desplegament-en-serveis-cloud)
5. [Variables d'Entorn](#variables-dentorn)

---

## Transpilació (Build)

### Build per a Producció

Per transpilar l'aplicació Angular per a producció:

```bash
npm run build
```

Aquest comandament:
- Compila el TypeScript a JavaScript
- Optimitza i minifica el codi
- Genera els fitxers a la carpeta `dist/gimcana-app/`
- Aplica tree-shaking per eliminar codi no utilitzat
- Aplica hashing als fitxers per a cache busting

### Script de Build Automatitzat

Hem inclòs un script que verifica i prepara el build:

```bash
npm run build:prod
```

Aquest script:
1. Verifica que les dependències estiguin instal·lades
2. Neteja builds anteriors
3. Executa el build de producció
4. Verifica que els fitxers s'hagin generat correctament

### Verificar el Build Localment

Per provar el build localment abans de desplegar:

```bash
# Instal·lar un servidor HTTP simple
npm install -g http-server

# Servir els fitxers de build
cd dist/gimcana-app/browser
http-server -p 8080
```

Obre el navegador a `http://localhost:8080`

---

## Desplegament amb Docker

### Opció 1: Docker (Recomanat)

#### Construir la Imatge Docker

```bash
docker build -t gimcana-app:latest .
```

#### Executar el Contenidor

```bash
docker run -d -p 80:80 --name gimcana gimcana-app:latest
```

L'aplicació estarà disponible a `http://localhost`

#### Aturar el Contenidor

```bash
docker stop gimcana
docker rm gimcana
```

### Opció 2: Docker Compose (Més Fàcil)

#### Iniciar l'Aplicació

```bash
docker-compose up -d
```

#### Aturar l'Aplicació

```bash
docker-compose down
```

#### Veure els Logs

```bash
docker-compose logs -f
```

### Publicar la Imatge Docker

Per compartir la imatge Docker (per exemple, a Docker Hub):

```bash
# Etiquetar la imatge
docker tag gimcana-app:latest elteuresuari/gimcana-app:latest

# Pujar la imatge
docker push elteuresuari/gimcana-app:latest
```

---

## Desplegament en Servidors Web

### Nginx

1. **Build l'aplicació:**
   ```bash
   npm run build
   ```

2. **Copia els fitxers al servidor:**
   ```bash
   scp -r dist/gimcana-app/browser/* usuari@servidor:/var/www/gimcana
   ```

3. **Configura Nginx** (veure `nginx.conf` per a la configuració completa):
   ```nginx
   server {
       listen 80;
       server_name elteudomain.com;
       root /var/www/gimcana;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Reinicia Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

### Apache

1. **Build l'aplicació:**
   ```bash
   npm run build
   ```

2. **Copia els fitxers:**
   ```bash
   cp -r dist/gimcana-app/browser/* /var/www/html/gimcana/
   ```

3. **Crea `.htaccess`:**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## Desplegament en Serveis Cloud

### GitHub Pages

1. **Instal·la angular-cli-ghpages:**
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Build i desplega:**
   ```bash
   ng build --base-href /gimcana_ciber_1/
   npx angular-cli-ghpages --dir=dist/gimcana-app/browser
   ```

### Netlify

1. **Crea un fitxer `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist/gimcana-app/browser"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Desplega via CLI o interfície web:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Vercel

1. **Instal·la Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Desplega:**
   ```bash
   vercel --prod
   ```

### Firebase Hosting

1. **Instal·la Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicialitza Firebase:**
   ```bash
   firebase init hosting
   ```

3. **Configura:**
   - Public directory: `dist/gimcana-app/browser`
   - Configure as a single-page app: **Yes**
   - Set up automatic builds: **No**

4. **Desplega:**
   ```bash
   npm run build
   firebase deploy
   ```

### AWS S3 + CloudFront

1. **Build l'aplicació:**
   ```bash
   npm run build
   ```

2. **Crea un bucket S3:**
   ```bash
   aws s3 mb s3://gimcana-app
   ```

3. **Puja els fitxers:**
   ```bash
   aws s3 sync dist/gimcana-app/browser/ s3://gimcana-app --delete
   ```

4. **Configura com a web estàtic:**
   ```bash
   aws s3 website s3://gimcana-app/ --index-document index.html --error-document index.html
   ```

---

## Variables d'Entorn

Aquesta aplicació utilitza LocalStorage per a la persistència de dades i no requereix variables d'entorn de backend. Tanmateix, si vols personalitzar algunes opcions:

### Variables Opcionals

- `BASE_HREF`: El path base de l'aplicació (per defecte: `/`)
  ```bash
  ng build --base-href /gimcana/
  ```

---

## Checklist de Desplegament

Abans de desplegar a producció, verifica:

- [ ] El build es completa sense errors: `npm run build`
- [ ] L'aplicació funciona localment amb el build de producció
- [ ] Tots els assets (imatges, favicons) es carreguen correctament
- [ ] La navegació entre rutes funciona correctament
- [ ] El mode docent funciona amb la contrasenya correcta
- [ ] Els equips es poden registrar i jugar
- [ ] El rànquing mostra correctament les puntuacions
- [ ] La persistència de dades funciona (LocalStorage)
- [ ] L'aplicació és responsive (tablets i ordinadors)
- [ ] El servidor web està configurat per servir l'aplicació Angular (SPA)

---

## Monitorització i Manteniment

### Logs

Si uses Docker:
```bash
docker logs gimcana
```

Si uses Docker Compose:
```bash
docker-compose logs -f
```

### Actualitzacions

1. **Fes els canvis al codi**
2. **Build de nou:**
   ```bash
   npm run build
   ```
3. **Redesplega:**
   - Docker: Reconstrueix la imatge i reinicia el contenidor
   - Web server: Copia els nous fitxers
   - Cloud: Executa el comandament de deploy específic

### Backup

Les dades dels equips es guarden al LocalStorage del navegador. Per fer backup:

1. **Exporta les dades** des del mode docent (funcionalitat disponible a l'aplicació)
2. **Guarda els fitxers** de build a `dist/gimcana-app/`

---

## Suport

Per a problemes o preguntes:
- Consulta el README.md
- Revisa els logs del contenidor o servidor
- Verifica la configuració del servidor web
- Comprova que tots els fitxers s'hagin copiat correctament

---

## Seguretat

Recomanacions de seguretat per a producció:

1. **HTTPS**: Utilitza sempre HTTPS en producció
2. **Headers de seguretat**: Configura headers de seguretat al servidor web
3. **Actualitzacions**: Mantén les dependències actualitzades
4. **Contrasenya docent**: Considera canviar la contrasenya del mode docent

### Configuració HTTPS amb Let's Encrypt (Nginx)

```bash
# Instal·la Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obté el certificat
sudo certbot --nginx -d elteudomain.com

# Renovació automàtica
sudo certbot renew --dry-run
```
