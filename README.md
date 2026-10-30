# LIFEVERSE 3D — School Competition Starter

Developed and Designed by **Daheri Shahwaiz**

A responsive, futuristic educational website concept covering human body systems, common diseases, animals, fish, dinosaurs, fantasy creatures, creature comparisons and a science quiz.

## Included
- Responsive dark futuristic interface inspired by the reference moodboards.
- Six interactive world/category cards.
- Disease topic search and filters, with causes/risk factors, symptoms, prevention and care notes.
- Creature comparison panel.
- Five-question interactive quiz.
- Admin dashboard demo with local visitor counters, recent local log, export, settings and logout.
- Attribution text in the footer.

## Run it
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For best results, serve the folder locally (for example with VS Code Live Server) or upload the files to GitHub Pages.

No build step or paid API is required. Google Fonts load from the internet; system fallbacks are included.

## Demo admin login
- Username: `admin`
- Password: `LifeVerse@2026`

Open **Admin Dashboard** in the top-right. Change the demo password under Settings.

## Important limits (please read)
- The dashboard's visitor counters use browser `localStorage`. They count page loads only in the same browser/device. They are **not real global analytics** and cannot count visitors across devices.
- The admin login is client-side demo logic, not secure authentication. Do not use it to protect real private data. For a public deployment, use a backend authentication provider and database-backed analytics.
- This starter includes interactive educational category pages and emoji-based visual placeholders; it does **not yet include actual rotatable 3D anatomy assets**. To add real 3D views, place properly licensed `.glb`/`.gltf` models in an assets folder and connect them to Three.js or `<model-viewer>`. Each model needs to include the anatomy layers you want to show. Do not imply a model contains organs that are not actually in that model.
- Disease information is general education, not medical advice or diagnosis. Medical information should be reviewed against reliable clinical sources before presenting as authoritative.
- Dinosaurs are reconstructed from fossil evidence and some details are estimates. Dragons are fictional and clearly labelled as fantasy.
- The project is a front-end starter. Real user accounts, cross-device analytics, cloud settings, and a shared leaderboard require backend services.

## Main files
- `index.html` — page structure
- `css/style.css` — visual design and responsive styles
- `js/data.js` — editable world, disease, creature and quiz content
- `js/app.js` — interactions, comparison, quiz and demo admin panel

## Free deployment
You can host this static front-end on GitHub Pages. Ensure all files are committed to the repository and that `index.html` is at the published root. Static hosting will not make the demo admin login secure or turn local counters into global analytics.


## Firebase setup

The Firebase web SDK and the provided project configuration are loaded by `index.html`
through `js/firebase-config.js`. After the page loads, the initialized Firebase objects
are available as `window.lifeVerseFirebase.app`, `.auth`, and `.db`.

**Important:** the existing Admin Dashboard is still a local demo. Its login and visitor
analytics use this browser's `localStorage`; they are not yet connected to Firebase
Authentication or Firestore. Do not treat the demo login as secure for a public site.

In Firebase Console:
1. Enable the sign-in provider you intend to use under Authentication.
2. Create a Firestore database.
3. Set Firestore Rules to allow only authenticated, authorized users. Do not publish
   permissive rules such as `allow read, write: if true`.
4. For a real admin dashboard/global visitor counter, update the app logic and rules
   together. Never put a service-account/private server key in browser code.

The Firebase web API key is normally public configuration; database security comes from
Authentication, Firestore Rules, and (where needed) server-side validation.
