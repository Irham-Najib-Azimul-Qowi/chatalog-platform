# Struktur Proyek Chatalog Platform

```
chatalog-platform/
│
├── 📁 public/
│   └── vite.svg
│
├── 📁 src/
│   ├── App.jsx                          # Main App component dengan routing
│   ├── main.jsx                         # Entry point aplikasi
│   ├── index.css                        # Global CSS styles
│   │
│   ├── 📁 assets/                       # Static assets (images, icons, dll)
│   │
│   ├── 📁 components/                   # Komponen React
│   │   │
│   │   ├── 📁 admin/                    # Komponen Admin Panel
│   │   │   ├── AdminBar.jsx             # Admin bar untuk admin biasa
│   │   │   ├── AdminBarSuperAdmin.jsx   # Admin bar untuk super admin
│   │   │   ├── AdminBarToko.jsx         # Admin bar untuk owner toko
│   │   │   │
│   │   │   └── 📁 modals/               # Modal components untuk admin
│   │   │       ├── BlogModal.jsx        # Modal kelola artikel blog
│   │   │       ├── GaleriModal.jsx      # Modal kelola galeri foto
│   │   │       ├── LokasiModal.jsx      # Modal kelola lokasi toko
│   │   │       ├── MitraModal.jsx       # Modal kelola mitra/partner
│   │   │       ├── ProdukModal.jsx      # Modal kelola produk
│   │   │       ├── ProfilModal.jsx      # Modal edit profil toko
│   │   │       ├── PromoModal.jsx       # Modal kelola promo/diskon
│   │   │       ├── SuperAdmin_ContentModal.jsx  # Modal kelola konten sistem (Super Admin)
│   │   │       ├── SuperAdmin_OrderModal.jsx    # Modal detail order (Super Admin)
│   │   │       ├── SuperAdmin_TokoModal.jsx      # Modal kelola toko (Super Admin)
│   │   │       ├── TampilanModal.jsx     # Modal pengaturan tampilan
│   │   │       ├── TestimoniModal.jsx    # Modal kelola testimoni pelanggan
│   │   │       └── UpsellModal.jsx      # Modal kelola upsell produk
│   │   │
│   │   ├── 📁 common/                    # Komponen umum yang reusable
│   │   │   ├── Button.jsx               # Button component dengan variant
│   │   │   ├── Logo.jsx                 # Logo component
│   │   │   ├── Modal.jsx                # Reusable modal component
│   │   │   └── Spinner.jsx              # Loading spinner component
│   │   │
│   │   ├── 📁 layout/                    # Komponen layout
│   │   │   ├── FooterChatalog.jsx       # Footer untuk halaman Chatalog
│   │   │   ├── FooterToko.jsx           # Footer untuk halaman toko
│   │   │   ├── NavbarChatalog.jsx       # Navbar untuk halaman Chatalog
│   │   │   └── NavbarToko.jsx           # Navbar untuk halaman toko
│   │   │
│   │   └── 📁 toko_template/             # Komponen template untuk toko klien
│   │       ├── CartModal.jsx            # Modal keranjang belanja
│   │       ├── CheckoutModal.jsx        # Modal proses checkout
│   │       ├── HeroSection.jsx          # Hero section untuk halaman toko
│   │       ├── LokasiSection.jsx         # Section lokasi toko
│   │       ├── MitraSection.jsx         # Section mitra/partner
│   │       ├── ProductCard.jsx          # Card komponen produk
│   │       ├── PromoBanner.jsx          # Banner promo
│   │       └── TestimoniSection.jsx     # Section testimoni pelanggan
│   │
│   ├── 📁 contexts/                      # React Context untuk state management
│   │   ├── AuthContext.jsx              # Context untuk autentikasi
│   │   └── TokoContext.jsx              # Context untuk data toko
│   │
│   ├── 📁 hooks/                         # Custom React Hooks
│   │   ├── useAuth.js                   # Hook untuk autentikasi
│   │   └── useToko.js                   # Hook untuk data toko
│   │
│   ├── 📁 pages/                         # Halaman aplikasi
│   │   │
│   │   ├── 📁 chatalog/                  # Halaman untuk web utama "Chatalog"
│   │   │   ├── AboutPage.jsx            # Halaman Tentang
│   │   │   ├── ContactPage.jsx          # Halaman Kontak
│   │   │   ├── HomePageChatalog.jsx     # Halaman Beranda Chatalog
│   │   │   ├── LoginPage.jsx            # Halaman Login
│   │   │   ├── RegisterPage.jsx         # Halaman Registrasi/Onboarding
│   │   │   └── SimulatorPage.jsx        # Halaman Simulator
│   │   │
│   │   ├── 📁 toko/                      # Halaman template untuk toko klien
│   │   │   ├── TokoAboutPage.jsx        # Halaman tentang toko
│   │   │   ├── TokoBlogPage.jsx         # Halaman blog toko
│   │   │   ├── TokoContactPage.jsx       # Halaman kontak toko
│   │   │   ├── TokoGaleriPage.jsx       # Halaman galeri foto toko
│   │   │   ├── TokoHomepage.jsx         # Halaman beranda toko
│   │   │   ├── TokoLokasiPage.jsx       # Halaman lokasi toko
│   │   │   ├── TokoProdukPage.jsx       # Halaman produk toko
│   │   │   └── TokoRenderer.jsx         # Renderer untuk halaman toko (handle routing)
│   │   │
│   │   └── NotFoundPage.jsx              # Halaman 404 Not Found
│   │
│   ├── 📁 services/                      # Service layer untuk API/External services
│   │   ├── cloudinary.js                # Service untuk Cloudinary (image upload)
│   │   ├── firebase.js                  # Konfigurasi Firebase (Auth, Firestore)
│   │   └── firebaseFunctions.js         # Service untuk Firebase Cloud Functions
│   │
│   └── 📁 utils/                         # Utility functions
│       └── helpers.js                   # Helper functions (formatting, validation, dll)
│
├── 📁 node_modules/                      # Dependencies (dihasilkan oleh npm)
│
├── 📄 Configuration Files:
│   ├── .gitignore                       # Git ignore rules
│   ├── eslint.config.js                 # ESLint configuration
│   ├── index.html                       # HTML template
│   ├── package.json                     # Dependencies dan scripts
│   ├── package-lock.json                # Lock file untuk dependencies
│   ├── postcss.config.js                # PostCSS configuration
│   ├── tailwind.config.js               # Tailwind CSS configuration
│   ├── vite.config.js                   # Vite build configuration
│   └── README.md                        # Dokumentasi proyek
│
└── PROJECT_STRUCTURE.md                 # Dokumentasi struktur proyek
```

