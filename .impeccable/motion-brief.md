# Motion thesis

- Focal moment: crossing from code to tatami by a full-screen red wooden portal. The selected world replaces all topic-specific content at full occlusion; the camera settles into the new illustrated space.
- Continuity: static environment and transparent character are separate depth planes. Background moves opposite pointer, character follows lightly; scroll shifts the character at most 26px. No simulated walking or claim of generated video.
- Feedback: current-world underline, small SVG arrow movement on hover/focus, project edge-color change. Header remains available during normal scrolling.
- Budget: event-driven requestAnimationFrame only, no idle animation loop; effects limited to hero; 650–950ms entry effects, 900ms portal; pointer depth only on fine-pointer hover devices. Reduced-motion switches instantly and cancels depth/entry animations.
- New assets: two alpha cutouts created from user-provided anime art, converted to WebP with alpha preserved. Empty office/dojo backgrounds were generated earlier. No external paid generation call.
