#!/bin/bash

# Script de build per a producció
# Aquest script verifica i prepara el build de l'aplicació Angular

echo "=========================================="
echo "  Build de Producció - Gimcana Educativa"
echo "=========================================="
echo ""

# Verificar que node_modules existeix
if [ ! -d "node_modules" ]; then
    echo "❌ No s'han trobat les dependències. Instal·lant..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error instal·lant dependències"
        exit 1
    fi
fi

echo "✓ Dependències verificades"
echo ""

# Netejar builds anteriors
echo "🧹 Netejant builds anteriors..."
rm -rf dist
echo "✓ Directori dist netejat"
echo ""

# Executar el build
echo "🔨 Compilant l'aplicació per a producció..."
npm run build

# Verificar que el build s'ha completat correctament
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completat amb èxit!"
    echo ""
    
    # Verificar que els fitxers s'han generat
    if [ -d "dist/gimcana-app/browser" ]; then
        echo "✓ Fitxers generats a: dist/gimcana-app/browser"
        
        # Mostrar mida del build
        BUILD_SIZE=$(du -sh dist/gimcana-app/browser | cut -f1)
        echo "✓ Mida del build: $BUILD_SIZE"
        echo ""
        
        echo "=========================================="
        echo "  Build llest per a desplegament!"
        echo "=========================================="
        echo ""
        echo "Opcions de desplegament:"
        echo "  1. Docker:        docker build -t gimcana-app ."
        echo "  2. Docker Compose: docker-compose up -d"
        echo "  3. Servidor web:  Copia dist/gimcana-app/browser"
        echo ""
        echo "Consulta DEPLOYMENT.md per a més informació"
        echo ""
    else
        echo "❌ Error: No s'han generat els fitxers de build"
        exit 1
    fi
else
    echo ""
    echo "❌ Error durant el build"
    exit 1
fi
