# Pokélog

**Pokélog** is a fan-made Pokémon web app designed for trainers, collectors, and fans! Dive into detailed Pokémon data, test your knowledge, track your progress, and showcase your journey with a customizable trainer card.

> ⚠️ This is a fan project and is not affiliated with Nintendo, Game Freak, or The Pokémon Company.

---

## 🌟 Features

- 🔎 **Browse & Filter Pokémon**
  - Full Pokédex list of all generations
  - Filter by type or generation, sort by number or name or simply search.
  
- 📄 **Detailed Pokémon Pages**
  - Stats, types, evolutions, abilities, base experience, height, weight, and more
  - **Toggle between default and shiny sprites with one click**

- 🎒 **Items & Moves**
  - Browse and search through in-game items and moves with descriptions and effects

- ❓ **Guess The Pokémon Game**
  - Fun quiz mode where you guess Pokémon silhouettes or descriptions

- 🧑‍🎓 **User Profile**
  - Customize your profile with:
    - Favorite Pokémon
    - Favorite type and trainer
    - Custom card backgrounds
    - Badge collection
    - Your personal Pokédex

- 📘 **Trainer Card Export**
  - Generate and export a personalized trainer card to share with friends

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- [Clerk](https://clerk.dev/) account if you're using Clerk for auth
- MongoDB key

### Installation
```bash
git clone https://github.com/StepanBlaha/Pokelog
cd Pokelog
```
#### Setup backend
```
cd backend 
npm install
# or
yarn install
```
#### Setup frontend
```
cd frontend 
npm install
# or
yarn install
```
#### Run backend
```
npm run dev
```
#### Run frontend
```
npm run start
```
### 🐳 Or use docker
#### Build the containers
```
docker-compose build
```
#### Run the containers
```
docker-compose up
```
#### Stop the containers
```
docker-compose down
```

## 🛠️ Tech Stack
- React
- Typescript
- Clerk (Authentication & User Management)
- React Router
- CSS Modules
- Chart.js
- MongoDB

## ⚙️ Configuration

### Frontend config
Change ```REACT_APP_CLERK_PUBLISHABLE_KEY``` for your own clerk key

### Backend config
Change ```MONGODB_URI``` for your own mongo db key

## ☁️ Deployment
- Frontent deployed at: [Pokelog frontend](https://pokelog-production-1f5e.up.railway.app)
- Backend deployed at: [Pokelog backend](https://pokelog-production.up.railway.app)

## 📸 Screenshots
<details>
  <summary>Click to expand</summary>
  <br>
  📱 **Pokédex list page** 
  <br>
  <br>
  <img src="Resources/pokedex.png" alt="Pokedex page" width="600"/>
  <br><br>
  📘 **Pokémon details page** 
  <br>
  <br>
  <img src="Resources/detail.png" alt="Detail page" width="600"/>
  <br><br>
  🧑 **Trainer profile with badge progress**  
  <br>
  <br>
  <img src="Resources/profile.png" alt="Profile page" width="600"/>
  <br><br>
  🎮 **Guess the Pokémon minigame**  
  <br>
  <br>
  <img src="Resources/guess.png" alt="Guess page" width="600"/>
</details>

## 🙌 Contributing
Contributions are welcome! Feel free to fork this project and submit a pull request.
To contribute:

- Fork the repo
- Create your branch: git checkout -b feature/your-feature-name
- ommit your changes: git commit -m "Add your feature"
- Push to the branch: git push origin feature/your-feature-name
- Open a pull request

## 📜 License
This project is open-source and available under the MIT License. See `LICENSE.txt` for more information. 

## 📫 Contact
Have questions, feedback, or want to contribute? Feel free to reach out!
- 🧑‍💻 Author: [StepanBlaha](https://stepanblaha.com)
- ✉️ Email: [stepa15.b@gmail.com](mailto:stepa15.b@gmail.com)
- 🐙 GitHub: [StepanBlaha](https://github.com/StepanBlaha)
- 🌐 Project Link: [https://github.com/StepanBlaha/Pokelog](https://github.com/StepanBlaha/Pokelog)
