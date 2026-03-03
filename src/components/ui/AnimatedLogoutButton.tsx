"use client";

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import styles from './AnimatedLogoutButton.module.css';

type ButtonState = 'default' | 'hover' | 'walking1' | 'walking2' | 'falling1' | 'falling2' | 'falling3';

type StyleState = { [key: string]: string };

const logoutButtonStates: Record<ButtonState, StyleState> = {
    'default': {
        '--figure-duration': '100',
        '--transform-figure': 'none',
        '--walking-duration': '100',
        '--transform-arm1': 'none',
        '--transform-wrist1': 'none',
        '--transform-arm2': 'none',
        '--transform-wrist2': 'none',
        '--transform-leg1': 'none',
        '--transform-calf1': 'none',
        '--transform-leg2': 'none',
        '--transform-calf2': 'none'
    },
    'hover': {
        '--figure-duration': '100',
        '--transform-figure': 'translateX(1.5px)',
        '--walking-duration': '100',
        '--transform-arm1': 'rotate(-5deg)',
        '--transform-wrist1': 'rotate(-15deg)',
        '--transform-arm2': 'rotate(5deg)',
        '--transform-wrist2': 'rotate(6deg)',
        '--transform-leg1': 'rotate(-10deg)',
        '--transform-calf1': 'rotate(5deg)',
        '--transform-leg2': 'rotate(20deg)',
        '--transform-calf2': 'rotate(-20deg)'
    },
    'walking1': {
        '--figure-duration': '300',
        '--transform-figure': 'translateX(11px)',
        '--walking-duration': '300',
        '--transform-arm1': 'translateX(-4px) translateY(-2px) rotate(120deg)',
        '--transform-wrist1': 'rotate(-5deg)',
        '--transform-arm2': 'translateX(4px) rotate(-110deg)',
        '--transform-wrist2': 'rotate(-5deg)',
        '--transform-leg1': 'translateX(-3px) rotate(80deg)',
        '--transform-calf1': 'rotate(-30deg)',
        '--transform-leg2': 'translateX(4px) rotate(-60deg)',
        '--transform-calf2': 'rotate(20deg)'
    },
    'walking2': {
        '--figure-duration': '400',
        '--transform-figure': 'translateX(17px)',
        '--walking-duration': '300',
        '--transform-arm1': 'rotate(60deg)',
        '--transform-wrist1': 'rotate(-15deg)',
        '--transform-arm2': 'rotate(-45deg)',
        '--transform-wrist2': 'rotate(6deg)',
        '--transform-leg1': 'rotate(-5deg)',
        '--transform-calf1': 'rotate(10deg)',
        '--transform-leg2': 'rotate(10deg)',
        '--transform-calf2': 'rotate(-20deg)'
    },
    'falling1': {
        '--figure-duration': '1600',
        '--walking-duration': '400',
        '--transform-arm1': 'rotate(-60deg)',
        '--transform-wrist1': 'none',
        '--transform-arm2': 'rotate(30deg)',
        '--transform-wrist2': 'rotate(120deg)',
        '--transform-leg1': 'rotate(-30deg)',
        '--transform-calf1': 'rotate(-20deg)',
        '--transform-leg2': 'rotate(20deg)'
    },
    'falling2': {
        '--walking-duration': '300',
        '--transform-arm1': 'rotate(-100deg)',
        '--transform-arm2': 'rotate(-60deg)',
        '--transform-wrist2': 'rotate(60deg)',
        '--transform-leg1': 'rotate(80deg)',
        '--transform-calf1': 'rotate(20deg)',
        '--transform-leg2': 'rotate(-60deg)'
    },
    'falling3': {
        '--walking-duration': '500',
        '--transform-arm1': 'rotate(-30deg)',
        '--transform-wrist1': 'rotate(40deg)',
        '--transform-arm2': 'rotate(50deg)',
        '--transform-wrist2': 'none',
        '--transform-leg1': 'rotate(-30deg)',
        '--transform-leg2': 'rotate(20deg)',
        '--transform-calf2': 'none'
    }
};

interface AnimatedLogoutButtonProps {
    onLogout: () => void;
    label: string;
}

