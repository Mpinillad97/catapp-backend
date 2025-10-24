# CatApp Backend (Node/Express + MongoDB)

API REST con Node.js + Express + MongoDB (Mongoose). Arquitectura limpia (capas: controllers, application/use-cases, domain, infrastructure).  
Controladores:
- **Gatos**: `/api/breeds`, `/api/breeds/:id`, `/api/breeds/search`
- **Imágenes**: `/api/imagesbybreedid?breed_id=...&limit=...`
- **Usuarios**: `/api/register`, `/api/login`, `/api/me` (JWT)

## Requisitos
- Node 20+
- MongoDB (local o Atlas)
- Docker (opcional)

## Variables de entorno
Crea un archivo `.env` (no se versiona). Usa este **.env.example**:

```env
PORT=3000
CAT_API_URL=https://api.thecatapi.com/v1
CAT_API_KEY=TU_API_KEY_DE_THECATAPI
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/catapp?retryWrites=true&w=majority
JWT_SECRET=una_clave_secreta_segura