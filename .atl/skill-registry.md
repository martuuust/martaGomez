# Project Skill Registry -- martaGomez

## Compact Rules

### Angular 21 & Signals
- Prefer Angular 21 Signals (signal, computed, effect) for reactive state instead of RxJS where possible, except for data streams (like HTTP/Supabase events) where RxJS is best.
- Avoid using legacy controllers/modules; use standalone components.
- Use the modern @if, @for, and @switch syntax for templates.

### Hexagonal Architecture
- Keep all files organized under modules by domain, application, and infrastructure layers.
- Do NOT import Angular or Supabase elements in domain/ and application/ directories.
- Define communication interfaces in domain/repository/ (Ports) and implement them in infrastructure/adapters/ (Adapters).
- Component business logic must delegating to cases of use (application/usecases/).

### Supabase Integration
- Initialize SupabaseClient inside the infrastructure adapter using environment configurations.
- Use from(promise) to wrap Supabase operations into RxJS Observables when returning them from repositories.
