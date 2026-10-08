<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Selected Work content in one shared project-data module so its marquee and detail pages cannot drift apart.
- Selected Work uses repeated visual sequences and time-based wrapped positions so loop resets occur outside the viewport; motion helpers have focused tests.
- Desktop proportion overrides live in a single min-width:1024px stylesheet block so mobile and tablet sizing remains unchanged.
