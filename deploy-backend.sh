#!/bin/bash

# Script de despliegue automático para Cloudflare Workers
# Este script despliega el backend de Gemini API

echo "🚀 Desplegando Mecánico IA - Backend Gemini API"
echo ""

# Verificar si wrangler está instalado
if ! command -v wrangler &> /dev/null
then
    echo "📦 Instalando Wrangler CLI..."
    npm install -g wrangler
fi

echo "🔐 Iniciando sesión en Cloudflare..."
wrangler login

echo "📤 Desplegando Worker..."
wrangler deploy

echo "🔑 Configurando API Key de Gemini..."
echo "AIzaSyDYqaJmsPvSQpaC-uR7RpUO-YiIGaO4S1w" | wrangler secret put GEMINI_API_KEY

echo ""
echo "✅ ¡Despliegue completado!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Copia la URL del Worker que aparece arriba"
echo "2. Abre app.js y reemplaza 'YOUR-SUBDOMAIN' con tu URL"
echo "3. Sube los cambios a GitHub"
echo ""
