# --- 1. Aşama: Bağımlılıkları Yükleme ve Derleme ---
# Node.js'in LTS (Long-Term Support) versiyonunu temel imaj olarak kullanıyoruz.
# 'builder' olarak adlandırıyoruz.
FROM node:18-alpine AS builder

# Uygulama için çalışma dizini oluşturuyoruz.
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz.
# Bu dosyalar ayrı kopyalanırsa, her seferinde tüm bağımlılıklar yeniden yüklenmez.
COPY package*.json ./

# Proje bağımlılıklarını yüklüyoruz.
RUN npm install

# Proje kaynak kodunun tamamını kopyalıyoruz.
COPY . .

# Next.js uygulamasını derliyoruz (build).
RUN npm run build

# --- 2. Aşama: Üretim (Production) ---
# Daha küçük ve güvenli bir temel imajla başlıyoruz.
FROM node:18-alpine

WORKDIR /app

# Yalnızca gerekli olan bağımlılıkları (production dependencies) yüklüyoruz.
# Bu, imaj boyutunu önemli ölçüde küçültür.
COPY package*.json ./
RUN npm install --production

# Derlenmiş dosyaları 'builder' aşamasından kopyalıyoruz.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Uygulamayı çalıştırmak için port'u belirliyoruz.
EXPOSE 3000

# Uygulamayı başlatan komut.
CMD ["npm", "start"]