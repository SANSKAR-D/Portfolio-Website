'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOARDS = [
    {
        id: 'cpp',
        lang: 'C++',
        filename: 'bubble_sort.cpp',
        title: 'Algorithm Info',
        stats: [
            { key: 'Algorithm', val: 'Bubble Sort' },
            { key: 'Language', val: 'C++' },
            { key: 'Time', val: 'O(n²)', accent: true },
            { key: 'Space', val: 'O(1)', accent: true },
            { key: 'Stable', val: 'Yes', green: true },
        ],
        outputHeader: 'Output',
        terminalText: '12 22 25 34 64',
        cmd: './bubble_sort',
        vizData: [40, 65, 85, 50, 72, 30, 90, 55],
        code: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = 5;
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    return 0;
}`
    },
    {
        id: 'python',
        lang: 'Python',
        filename: 'hello_world.py',
        title: 'Script Info',
        stats: [
            { key: 'Task', val: 'Say Hello' },
            { key: 'Language', val: 'Python 3' },
            { key: 'Type', val: 'Dynamic' },
            { key: 'Paradigm', val: 'Multi', accent: true },
            { key: 'Status', val: 'Running', green: true },
        ],
        outputHeader: 'Console Output',
        terminalText: 'Hello, World! Welcome to my portfolio.',
        cmd: 'python hello_world.py',
        vizData: [20, 30, 45, 60, 80, 55, 35, 25],
        code: `def greet(name: str):
    """
    Returns a friendly greeting message.
    """
    message = f"Hello, {name}!"
    print(message)
    return message

async def check_systems():
    print("Checking backend systems...")
    import asyncio
    await asyncio.sleep(1)
    return True

