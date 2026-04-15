/**
 * Navigation direction state — module-level (synchronous, not React state).
 * Set BEFORE router.push() so template.tsx reads correct direction on mount.
 */
export type NavDirection = 'forward' | 'backward' | 'none';

let _direction: NavDirection = 'none';

export const navigationState = {
    get direction(): NavDirection {
        return _direction;
    },
    set direction(dir: NavDirection) {
        _direction = dir;
    },
};

/**
 * Ordered list of the public-facing pages.
 * Higher index = "further forward" in the site hierarchy.
 */
export const PAGE_ORDER = [
    '/',
    '/methodology',
    '/curriculum',
    '/success-stories',
    '/pricing',
];
