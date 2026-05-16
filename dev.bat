@echo off

start cmd /k "cd /d C:\Users\umerraffay\Documents\my-react-project && npm run dev -- --host 0.0.0.0 --port 5174"

timeout /t 5 >nul

start cmd /k "cd /d C:\ngrok && ngrok.exe http 5174"

timeout /t 5 >nul

start http://localhost:5174

exit