## Keterangan Struktur

### 📁 Root Directory
- **Configuration files**: File konfigurasi untuk build tools (Vite, ESLint, Tailwind, PostCSS)
- **package.json**: Daftar dependencies dan scripts npm

### 📁 src/
- **Entry points**: `main.jsx` dan `App.jsx` - titik masuk aplikasi
- **Components**: Semua komponen React diorganisir berdasarkan fungsi
- **Pages**: Halaman aplikasi yang di-render oleh React Router
- **Contexts**: State management global dengan React Context
- **Hooks**: Custom hooks untuk logic yang reusable
- **Services**: Layer untuk berkomunikasi dengan API/external services
- **Utils**: Fungsi helper dan utilities

### 📁 components/
- **admin/**: Komponen khusus untuk admin panel
  - Admin bar untuk berbagai role (admin, super admin, toko owner)
  - Modal-modal untuk CRUD operations:
    - Blog, Galeri, Lokasi, Mitra, Produk, Profil, Promo
    - Testimoni, Upsell
    - Super Admin: Content, Order, Toko
- **common/**: Komponen umum yang bisa digunakan di mana saja
- **layout/**: Komponen layout (navbar, footer) untuk berbagai halaman
- **toko_template/**: Komponen khusus untuk template halaman toko klien
  - Section components: Hero, Lokasi, Mitra, Promo, Testimoni
  - Modal components: Cart, Checkout
  - Card component: ProductCard

### 📁 pages/
- **chatalog/**: Halaman untuk web utama/platform
  - HomePage, AboutPage, ContactPage, LoginPage, RegisterPage, SimulatorPage
- **toko/**: Halaman template yang di-render untuk toko klien
  - `TokoRenderer.jsx` menangani routing berdasarkan slug toko
  - Halaman: Homepage, About, Blog, Contact, Galeri, Lokasi, Produk

### 📁 services/
- Integrasi dengan Firebase (Auth, Firestore, Functions)
- Integrasi dengan Cloudinary untuk image management

### Technology Stack
- **React 19** - UI Framework
- **React Router DOM 7** - Routing
- **Firebase 12** - Backend (Auth, Database, Functions)
- **Vite 7** - Build tool
- **Tailwind CSS 3** - Styling
- **Axios** - HTTP client

