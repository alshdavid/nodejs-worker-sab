set windows-shell := ["pwsh", "-NoLogo", "-NoProfileLoadTime", "-Command"]

run TARGET:
  node  --experimental-strip-types --disable-warning=ExperimentalWarning cases/{{TARGET}}/index.mts

watch TARGET:
  node --watch --experimental-strip-types --disable-warning=ExperimentalWarning cases/{{TARGET}}/index.mts
