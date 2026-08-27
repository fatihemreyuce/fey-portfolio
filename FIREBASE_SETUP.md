# Firebase kurulumu

1. Firebase Console'da bir proje oluşturun ve **Firestore Database** bölümünden Production mode ile veritabanını etkinleştirin.
2. Project settings > Service accounts altında yeni bir private key üretin.
3. Bu değerleri yerel `.env.local` dosyanıza ekleyin:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

İletişim formu kayıtları `contactMessages` koleksiyonuna; ad, e-posta, konu, mesaj, oluşturulma zamanı ve `new` durumuyla yazılır. Bu anahtarlar yalnızca sunucuda kullanılır; `NEXT_PUBLIC_` öneki eklemeyin.
