::Zips the dll into the correct directory structure for release
::Make sure to increment the version

set version=0.1
set zip_name=CardDataDetector

IF EXIST "./client/build/manifest.json" "%ProgramFiles%\7-Zip\7z.exe" a -tzip "%HOMEPATH%/downloads/%zip_name% v%version%.zip" "./client/build/*" -mx0

start %HOMEPATH%/downloads