if __name__ == "__main__":
    greet("World")
    print("Welcome to my portfolio.")`
    }
];

const TYPING_SPEED = 30; // Faster for python/cpp
const PAUSE_BEFORE_MOVE = 1500; // Pause after typing before mouse moves
const MOUSE_MOVE_DURATION = 1000; // Time for mouse to reach dot
const PAUSE_BEFORE_SWAP = 400; // Time mouse sits on dot before swap

/* Simple syntax tokenizer for both languages */
function tokenize(code) {
    const tokens = [];
    const keywords = new Set([
        'int', 'void', 'for', 'if', 'return', 'using', 'namespace',
        'cout', 'endl', 'swap', 'include', 'std',
        'def', 'async', 'await', 'import', 'print', 'if', 'return',
        'str', '__name__', '__main__'
    ]);

    let i = 0;
    while (i < code.length) {
        // Simple C-style or Python comments
        if (code[i] === '#' && !code.startsWith('#include', i)) {
            let end = code.indexOf('\n', i);
            if (end === -1) end = code.length;
            tokens.push({ type: 'comment', value: code.slice(i, end) });
            i = end;
            continue;
        }

        // Python docstrings
        if (code.slice(i, i + 3) === '"""') {
            let end = code.indexOf('"""', i + 3);
            if (end === -1) end = code.length;
            else end += 3;
            tokens.push({ type: 'string', value: code.slice(i, end) });
            i = end;
            continue;
        }

        // Preprocessor directives (C++)
        if (code[i] === '#' && code.startsWith('#include', i)) {
            let end = code.indexOf('\n', i);
            if (end === -1) end = code.length;
            const directive = code.slice(i, end);
            tokens.push({ type: 'preprocessor', value: directive });
            i = end;
            continue;
        }

        // Strings (double quotes)
        if (code[i] === '"') {
            let end = i + 1;
            while (end < code.length && code[end] !== '"') end++;
            tokens.push({ type: 'string', value: code.slice(i, end + 1) });
            i = end + 1;
            continue;
        }

        // Angle-bracket includes
        if (code[i] === '<' && i > 0 && code.slice(Math.max(0, i - 20), i).includes('include')) {
            let end = code.indexOf('>', i);
            if (end !== -1) {
                tokens.push({ type: 'string', value: code.slice(i, end + 1) });
                i = end + 1;
                continue;
            }
        }

        // Numbers
        if (/[0-9]/.test(code[i]) && (i === 0 || /[\s,({[=<>+\-*/]/.test(code[i - 1]))) {
            let end = i;
            while (end < code.length && /[0-9]/.test(code[end])) end++;
            tokens.push({ type: 'number', value: code.slice(i, end) });
            i = end;
            continue;
        }

        // Words (identifiers / keywords)
        if (/[a-zA-Z_]/.test(code[i])) {
            let end = i;
            while (end < code.length && /[a-zA-Z0-9_]/.test(code[end])) end++;
            const word = code.slice(i, end);
            tokens.push({
                type: keywords.has(word) ? 'keyword' : 'identifier',
                value: word,
            });
            i = end;
            continue;
        }

        // Operators
        if ('{}()[];,<>+-*/=&|!'.includes(code[i])) {
            tokens.push({ type: 'operator', value: code[i] });
            i++;
            continue;
        }

        // Whitespace & other
        tokens.push({ type: 'plain', value: code[i] });
        i++;
    }

    return tokens;
}

function buildCharMap(code) {
    const tokens = tokenize(code);
    const chars = [];
    for (const token of tokens) {
        let className = '';
        if (token.type === 'keyword') className = 'code-kw';
        else if (token.type === 'preprocessor') className = 'code-prep';
        else if (token.type === 'string') className = 'code-str';
        else if (token.type === 'number') className = 'code-num';
        else if (token.type === 'operator') className = 'code-op';
        else if (token.type === 'comment') className = 'code-comment';

        for (const ch of token.value) {
            chars.push({ char: ch, className });
        }
    }
    return chars;
}

const charMaps = {
    cpp: buildCharMap(BOARDS[0].code),
    python: buildCharMap(BOARDS[1].code)
};

export default function CodeDashboard() {
    const [frontId, setFrontId] = useState('cpp');
    const [charIndex, setCharIndex] = useState(0);
    
    // We only type on the front board.
    const activeMap = charMaps[frontId];
    const timerRef = useRef(null);

    // Swap function
    const handleSwap = useCallback(() => {
        setFrontId(prev => prev === 'cpp' ? 'python' : 'cpp');
        setCharIndex(0);
    }, []);

    // Main typing loop
    const tick = useCallback(() => {
        setCharIndex((prev) => {
            if (prev >= activeMap.length) return prev;
            return prev + 1;
        });
    }, [activeMap.length]);

    useEffect(() => {
        // Clear main typing interval on unmount or re-run
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        let isCancelled = false;
        let swapTimeout = null;

        if (charIndex >= activeMap.length) {
            clearInterval(timerRef.current);
            // Finished typing -> trigger swap after a short pause
            // Finished typing -> trigger swap with no delay
            swapTimeout = setTimeout(() => {
                if (!isCancelled) {
                    handleSwap();
                }
            }, 0);
        } else {
            // Typing phase
            clearInterval(timerRef.current);
            timerRef.current = setInterval(tick, TYPING_SPEED);
        }

        return () => {
            isCancelled = true;
            if (swapTimeout) clearTimeout(swapTimeout);
        };
    }, [charIndex, activeMap.length, handleSwap, tick]);

    // Render text up to charIdx limit
    const renderCode = (boardId, fullyTyped) => {
        const charMap = charMaps[boardId];
        const visibleChars = fullyTyped ? charMap : charMap.slice(0, charIndex);
        const codeText = visibleChars.map((c) => c.char).join('');
        const lines = codeText.split('\n');

        return lines.map((line, lineIdx) => {
            let lineStart = 0;
            for (let l = 0; l < lineIdx; l++) {
                lineStart += lines[l].length + 1;
            }

            const lineChars = charMap.slice(lineStart, lineStart + line.length);
            const spans = [];
            let currentClass = '';
            let currentText = '';

            for (let c = 0; c < lineChars.length; c++) {
                const { char: ch, className } = lineChars[c];
                if (className !== currentClass) {
                    if (currentText) {
                        spans.push(<span key={spans.length} className={currentClass}>{currentText}</span>);
                    }
                    currentClass = className;
                    currentText = ch;
                } else {
                    currentText += ch;
                }
            }
            if (currentText) {
                spans.push(<span key={spans.length} className={currentClass}>{currentText}</span>);
            }

            // Only show cursor on the front board while typing
            const isFront = frontId === boardId;
            const isTyping = !fullyTyped && lineIdx === lines.length - 1;
            const showCursor = isFront && isTyping && charIndex < charMap.length;

            return (
                <div key={lineIdx} className="code-dashboard__line">
                    <span className="code-dashboard__line-num">{lineIdx + 1}</span>
                    <span className="code-dashboard__line-content">
                        {spans}
                        {showCursor && <span className="code-dashboard__cursor">|</span>}
                    </span>
                </div>
            );
        });
    };

    const renderBoard = (board, isFront) => {
        return (
            <motion.div
                key={board.id}
                className="code-dashboard__window"
                animate={{
                    // Front and back isometric perspective
                    rotateX: 15,
                    rotateY: 35,
                    rotateZ: -15,
                    // Offset stack: back board goes up and left
                    x: isFront ? 0 : 60,
                    y: isFront ? 0 : -80,
                    z: isFront ? 50 : -100,
                    scale: isFront ? 1 : 0.85,
                    opacity: isFront ? 1 : 0.4,
                    filter: isFront ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{
                    type: 'spring',
                    stiffness: isFront ? 120 : 180, // faster when closing
                    damping: isFront ? 20 : 25,
                    mass: 1,
                }}
                style={{
                    position: isFront ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: isFront ? 10 : 1,
                    pointerEvents: isFront ? 'auto' : 'none'
                }}
            >
                {/* Simulated Glow */}
                {isFront && <div className="code-dashboard__glow" />}

                {/* Title bar */}
                <div className="code-dashboard__titlebar">
                    <div className="code-dashboard__dots">
                        {/* The red dot we target to trigger swap manually */}
                        <div className="code-dashboard__dot-wrapper">
                            <span 
                                className="code-dashboard__dot code-dashboard__dot--red" 
                                onClick={handleSwap} 
                            />
                        </div>
                        <span className="code-dashboard__dot code-dashboard__dot--yellow" />
                        <span className="code-dashboard__dot code-dashboard__dot--green" />
                    </div>
                    <div className="code-dashboard__filename">{board.filename}</div>
                    <div className="code-dashboard__dots-spacer" />
                </div>

                {/* Dashboard body grid */}
                <div className="code-dashboard__body">
                    {/* Code editor */}
                    <div className="code-dashboard__panel code-dashboard__panel--code">
                        <div className="code-dashboard__code-scroll">
                            <pre className="code-dashboard__code">
                                {/* Back board is always fully rendered so it looks fully typed out in background */}
                                {renderCode(board.id, !isFront)}
                            </pre>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="code-dashboard__panel code-dashboard__panel--stats">
                        <h4 className="code-dashboard__panel-title">{board.title}</h4>
                        <div className="code-dashboard__stat-list">
                            {board.stats.map((s, i) => (
                                <div key={i} className="code-dashboard__stat-item">
                                    <span className="code-dashboard__stat-key">{s.key}</span>
                                    <span className={`code-dashboard__stat-val ${s.accent ? 'code-dashboard__stat-val--accent' : ''} ${s.green ? 'code-dashboard__stat-val--green' : ''}`}>
                                        {s.val}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Output */}
                    <div className="code-dashboard__panel code-dashboard__panel--output">
                        <h4 className="code-dashboard__panel-title">{board.outputHeader}</h4>
                        <div className="code-dashboard__terminal">
                            <span className="code-dashboard__terminal-prompt">$</span>
                            <span className="code-dashboard__terminal-text">
                                {/* Only show output after code finishes typing */}
                                {(!isFront || charIndex >= activeMap.length)
                                    ? board.terminalText
                                    : board.cmd}
                            </span>
                            {!isFront || charIndex >= activeMap.length ? null : (
                                <span className="code-dashboard__cursor code-dashboard__cursor--terminal">|</span>
                            )}
                        </div>
                    </div>

                    {/* Vis */}
                    <div className="code-dashboard__panel code-dashboard__panel--viz">
                        <h4 className="code-dashboard__panel-title">Resource Graph</h4>
                        <div className="code-dashboard__bars">
                            {board.vizData.map((h, i) => (
                                <div
                                    key={i}
                                    className="code-dashboard__bar"
                                    style={{
                                        height: `${h}%`,
                                        animationDelay: `${i * 0.15}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="section code-dashboard" id="code-dashboard">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="section__heading">Tech Stack & Logic</h2>
                <p className="section__subheading">
                    Mastery across multiple languages — switching contexts smoothly.
                </p>
            </motion.div>

            {/* 3D Scene Container */}
            <motion.div
                className="code-dashboard__3d-scene"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Render Python Board first so it's beneath, or rely on framer-motion z-index.
                    Framer motion animates zIndex properly, so mapped order works. */}
                {BOARDS.map(b => renderBoard(b, frontId === b.id))}
            </motion.div>
        </section>
    );
}
