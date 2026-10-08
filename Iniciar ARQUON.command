#!/bin/bash
# Doble clic para levantar el sitio de ARQUON en tu navegador.
cd "$(dirname "$0")" || exit 1

# Carga nvm si existe (para usar la versión de Node correcta)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

if ! command -v node >/dev/null 2>&1; then
  echo "No encontré Node.js. Instálalo desde https://nodejs.org (versión 22 LTS) y vuelve a intentarlo."
  read -r -n 1 -p "Presiona una tecla para cerrar…"
  exit 1
fi

# Vite necesita Node 20.19+ o 22.12+
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
if [ "$NODE_MAJOR" -lt 20 ] && command -v nvm >/dev/null 2>&1; then
  echo "Tu Node es v$(node -v). Cambiando a Node 22 con nvm…"
  nvm install 22 >/dev/null && nvm use 22 >/dev/null
fi

if [ ! -d node_modules ]; then
  echo "Instalando dependencias (solo la primera vez)…"
  npm install || { read -r -n 1 -p "Falló la instalación. Presiona una tecla para cerrar…"; exit 1; }
fi

echo ""
echo "Levantando ARQUON en http://localhost:5173 — deja esta ventana abierta. Para detenerlo: Ctrl + C"
echo ""
npm run dev -- --open
