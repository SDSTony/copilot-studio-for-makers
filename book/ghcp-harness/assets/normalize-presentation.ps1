param(
    [Parameter(Mandatory = $true)]
    [string]$Path,
    [ValidateRange(1, 1000)]
    [int]$ExpectedSlideCount = 3
)

$ErrorActionPreference = 'Stop'
$resolved = (Resolve-Path -LiteralPath $Path).Path
$temporary = Join-Path (Split-Path -Parent $resolved) ("normalized-" + [Guid]::NewGuid().ToString('N') + '.pptx')
$powerPoint = $null
$presentation = $null
$ownsApplication = $false

try {
    $powerPoint = New-Object -ComObject PowerPoint.Application
    if ($powerPoint.Presentations.Count -ne 0) {
        throw 'Close existing PowerPoint presentations before regenerating the template.'
    }
    $ownsApplication = $true
    $presentation = $powerPoint.Presentations.Open($resolved, -1, 0, 0)
    $presentation.SaveCopyAs($temporary, 24)
    $presentation.Close()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($presentation)
    $presentation = $null
    $presentation = $powerPoint.Presentations.Open($temporary, -1, 0, 0)
    if ($presentation.Slides.Count -ne $ExpectedSlideCount) {
        throw "Normalized presentation must contain $ExpectedSlideCount slides."
    }
    $presentation.Close()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($presentation)
    $presentation = $null
    Move-Item -LiteralPath $temporary -Destination $resolved -Force
    Write-Output 'Normalized and reopened the PPTX using desktop PowerPoint.'
}
finally {
    if ($null -ne $presentation) {
        $presentation.Close()
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($presentation)
    }
    if ($null -ne $powerPoint) {
        if ($ownsApplication) {
            $powerPoint.Quit()
        }
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($powerPoint)
    }
    if (Test-Path -LiteralPath $temporary) {
        Remove-Item -LiteralPath $temporary
    }
}
