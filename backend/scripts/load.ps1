param(
  [string]$Base = "http://localhost:5000",
  [int]$Rounds = 200
)

function Hit($Method, $Path, $Body = $null) {
  try {
    if ($Body) {
      Invoke-WebRequest "$Base$Path" -Method $Method -ContentType "application/json" `
        -Body $Body -UseBasicParsing | Out-Null
    } else {
      Invoke-WebRequest "$Base$Path" -Method $Method -UseBasicParsing | Out-Null
    }
  } catch {
  }
}

$login = '{"email":"test@gmail.com","password":"test12345"}'

1..$Rounds | ForEach-Object {
  Hit GET  "/parfumes"
  Hit GET  "/parfumes/8"
  Hit POST "/auth/login" $login
  Hit GET  "/parfumes/999999"   
  Hit GET  "/debug/error"       
  Hit GET  "/debug/slow"
  Start-Sleep -Milliseconds 200
}

Write-Host "Done: $Rounds rounds sent to $Base"