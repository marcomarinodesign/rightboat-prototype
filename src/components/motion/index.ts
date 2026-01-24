/**
 * Motion Primitives - Reusable animation wrappers
 * 
 * These components provide subtle, accessible animations that respect
 * user preferences and are SSR-safe.
 * 
 * Installation:
 * npm install framer-motion
 * 
 * Usage Examples:
 * 
 * Basic fade-in:
 * <FadeIn>
 *   <Card>Content</Card>
 * </FadeIn>
 * 
 * Slide-in with options:
 * <SlideIn direction="up" delay={0.1} once={true}>
 *   <Card>Content</Card>
 * </SlideIn>
 * 
 * Scale-in:
 * <ScaleIn scale={0.95} delay={0.2}>
 *   <Card>Content</Card>
 * </ScaleIn>
 * 
 * All components:
 * - Respect prefers-reduced-motion (animations disabled if user prefers)
 * - Use safe defaults (200-300ms duration, ease-out)
 * - Support optional delay and once props
 * - Are SSR-safe (no hydration issues)
 * - Use LazyMotion for optimal performance
 * - Do not affect layout (no layout shifts)
 */

export { FadeIn } from "./fade-in"
export { SlideIn } from "./slide-in"
export { ScaleIn } from "./scale-in"
