# Repository Guidelines

## Estructura del Proyecto y Organización de Módulos

- `app/` aloja el árbol de enrutamiento de Next.js; las landing pages viven en `app/landing`, mientras `app/_library` y `app/fragments`
  exponen fragmentos reutilizables.
- `components/` reúne piezas React compartidas por dominio (`common`, `features`, `layout`, `ui`, `utils`); importa desde aquí antes de
  reimplementar lógica en una página.
- `packages/liferay-components/` empaqueta widgets para Liferay; `packages/dev-app/` actúa como playground para validar los paquetes de
  forma aislada.
- `shared/`, `utils/` y `hooks/` concentran lógica transversal; ubica nuevos helpers multi-página aquí en lugar de las carpetas de rutas.
- Los assets estáticos viven en `assets/` (fuentes de diseño) y `public/` (servidos por Next.js); evita subir medios pesados y prefiere
  rutas CDN cuando aplique.

## Comandos de Build, Test y Desarrollo

- `npm run dev` – levanta el servidor de desarrollo con Turbopack y limpia `.next` para prevenir artefactos obsoletos.
- `npm run dev:webpack` – servidor de desarrollo con Webpack, útil para aislar incidencias específicas de Turbopack.
- `npm run build` / `npm run start` – compila el build de producción y lo sirve localmente.
- `npm run lint` – ejecuta ESLint con autofix; combínalo con `npm run format:check` para validaciones estilo CI.
- `npm run format` – aplica Prettier en todo el repositorio; ejecútalo antes de subir refactorizaciones amplias.

## Estilo de Código y Convenciones de Nombres

- Prioriza TypeScript: nuevas interfaces en `.tsx` y utilidades compartidas en `.ts`.
- Prettier 3 aplica indentación de dos espacios y uniformidad de comillas; evita ajustes manuales tras formatear.
- ESLint extiende configuraciones de Next, XO y reglas propias; resuelve advertencias en vez de silenciarlas. Añade comentarios solo cuando
  la intención no sea evidente.
- Componentes y hooks siguen `PascalCase` (`ExampleCard.tsx`) y `useCamelCase` (`useExample.ts`); coloca estilos junto al módulo o reutiliza
  tokens desde `styles/`.

## Guía de Pruebas

- Aún no hay runner automatizado; al agregar cobertura, opta por Jest + React Testing Library en `__tests__/` o junto al archivo
  (`Component.test.tsx`).
- Mientras no exista script de pruebas, documenta los pasos de verificación manual en los PR y usa `packages/dev-app/` para validación
  interactiva.
- Mantén fixtures pequeños y deterministas; maqueta llamadas a APIs con mocks locales en lugar de pegarle a servicios externos.

## Lineamientos para Commits y Pull Requests

- Mantén títulos de commit cortos (≤72 caracteres), orientados a la acción y alineados con el historial (resumen en español con prefijos
  opcionales como `Fix:` o `Ajustes`).
- Divide el trabajo en commits lógicamente independientes que compilen por sí solos; evita mensajes “WIP”.
- Los PR deben describir el impacto visible, listar áreas afectadas, vincular IDs de Jira/issues y adjuntar capturas antes/después para
  cambios de UI.
- Indica tareas de seguimiento y cualquier prueba o regla de lint omitida para que el revisor pueda responder con rapidez.
