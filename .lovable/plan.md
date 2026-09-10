# Compact mobile portfolio polish

## Changes
- Reduce mobile-only section padding, internal gaps, and repeated vertical whitespace while leaving tablet and desktop spacing unchanged.
- Keep all content and section order intact; preserve the existing editorial styling and motion.
- Restyle the Project type and Budget range controls with a consistent custom chevron, clearer spacing, and polished focus states.
- Increase only the mobile constellation scale slightly and strengthen its lines/nodes without reintroducing overflow or label clipping.

## Verification
- Check phone and desktop layouts for readability, smooth interaction, and horizontal overflow.
- Confirm both dropdowns work, the constellation remains draggable, console stays clean, and the build succeeds.

## Technical details
- Changes stay limited to existing section presentation classes, Contact controls, and the React Three Fiber constellation sizing/material values.
- Desktop breakpoints and all content remain unchanged.
