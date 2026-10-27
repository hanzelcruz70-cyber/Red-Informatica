@echo off
title Publicar RED INFORMATICA en Vercel
cd /d "%~dp0"
echo.
echo === Publicando RED INFORMATICA (proyecto red-informatica) ===
echo.
findstr /c:"\"projectName\":\"red-informatica\"" ".vercel\project.json" >nul
if errorlevel 1 (
  echo ERROR: esta carpeta no esta vinculada al proyecto red-informatica. No se publica nada.
  pause
  exit /b 1
)
call npx --yes vercel --prod --yes
echo.
echo === Terminado. Puedes cerrar esta ventana. ===
pause
