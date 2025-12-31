# LombardiaEvents - La tua guida per il territorio

<table>
  <tr>
    <td width="110" valign="middle" align="center">
    <img
        src="eventFrontend/public/images/logo.png"
        alt="LombardiaEvents"
        width="110"
      />
    </td>
    <td>
      LombardiaEvents è un'applicazione web che permette di visualizzare gli
      <strong>eventi</strong> e le <strong>fiere</strong> presenti sul territorio lombardo,
      grazie al collegamento ad un servizio
      <em>open source</em> messo a disposizione dalla regione Lombardia.
    </td>
  </tr>
</table>
 

L'applicazione permette agli utenti di:  
🔒 Registrarsi e accedere al proprio _account personale_  
⚙️ _Gestire_ il proprio account personale per consultarne e modificarne le credenziali  
🔍 _Ricercare_ e _consultare_ gli eventi e le fiere programmate in Lombardia  
⭐ Salvare nei _preferiti_ gli eventi che più interessano  
🗺️ Consultare la _mappa_ per individuare il luogo dell'evento  
🎟️ Iscriversi all'evento ottenendo un _ticket virtuale_ presente nell'area personale  

## Tecnologie utilizzate

### Backend (Nest.js)
- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) Framework backend Node.js basato su TypeScrip
- ![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white) ORM per la gestione dei database relazionali
- ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) Database relazionale embedded
- **Axios** - Libreria JavaScript per effettuare richieste HTTP verso API esterne
- **Bcrypt** - Libreria per l’hashing sicuro delle password
- **OAuth2** - Protocollo che permette accedere in modo sicuro e senza password tramite provider esterni
  
### Frontend (Angular)
- ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) Framework per lo sviluppo di applicazioni web dinamiche in single-page application (SPA), con struttura modulare e supporto per componenti.  
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) Superset di JavaScript che aggiunge tipizzazione statica e aiuta a rendere il codice più robusto e manutenibile.  
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) Framework CSS per progettare interfacce responsive e comode da usare su dispositivi diversi (desktop, mobile, tablet), con classi predefinite per layout, componenti e stili.
- **SweetAlert2** – Libreria per mostrare finestre modali e notifiche grafiche in sostituzione del classico alert() di JavaScript.

## Avvio del progetto

### Esecuzione
```bash
# Clona la repository
git clone https://github.com/Anvo00/lombardiaEvents.git

# Nella cartella 'lombardiaEvents/event-backend' inserire il file .env (vedi sezione sottostante)

# Aprire il terminale nella cartella 'lombardiaEvents' e installare le varie dipendenze
npm run install:all

# Avviare il progetto da terminale nella cartella 'lombardiaEvents'
npm run startProject

-------

# Se si fa il login tramite "Google", occorre utilizzare la mail accademica
nome.cognome@studenti.unicam.it
nome.cognome@unicam.it
```

### File _.env_
```ini
#JWT CONFIGURATION
JWT_SECRET=14d26e2baccd35ee002538ba3b6144c80d724a536e9061e3b473a57362ca7295
JWT_EXPIRES_IN=5h

#DATABASE CONFIGURATION
DATABASE_NAME=lombardiaEventsDB.sqlite

#GENERAL
FRONTEND_PORT=4200
BACKEND_PORT=3000
FRONTEND_URL=http://localhost:4200
BACKEND_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=461196063896-hgifoium46jbtjq4qu25egcgr1nj8t10.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## Documentazione API
É stato utilizzato l'endpoint API messo a disposizione dalla regione Lombardia.  
L'API è documentata sul sito https://dev.socrata.com/foundry/www.dati.lombardia.it/hs8z-dcey

## Licenza
Questo progetto è concesso in licenza sotto la Licenza MIT (Vedi il file [LICENSE](LICENSE))

## Autori
Alessandra Antonacci - MAT. 122647 [Github](https://github.com/AlessAnto)  
Vito Giacobelli -  MAT. 123010 [Github](https://github.com/Anvo00)
