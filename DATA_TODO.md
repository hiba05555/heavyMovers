# Data to verify before launch

The 24 seed suburbs in `data/australian-suburbs.json` use real, well-known council, hospital and
school names, but they were compiled **without a live check against an official source**.
Verify every row before the site goes live.

## Missing (deliberately omitted — not confident of a correct nearby school)
- `joondalup-wa` — `nearbySchool`
- `palmerston-nt` — `nearbySchool`

## Worth double-checking
- `belconnen-act` — hospital listed as **North Canberra Hospital** (formerly Calvary Public Hospital Bruce, renamed 2023).
- `canberra-act`, `belconnen-act`, `tuggeranong-act` — the ACT has no local councils; `council` is set to "ACT Government".
- `canberra-act` — postcode 2601 is the city centre; the "suburb" is the city, not a gazetted suburb.
- `sydney-nsw`, `perth-wa`, `melbourne-vic`, `southport-qld` — the nearby school is close to, not inside, the postcode.
- `glenelg-sa` — Glenelg Primary School; `mount-gambier-sa` — Mount Gambier and Districts Health Service (confirm current names).
- All `localAccessNote` values are general guidance about the area's building stock, written for the demo.
  They should be reviewed (ideally by the client's crews) before launch.

## Demo placeholders (in config, tagged `// DEMO PLACEHOLDER`)
- Phone `1300 000 000`, email addresses.
- Review score / count in the trust pill.
- Proof-card project stats.
