# Agent instructions

Personal site monorepo: Next.js app in `apps/web`, shared packages in `packages/`.

## Code quality

- Never use comments on anything
- Use refs instead of states where possible
- Only add comments when the implementation is non-obvious and devs need context for what it does and why
- Always use functions over classes
- File names should always be kebab-case

## Conventions

- Use existing patterns in surrounding code before introducing new abstractions
- Keep changes focused; avoid unrelated edits
- Do not create git commits unless explicitly asked
