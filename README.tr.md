# Konum Uygulaması (ReactJS & Next.js)

📄 Mevcuttur: [English](README.md) | [Türkçe](README.tr.md)

Bu proje, kullanıcıların harita üzerinde konum eklemesine, düzenlemesine, silmesine ve bu konumlara göre en kısa rotayı çizmesine olanak tanıyan bir web uygulamasıdır. Uygulama, Next.js, React, Chakra UI ve Leaflet gibi modern web teknolojileri kullanılarak geliştirilmiştir.

**[Canlı Demo](https://location-app-react-js.vercel.app/)**

## Özellikler

- **Konum Ekleme**: Haritaya tıklayarak veya arama yaparak yeni konumlar ekleyebilirsiniz. Her konuma özel bir isim ve renk atayabilirsiniz.
- **Konum Listeleme**: Eklenen tüm konumları bir liste halinde görüntüleyebilirsiniz.
- **Konum Düzenleme**: Mevcut konumların adını, rengini ve haritadaki yerini güncelleyebilirsiniz.
- **Konum Silme**: İstediğiniz konumları listeden silebilirsiniz.
- **Rota Çizimi**: Mevcut konumunuzdan başlayarak, kayıtlı tüm konumlara en kısa rotayı harita üzerinde çizebilirsiniz.
- **Veri Kalıcılığı**: Eklenen konumlar tarayıcının yerel depolama alanında (localStorage) saklanır, böylece sayfa yenilendiğinde veriler kaybolmaz.

## Kullanılan Teknolojiler

- **Next.js**: Sunucu tarafında render ve statik site oluşturma yetenekleri sunan bir React framework'ü.
- **React**: Kullanıcı arayüzü oluşturmak için kullanılan bir JavaScript kütüphanesi.
- **Chakra UI**: Hızlı ve erişilebilir React uygulamaları oluşturmak için modüler bir bileşen kütüphanesi.
- **Leaflet**: Etkileşimli haritalar oluşturmak için açık kaynaklı bir JavaScript kütüphanesi.
- **Zustand**: Küçük, hızlı ve ölçeklenebilir bir state management (durum yönetimi) çözümü.
- **TypeScript**: JavaScript'e statik tipler ekleyen bir dil.
- **Jest & React Testing Library**: Uygulama testleri için kullanılan araçlar.

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın:**

    ```bash
    git clone [https://github.com/yunuscanunal/locationapp_reactjs.git](https://github.com/yunuscanunal/locationapp_reactjs.git)
    cd locationapp_reactjs
    ```

2.  **Bağımlılıkları Yükleyin:**

    ```bash
    npm install
    ```

3.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
    Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## Mevcut Scriptler

- `npm run dev`: Geliştirme modunda uygulamayı başlatır.
- `npm run build`: Uygulamayı production için build eder.
- `npm run start`: Production build'ini çalıştırır.
- `npm run lint`: Kod stilini ve olası hataları kontrol eder.
- `npm run test`: Testleri interaktif modda çalıştırır.
- `npm run test:ci`: CI/CD ortamları için testleri çalıştırır.

## Testler

Proje, bileşenlerin ve fonksiyonların doğru çalıştığından emin olmak için Jest ve React Testing Library kullanılarak test edilmektedir. Testleri çalıştırmak için:

```bash
npm test
```
