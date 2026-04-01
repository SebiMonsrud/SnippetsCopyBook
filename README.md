# SnippetsCopyBook 📚

SnippetsCopyBook er en desktop-applikasjon bygget med **Electron** som lar deg organisere, lagre og raskt kopiere kodesnutter (snippets). Perfekt for utviklere som vil ha sine mest brukte funksjoner lett tilgjengelig.

## ✨ Funksjoner
* **Enkel organisering:** Lagre kodesnutter lokalt på din maskin.
* **Rask kopiering:** Grensesnitt designet for hurtig tilgang.
* **Lokal lagring:** All data lagres trygt på din egen PC (User Data-mappen).

## 🚀 Kom i gang (Utvikling)

For å kjøre dette prosjektet lokalt, må du ha [Node.js](https://nodejs.org/) installert på din Mac eller PC.

1. **Klon repoet:**
   ```bash
   git clone [https://github.com/SebiMonsrud/SnippetsCopyBook.git](https://github.com/SebiMonsrud/SnippetsCopyBook.git)
   cd SnippetsCopyBook
Installer avhengigheter:

Bash
npm install
Start appen:

Bash
npm start
📦 Bygging og Distribuering
Prosjektet bruker Electron Forge for å lage installerbare filer.

For Mac (.dmg eller .zip):
Bash
npm run make
For Windows (.exe):
For å generere en fungerende Windows-installer, anbefales det å kjøre følgende kommando på en Windows-maskin:

Bash
npm run make
Installasjonsfilene vil havne i mappen /out/make.

📂 Prosjektstruktur
main.js - Electron main process (håndterer vinduer og system-tilgang).

index.html - Brukergrensesnittet.

renderer.js - Logikk for frontend og interaksjon.

style.css - Design og styling av appen.

🛠 Teknologier
Electron

Node.js

Electron Forge

Laget av SebiMonsrud