export function AnimatedLogoutButton({ onLogout, label }: AnimatedLogoutButtonProps) {
    const [currentState, setCurrentState] = useState<ButtonState>('default');
    const [currentStyles, setCurrentStyles] = useState<StyleState>(logoutButtonStates['default']);

    // Explicit class markers
    const [isClicked, setIsClicked] = useState(false);
    const [isDoorSlammed, setIsDoorSlammed] = useState(false);
    const [isFalling, setIsFalling] = useState(false);

    const isAnimating = useRef(false);

    // Merge new state styles with existing styles
    const updateState = (newState: ButtonState) => {
        setCurrentState(newState);
        setCurrentStyles(prev => ({ ...prev, ...logoutButtonStates[newState] }));
    };

    const handleMouseEnter = () => {
        if (!isAnimating.current && currentState === 'default') {
            updateState('hover');
        }
    };

    const handleMouseLeave = () => {
        if (!isAnimating.current && currentState === 'hover') {
            updateState('default');
        }
    };

    const handleClick = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        setIsClicked(true);
        updateState('walking1');

        setTimeout(() => {
            setIsDoorSlammed(true);
            updateState('walking2');

            setTimeout(() => {
                setIsFalling(true);
                updateState('falling1');

                setTimeout(() => {
                    updateState('falling2');

                    setTimeout(() => {
                        updateState('falling3');

                        setTimeout(() => {
                            // Automatically execute logout after animation completes
                            onLogout();

                            // Reset state (rarely seen since it redirects, but good for cleanliness)
                            setIsClicked(false);
                            setIsDoorSlammed(false);
                            setIsFalling(false);
                            updateState('default');
                            isAnimating.current = false;
                        }, 1000);

                    }, parseInt(logoutButtonStates['falling2']['--walking-duration'] || '0'));

                }, parseInt(logoutButtonStates['falling1']['--walking-duration'] || '0'));

            }, parseInt(logoutButtonStates['walking2']['--figure-duration'] || '0'));

        }, parseInt(logoutButtonStates['walking1']['--figure-duration'] || '0'));
    };

    return (
        <button
            className={`
                ${styles.logoutButton} 
                ${isClicked ? styles.clicked : ''} 
                ${isDoorSlammed ? styles.doorSlammed : ''} 
                ${isFalling ? styles.falling : ''}
            `}
            style={currentStyles as CSSProperties}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className={styles.svgContainer}>
                <svg className={styles.doorway} viewBox="0 0 100 100">
                    <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
                    <path className={styles.bang} d="M40.5 43.7L26.6 31.4l-2.5 6.7zM41.9 50.4l-19.5-4-1.4 6.3zM40 57.4l-17.7 3.9 3.9 5.7z" />
                </svg>
                <svg className={styles.figure} viewBox="0 0 100 100">
                    <circle cx="52.1" cy="32.4" r="6.4" />
                    <path d="M50.7 62.8c-1.2 2.5-3.6 5-7.2 4-3.2-.9-4.9-3.5-4-7.8.7-3.4 3.1-13.8 4.1-15.8 1.7-3.4 1.6-4.6 7-3.7 4.3.7 4.6 2.5 4.3 5.4-.4 3.7-2.8 15.1-4.2 17.9z" />
                    <g className={styles.arm1}>
                        <path d="M55.5 56.5l-6-9.5c-1-1.5-.6-3.5.9-4.4 1.5-1 3.7-1.1 4.6.4l6.1 10c1 1.5.3 3.5-1.1 4.4-1.5.9-3.5.5-4.5-.9z" />
                        <path className={styles.wrist1} d="M69.4 59.9L58.1 58c-1.7-.3-2.9-1.9-2.6-3.7.3-1.7 1.9-2.9 3.7-2.6l11.4 1.9c1.7.3 2.9 1.9 2.6 3.7-.4 1.7-2 2.9-3.8 2.6z" />
                    </g>
                    <g className={styles.arm2}>
                        <path d="M34.2 43.6L45 40.3c1.7-.6 3.5.3 4 2 .6 1.7-.3 4-2 4.5l-10.8 2.8c-1.7.6-3.5-.3-4-2-.6-1.6.3-3.4 2-4z" />
                        <path className={styles.wrist2} d="M27.1 56.2L32 45.7c.7-1.6 2.6-2.3 4.2-1.6 1.6.7 2.3 2.6 1.6 4.2L33 58.8c-.7 1.6-2.6 2.3-4.2 1.6-1.7-.7-2.4-2.6-1.7-4.2z" />
                    </g>
                    <g className={styles.leg1}>
                        <path d="M52.1 73.2s-7-5.7-7.9-6.5c-.9-.9-1.2-3.5-.1-4.9 1.1-1.4 3.8-1.9 5.2-.9l7.9 7c1.4 1.1 1.7 3.5.7 4.9-1.1 1.4-4.4 1.5-5.8.4z" />
                        <path className={styles.calf1} d="M52.6 84.4l-1-12.8c-.1-1.9 1.5-3.6 3.5-3.7 2-.1 3.7 1.4 3.8 3.4l1 12.8c.1 1.9-1.5 3.6-3.5 3.7-2 0-3.7-1.5-3.8-3.4z" />
                    </g>
                    <g className={styles.leg2}>
                        <path d="M37.8 72.7s1.3-10.2 1.6-11.4 2.4-2.8 4.1-2.6c1.7.2 3.6 2.3 3.4 4l-1.8 11.1c-.2 1.7-1.7 3.3-3.4 3.1-1.8-.2-4.1-2.4-3.9-4.2z" />
                        <path className={styles.calf2} d="M29.5 82.3l9.6-10.9c1.3-1.4 3.6-1.5 5.1-.1 1.5 1.4.4 4.9-.9 6.3l-8.5 9.6c-1.3 1.4-3.6 1.5-5.1.1-1.4-1.3-1.5-3.5-.2-5z" />
                    </g>
                </svg>
                <svg className={styles.door} viewBox="0 0 100 100">
                    <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
                    <circle cx="66" cy="50" r="3.7" />
                </svg>
            </div>

            <span className={`block overflow-hidden tracking-tight transition-[max-width,opacity] duration-300 ${styles.buttonText} ${!isAnimating.current ? "opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px]" : "opacity-100 max-w-[150px]"}`}>
                {label}
            </span>
        </button>
    );
}
