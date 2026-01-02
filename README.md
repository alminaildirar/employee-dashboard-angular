# 🧩 Employee Dashboard

Projede, standalone components, signals, RxJS ve Angular rputes(guards + resolvers) birlikte kullanarak async veri akısı yönetilmiştir. Employee management ve activity feed sayfalarında hem Template-driven forms hem de reactive forms kullanılarak farklı form yaklaşımları, custom directives/pipes ve state yönetimi uygulanmıştır.

---

## 🧱 Kullanılan Teknolojiler

- **Angular 19**
- **Standalone Components**
- **Angular Signals**
- **RxJS**
- **Angular Router (Guards & Resolvers)**
- **Reactive Forms & Template-driven Forms**
- **Custom Directives & Pipes**
- **Mock API (HttpInterceptor)**
- **SCSS + CSS Variables**
- **Vite Dev Server**

---

## 📂 Proje Yapısı (Özet)

```txt
src/
├─ app/
│  ├─ core/
│  │  ├─ guards/
│  │  ├─ http/
│  │  └─ services/
│  ├─ features/
│  │  ├─ employees/
│  │  ├─ activity/
│  │  ├─ dashboard/
│  │  └─ settings/
│  ├─ shared/
│  │  ├─ directives/
│  │  ├─ pipes/
│  │  └─ ui/
│  └─ app.routes.ts
└─ styles.scss
```

## ✨ Özellikler

### 🔐 Authentication & Routing

- `CanActivateChild` ile protected sayfalar
- `CanMatch` ile guest-only route (login)
- Route Resolver kullanımı
- Guard’lar ile yetkilendirme ve navigasyon kontrolü

---

### 👥 Employees Management

- Employee listeleme
- Detay görüntüleme
- **Create / Edit / Delete** işlemleri
- Route parametreleri ile dinamik sayfalar
- Resolver ile detay datasını sayfa açılmadan önce alma

---

### 📝 Forms (Template-driven & Reactive)

- **Template-driven Forms**
  - Input ve two-way binding
- **Reactive Forms**
  - Typed `FormGroup` ve `FormControl` kullanımı
  - Sync validation (required, minLength vb.)
  - Async validation (email availability kontrolü)
  - Form state yönetimi (`dirty`, `touched`, `valid`)
- Edit sayfasında **unsaved changes** kontrolü (CanDeactivate Guard)

---

### 📡 Async Veri Akışı (Signals & RxJS)

- Signal tabanlı state yönetimi
- Derived state (`computed`) kullanımı
- Search / filter / sort işlemleri **signals** ile
- Debounced search input
- Observable ↔ Signal dönüşümü (`toSignal`, `toObservable`)
- RxJS operator’ları (`map`, `combineLatest`, `scan`, `shareReplay`)

---

### 📰 Activity Feed (RxJS Demo Feature)

- RxJS ile canlı veri akışı (timer)
- Event stream mantığı
- UI filtreleri (signal) + data stream (observable)
- Observable → ViewModel → Signal yaklaşımı

---

### 🧩 Custom Directives

- `appHighlightOnHover` → hover davranışı
- `appAutofocus` → input focus yönetimi
- UI davranışlarını component logic’inden ayırma

---

### 🧪 Custom Pipes

- `initials` → isimden avatar harfi üretme
- `statusLabel` → status gösterimi
- Pure pipe kullanımı (presentation logic)

---

### 🧪 Mock API

- HttpInterceptor ile mock backend
- GET / POST / PUT / DELETE endpoint’leri
- Async validation için fake API senaryoları
