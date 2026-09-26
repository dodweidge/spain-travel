@echo off
setlocal
set "SPAIN_PREVIEW_NODE=node"
where node >nul 2>&1
if errorlevel 1 set "SPAIN_PREVIEW_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
"%SPAIN_PREVIEW_NODE%" "%~dp0tools\start-local.cjs" %*
if errorlevel 1 pause
