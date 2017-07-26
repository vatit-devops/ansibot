
# Enable UAC
Set-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA" -Value "1"

Write-Host "Restarting the computer now."
Restart-Computer