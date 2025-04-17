import { Variants } from 'framer-motion';

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1): Variants => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren,
            delayChildren
        }
    }
});

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay = 0): Variants => ({
    hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 0
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.5,
            delay,
            ease: [0.25, 0.25, 0.25, 0.75]
        }
    }
});