# ☕ BRÜST Cafe — React + MongoDB Full Stack App

A complete cafe management app with React frontend and Express + MongoDB backend.

---

## 📁 Project Structure

```
brust-cafe/           ← React Frontend (deploy to Vercel)
brust-cafe-server/    ← Express + MongoDB API (deploy to Render)
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- A free MongoDB Atlas account (mongodb.com/atlas)

---

### Step 1 — MongoDB Atlas Setup

1. Go to **https://www.mongodb.com/atlas** → Sign up free
2. Create a **free M0 cluster** (takes ~2 minutes)
3. Under **Security → Database Access** → Add a database user
   - Username: `brust_user`
   - Password: `YourSecurePassword123`
4. Under **Security → Network Access** → Add IP Address → **Allow access from anywhere** (0.0.0.0/0)
5. Under **Deployment → Database** → Connect → Drivers → Node.js
6. Copy your connection string:
   ```
   mongodb+srv://brust_user:YourPassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

### Step 2 — Start the Backend

```bash
cd brust-cafe-server

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env and paste your MongoDB connection string

# Start the server
npm run dev       # development (auto-restarts with nodemon)
# or
npm start         # production
```

The server starts at **http://localhost:5000**

Test it: open http://localhost:5000/api/health in your browser — you should see `{"status":"ok"}`

The menu will be **automatically seeded** with 8 default items on first run.

---

### Step 3 — Start the React Frontend

```bash
cd brust-cafe

# Install dependencies
npm install

# Create your .env.local file
cp .env.example .env.local
# The default value (http://localhost:5000/api) is correct for local dev

# Start React
npm start
```

React app opens at **http://localhost:3000**

---

## 🌐 Deploying to Production

### Deploy Backend → Render.com (free)

1. Push `brust-cafe-server/` to a GitHub repository
2. Go to **https://render.com** → New → Web Service
3. Connect your GitHub repo
4. Configure:
   - **Build command**: `npm install`
   - **Start command**: `node server.js`
   - **Environment**: Node
5. Add environment variables:
   - `MONGO_URI` = your Atlas connection string
   - `FRONTEND_URL` = your Vercel frontend URL (add after step below)
6. Click **Deploy** — your API will be at:
   `https://brust-cafe-server.onrender.com`

### Deploy Frontend → Vercel (free)

1. Push `brust-cafe/` to a GitHub repository
2. Go to **https://vercel.com** → New Project → Import your repo
3. Add environment variable:
   - `REACT_APP_API_URL` = `https://brust-cafe-server.onrender.com/api`
4. Click **Deploy** — your app will be live at:
   `https://brust-cafe.vercel.app`
5. Go back to Render → Update `FRONTEND_URL` to your Vercel URL

---

## 🗄️ API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | /api/health        | Server health check      |
| GET    | /api/menu          | Get all menu items       |
| POST   | /api/menu          | Add a new menu item      |
| PATCH  | /api/menu/:id      | Update a menu item       |
| DELETE | /api/menu/:id      | Delete a menu item       |
| GET    | /api/orders        | Get all orders           |
| POST   | /api/orders        | Place a new order        |
| PATCH  | /api/orders/:id    | Update order status      |
| GET    | /api/profile       | Get owner profile        |
| PUT    | /api/profile       | Update owner profile     |

### Example: Add a menu item
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{"name":"Espresso","desc":"Double shot","price":120,"emoji":"☕","cat":"coffee","pop":true}'
```

---

## 🗃️ MongoDB Schema

### MenuItem
```js
{ name, desc, price, emoji, cat, pop, createdAt, updatedAt }
```

### Order
```js
{ items, total, status, table, note, createdAt, updatedAt }
// status: 'active' | 'brewing' | 'ready' | 'served' | 'done'
```

### Profile
```js
{ name, email, phone, cafeName, location, openTime, closeTime }
```

---

## 🛠️ Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Frontend   | React 18, Context API |
| Styling    | CSS-in-JS (inline)  |
| Backend    | Express.js 4        |
| Database   | MongoDB Atlas       |
| ODM        | Mongoose 8          |
| Frontend hosting | Vercel        |
| Backend hosting  | Render.com    |

---

## 🔧 Troubleshooting

**CORS error in browser?**
→ Make sure `FRONTEND_URL` in your backend `.env` matches your React URL exactly (no trailing slash).

**MongoDB connection failed?**
→ Check your Atlas Network Access — add `0.0.0.0/0` to allow all IPs.

**Menu not loading in React?**
→ Check `REACT_APP_API_URL` in `.env.local` — must point to your running backend.

**Render backend sleeping?**
→ Free Render services sleep after 15min. First request after sleep takes ~30s. Upgrade to paid to keep it awake, or use a cron job to ping `/api/health` every 10 minutes.
