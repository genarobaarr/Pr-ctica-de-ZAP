Laboratorio de Aspectos de Seguridad para el Desarrollo de Software con OWASP ZAP
Este repositorio contiene el código fuente de una aplicación web (Node.js/Express + SQLite) construida para demostrar vulnerabilidades comunes (Inyección SQL y XSS) y sus mitigaciones.

# Estructura del Proyecto

        zap-lab/
        ├─ app.js            # Servidor Express (contiene rutas vulnerables y corregidas)
        ├─ db.js             # Script de conexión a SQLite
        ├─ seed.sql          # Esquema y datos iniciales de la base de datos (tabla 'users')
        ├─ package.json      # Dependencias (express, sqlite3, ejs, dotenv, helmet)
        └─ views/
            ├─ index.ejs     # Página principal
            ├─ echo.ejs     # Página de echo
            └─ users.ejs     # Vista de usuarios

# Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

    - Node.js (versión LTS recomendada)
    - Editor (VS Code recomendado).
    - npm (incluido con Node.js)
    - OWASP ZAP (para el escaneo de seguridad)
    - Navegador (Firefox recomendado para integración con ZAP).
    - Conocimientos básicos de terminal (bash / cmd).

# Instrucciones de Ejecución (Setup)

Sigue estos pasos para instalar y poner en marcha la aplicación:

    Paso 1: Clonar e Instalar Dependencias
        1.1 Abre la terminal en la carpeta donde deseas guardar el proyecto y ejecuta:

        1.2 Clonar el repositorio

                git clone https://github.com/genarobaarr/Pr-ctica-de-ZAP.git
                cd zap-lab

        1.3 Instalar todas las dependencias (Express, EJS, SQLite3, Helmet, etc.)

                npm install

    Paso 2: Iniciar la Aplicación
        2.1 El servidor se inicia con el siguiente comando:

                node app.js

        2.2 Si la ejecución es exitosa, verás el mensaje:

                App ejecutándose en http://localhost:3000

        2.3 Puedes verificar el funcionamiento base abriendo http://localhost:3000 en tu navegador.

# Proceso de Escaneo y Verificación con ZAP

El flujo de trabajo con OWASP ZAP se divide en dos fases:

    Fase 1: Escaneo Inicial (Código Vulnerable)
        1.1 Abre OWASP ZAP.

        1.2 Ve a Quick Start (Inicio Rápido) → Manual Explore (Exploración Manual).

        1.3 Establece la URL objetivo: http://localhost:3000.

        1.4 ZAP te indicará cómo configurar tu navegador para usar el proxy (localhost:8080).

        1.5 Exploración Manual: Navega manualmente por las siguientes rutas para que ZAP capture la estructura:

                http://localhost:3000/

                http://localhost:3000/users?name=Al

                http://localhost:3000/echo?msg=Test

        1.6 Escaneo Activo: En el panel Sites (Sitios) de ZAP, haz clic derecho en http://localhost:3000 → Attack (Atacar) → Active Scan (Escaneo Activo).

        1.7 Analizar: Espera a que termine el escaneo y revisa el panel Alerts (Alertas) para registrar los 7 hallazgos iniciales (SQLi, XSS, Cabeceras faltantes).

    Fase 2: Verificación (Código Mitigado)
        2.1 Asegúrate de que app.js contenga las mitigaciones:

                Ruta /users con consultas parametrizadas.

                Ruta /echo con res.render('echo') y views/echo.ejs.

                app.use(helmet()); incluido.

        2.2 Reinicia la App: Detén el servidor (Ctrl + C) y vuelve a iniciarlo con node app.js.

        2.3 Repite el Escaneo Activo: Repite el paso 6 de la Fase 1.

        2.4 Verificar: Comprueba que las alertas críticas y de riesgo medio (SQLi, XSS, Cabeceras) hayan desaparecido, quedando solo las alertas de ajuste fino de CSP.