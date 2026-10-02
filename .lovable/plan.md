# 3D Selected Work Marquee and Project Pages

## Scope
Transform only the existing Selected Work experience and add a dedicated detail page for each existing project. Keep all other portfolio sections unchanged.

## Selected Work marquee
- Replace the vertical project panels with a full-width, continuously moving right-to-left loop.
- Use responsive CSS 3D transforms to create the supplied curved-gallery perspective: the center card reads larger and forward, while side cards recede, rotate, and clip naturally at the viewport edges.
- Duplicate the visual sequence only for seamless looping; keep a single source of project data and hide duplicate content from assistive technology.
- Pause the entire loop when a desktop pointer hovers a project. Dim and blur only that image, then reveal its title and a **View Details** action.
- On touch/mobile, keep images sharp and place the title and **View Details** action below each image.
- Disable dragging and arrows. Respect reduced-motion preferences by showing a stable, scrollable presentation rather than forced motion.
- Keep the existing ivory, charcoal, olive, champagne, typography, image treatment, and section heading.

## Dedicated project pages
- Add `/work/:slug` pages for Celestra, Jalandhar Broast, Personal Portfolio Website, and Interactive Business Discovery Map.
- Reuse the existing project title, category, description, image, modules, and technologies from one shared project-data module.
- Each page will include a top-left **Back to Home** action, project image and details, and bottom **Next Project / More Projects** navigation.
- Add unique page metadata for every project detail page.

## Responsive and quality checks
- Verify the loop seam, hover pause/resume, mobile tap targets, image clarity, perspective, and navigation.
- Check desktop and small mobile sizes for clipping, overflow, readability, and reduced-motion behavior.
- Confirm project pages load directly, browser console stays clean, and the app build remains successful.

## Technical approach
- Use Framer Motion/CSS transforms already in the project rather than adding a new 3D dependency or WebGL scene for this gallery.
- Keep project images locally bundled so published pages do not depend on temporary image URLs.
- Preserve the current one-page navigation on the home page; detail-page back links return to `/#work`.
