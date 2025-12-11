# Gimcana Educativa: Normativa de Ciberseguretat

Aplicació Angular completa i funcional per a una gimcana educativa sobre normativa de ciberseguretat, delictes informàtics, compliance penal i corrupció.

## Característiques Principals

### Sistema de Joc
- **3 Nivells progressius**: Els Fonaments, Casos Complexos i Dilemes Reals
- **9 Qüestions** distribuïdes en els 3 nivells (3 per nivell)
- **Desafiament Final**: Auditoria flash amb cas pràctic de TechStart Solutions
- **Sistema de puntuació**: 100 punts per resposta correcta al primer intent, 50 punts amb pista
- **Pistes interactives**: Disponibles per a cada qüestió (redueixen la puntuació)

### Mode Docent
- Accés protegit amb contrasenya: `docent2024`
- Visualització de tots els equips i el seu progrés
- Consulta de totes les qüestions amb respostes correctes
- Possibilitat de reiniciar el joc
- Rànquing complet amb puntuacions i temps

### Funcionalitats
- Registre d'equips (3-4 membres)
- Progressió per nivells amb celebracions
- Rànquing amb podi per als 3 millors equips
- Persistència de dades amb LocalStorage
- Disseny responsive per a tablets i ordinadors
- Interfície en català
- Material Design amb animacions

## Tecnologies Utilitzades

- **Angular 17+** amb standalone components
- **Angular Material Design** per als components UI
- **TypeScript** per a la lògica de l'aplicació
- **SCSS** per als estils
- **LocalStorage** per a la persistència de dades (no requereix backend)

## Requisits Previs

- Node.js (versió 18 o superior)
- npm (versió 9 o superior)

## Instal·lació

1. Clona el repositori:
```bash
git clone https://github.com/xsastre/gimcana_ciber_1.git
cd gimcana_ciber_1
```

2. Instal·la les dependències:
```bash
npm install
```

## Execució

### Mode Desenvolupament

Per executar l'aplicació en mode desenvolupament:

```bash
npm start
```

O alternativament:

```bash
ng serve
```

L'aplicació estarà disponible a `http://localhost:4200/`

### Compilació per a Producció

Per compilar l'aplicació per a producció:

```bash
npm run build
```

Els fitxers compilats es generaran a la carpeta `dist/gimcana-app/`

## Ús de l'Aplicació

### Per als Equips (Mode Joc)

1. **Registre**: A la pantalla d'inici, fes clic a "Començar el Joc"
2. **Introdueix les dades de l'equip**: Nom de l'equip i membres (mínim 3, màxim 4)
3. **Respon les qüestions**: Selecciona la resposta correcta per a cada qüestió
4. **Utilitza pistes si cal**: Pots sol·licitar una pista (redueix els punts)
5. **Completa els 3 nivells**: Cada nivell té 3 qüestions
6. **Desafiament Final**: Respon l'auditoria flash per obtenir punts addicionals
7. **Consulta el rànquing**: Veure la puntuació final i comparar amb altres equips

### Per als Docents (Mode Docent)

1. **Accedeix al Mode Docent**: Fes clic a "Mode Docent" a la pantalla d'inici
2. **Introdueix la contrasenya**: `docent2024`
3. **Visualitza el progrés**: Consulta l'estat de tots els equips
4. **Consulta respostes**: Accedeix a totes les qüestions amb les respostes correctes
5. **Reinicia el joc**: Esborra totes les dades si cal començar de nou

## Estructura del Projecte

```
src/
├── app/
│   ├── components/
│   │   ├── home/                    # Pantalla d'inici
│   │   ├── team-registration/       # Registre d'equips
│   │   ├── game/                    # Wrapper del joc
│   │   ├── question/                # Component de qüestions
│   │   ├── level-complete/          # Celebració de nivell completat
│   │   ├── final-challenge/         # Desafiament final
│   │   ├── ranking/                 # Rànquing d'equips
│   │   └── teacher-mode/            # Mode docent
│   ├── services/
│   │   ├── game.service.ts          # Lògica del joc
│   │   ├── team.service.ts          # Gestió d'equips
│   │   └── storage.service.ts       # Persistència LocalStorage
│   ├── models/
│   │   ├── question.model.ts        # Model de qüestions
│   │   ├── team.model.ts            # Model d'equips
│   │   └── game-state.model.ts      # Model d'estat del joc
│   ├── data/
│   │   └── questions.data.ts        # Dades de les 9 qüestions
│   └── app.routes.ts                # Configuració de rutes
├── assets/                          # Recursos estàtics
└── styles/                          # Estils globals
```

## Contingut Educatiu

### Nivell 1: Els Fonaments
- Qüestió 1: Delictes informàtics bàsics
- Qüestió 2: Responsabilitat penal de les organitzacions
- Qüestió 3: Elements clau d'un sistema de compliance

### Nivell 2: Casos Complexos
- Qüestió 4: Delictes contra dades personals (RGPD)
- Qüestió 5: Sistema de denúncies i gestió d'incidents
- Qüestió 6: Suborn i corrupció (ISO 37001)

### Nivell 3: Dilemes Reals
- Qüestió 7: Contractació de personal i deguda diligència
- Qüestió 8: Resposta davant d'un incident
- Qüestió 9: Àrea de gris - Decisió ètica i legal

### Desafiament Final
Cas pràctic de **TechStart Solutions**: Auditoria de compliance penal amb 6 situacions problemàtiques que els equips han d'analitzar.

## Normatives Cobertes

- **Codi Penal Espanyol**: Delictes informàtics i responsabilitat penal
- **UNE 19601**: Sistemes de gestió de compliance penal
- **RGPD i LOPDGD**: Protecció de dades personals
- **ISO 37001**: Sistemes de gestió antisuborn

## Desenvolupament

### Executar tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Llicència

Aquest projecte està creat amb finalitats educatives.

## Autor

Xavier Sastre
