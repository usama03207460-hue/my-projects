@echo off

taskkill /F /IM node.exe >nul 2>&1

start cmd /k "cd /d C:\Users\umerraffay\Documents\my-react-project\my-app && npm run dev"

timeout /t 8 >nul

start cmd /k "cd /d D:\ngrok && ngrok.exe http 5174"

timeout /t 5 >nul

start http://localhost:5174

exit