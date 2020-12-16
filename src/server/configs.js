export const adminConfig = {
    credential: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    },
    databaseURL:process.env.DB_URL
};

export const firebaseConfig = {
    apiKey:process.env.NEXT_PUBLIC_API_KEY ,
    authDomain:process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL:process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket:process.env.NEXT_PUBLIC_STORAGE_BUCKET ,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};