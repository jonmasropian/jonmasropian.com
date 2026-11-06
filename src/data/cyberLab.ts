// Cyber Lab recording: real PostgreSQL against a "database of Jon". Display only, nothing is connected.
// Results must stay true to biography.ts / projects.ts (approved facts only).
import { psqlTable } from '@/lib/psql';
import { projects } from '@/data/projects';

export type Step = { query: string; output: string };

export const session: Step[] = [
  {
    query: `SELECT title, org, to_char(started, 'Mon YYYY') AS since
FROM roles
ORDER BY started DESC;`,
    output: psqlTable(
      ['title', 'org', 'since'],
      [
        ['Software Developer Apprentice', 'ERA Solutions LLC', 'Sep 2026'],
        ['Desktop Analyst', 'Memorial Health System of SW Oklahoma', 'May 2026'],
        ['Drill Sergeant / Technical Training Lead', 'U.S. Army', '2016'],
        ['IT & Network Support Supervisor', 'U.S. Army', '2004'],
      ],
    ),
  },
  {
    query: `SELECT name, issuer, expires
FROM certs
WHERE expires > now()
ORDER BY issued;`,
    output: psqlTable(
      ['name', 'issuer', 'expires'],
      [
        ['Security+ ce (SY0-701)', 'CompTIA', '2029-01-19'],
        ['HTML/CSS Web Designer', 'CoITB', '2029-03-07'],
        ['JavaScript Professional Developer', 'CoITB', '2029-04-11'],
        ['ReactJS Framework Developer', 'CoITB', '2029-05-16'],
        ['MySQL Backend Developer', 'CoITB', '2029-06-13'],
        ['Professional Python Developer', 'CoITB', '2029-07-25'],
      ],
    ),
  },
  {
    query: `SELECT title, array_to_string(stack, ', ') AS built_with
FROM projects;`,
    output: psqlTable(['title', 'built_with'], projects.map((p) => [p.title, p.stack.join(', ')])),
  },
  {
    query: `WITH service AS (
  SELECT min(started) AS first_day, max(ended) AS last_day
  FROM roles
  WHERE org = 'U.S. Army'
)
SELECT 'U.S. Army' AS org,
       extract(year FROM age(last_day, first_day)) AS years
FROM service;`,
    output: psqlTable(['org', 'years'], [['U.S. Army', 22]]),
  },
];
