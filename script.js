// ═══════════════════════════════════════════
// АНАГРАМ — Паметна игра слова
// Офлајн, адаптивна тежина, Web Audio звук
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // ─── State ───
    let currentGrade = "1";
    let currentWord = null;
    let score = 0;
    let streak = 0;
    let bestStreak = 0;
    let wordsCompleted = 0;
    let totalWordsInGrade = 0;
    let hintsUsed = 0;
    let wrongAttempts = 0;
    let soundEnabled = true;
    let wordQueue = [];
    let difficultWords = []; // Words the child got wrong — shown again
    let categoryKeys = [];
    let currentCatIndex = 0;
    let currentWordIndex = 0;

    // ─── DOM ───
    const $ = id => document.getElementById(id);
    const targetContainer = $('target-container');
    const lettersContainer = $('letters-container');
    const scoreEl = $('score');
    const streakBadge = $('streak-badge');
    const streakCount = $('streak-count');
    const startScreen = $('start-screen');
    const startBtn = $('start-btn');
    const startHighscore = $('start-highscore');
    const nightToggle = $('night-toggle');
    const soundToggle = $('sound-toggle');
    const imgToggle = $('img-toggle-checkbox');
    const imgContainer = $('word-image-container');
    const wordImage = $('word-image');
    const wordEmoji = $('word-emoji');
    const resetBtn = $('reset-btn');
    const hintBtn = $('hint-btn');
    const progressBar = $('progress-bar');
    const progressText = $('progress-text');
    const categoryLabel = $('category-label');
    const confettiCanvas = $('confetti-canvas');
    const confettiCtx = confettiCanvas.getContext('2d');

    // ─── Audio (Web Audio API — fully offline) ───
    let audioCtx = null;

    function getAudioCtx() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playTone(freq, duration, type = 'sine', volume = 0.15) {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.value = volume;
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) { /* ignore audio errors */ }
    }

    function playDrop() { playTone(600, 0.08, 'sine', 0.1); }
    function playReturn() { playTone(300, 0.06, 'triangle', 0.08); }

    function playCorrect() {
        if (!soundEnabled) return;
        // Happy ascending arpeggio
        const notes = [523, 659, 784, 1047];
        notes.forEach((f, i) => {
            setTimeout(() => playTone(f, 0.15, 'sine', 0.12), i * 80);
        });
    }

    function playWrong() {
        if (!soundEnabled) return;
        playTone(200, 0.3, 'sawtooth', 0.08);
        setTimeout(() => playTone(180, 0.3, 'sawtooth', 0.06), 100);
    }

    function playLevelComplete() {
        if (!soundEnabled) return;
        const notes = [523, 659, 784, 1047, 1319, 1568];
        notes.forEach((f, i) => {
            setTimeout(() => playTone(f, 0.2, 'sine', 0.1), i * 100);
        });
    }

    function playHint() { playTone(880, 0.1, 'triangle', 0.08); }

    // ─── Data helpers ───
    function getGradeData(grade) {
        const g = window.gameData[grade];
        if (!g) return null;
        return g;
    }

    function getAllWordsForGrade(grade) {
        const g = getGradeData(grade);
        if (!g || !g.categories) return [];
        const words = [];
        const cats = Object.keys(g.categories);
        cats.forEach(catKey => {
            const cat = g.categories[catKey];
            cat.words.forEach(w => {
                words.push({ ...w, category: cat.label, catKey });
            });
        });
        return words;
    }

    function buildQueue(grade) {
        const all = getAllWordsForGrade(grade);
        // Shuffle
        shuffleArray(all);
        // Prepend difficult words (spaced repetition)
        const difficult = difficultWords.filter(w => true);
        shuffleArray(difficult);
        // Insert difficult words at intervals
        const queue = [];
        let dIdx = 0;
        for (let i = 0; i < all.length; i++) {
            // Every 5th word, insert a difficult word if available
            if (i > 0 && i % 5 === 0 && dIdx < difficult.length) {
                queue.push({ ...difficult[dIdx], isRetry: true });
                dIdx++;
            }
            queue.push(all[i]);
        }
        // Append remaining difficult words
        while (dIdx < difficult.length) {
            queue.push({ ...difficult[dIdx], isRetry: true });
            dIdx++;
        }
        return queue;
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // ─── Game Init ───
    function startNewGame() {
        score = 0;
        streak = 0;
        bestStreak = 0;
        wordsCompleted = 0;
        hintsUsed = 0;
        wrongAttempts = 0;
        difficultWords = [];
        scoreEl.textContent = score;
        updateStreak();

        wordQueue = buildQueue(currentGrade);
        totalWordsInGrade = wordQueue.length;
        currentWordIndex = 0;

        updateProgress();
        loadNextWord();
    }

    function loadNextWord() {
        if (currentWordIndex >= wordQueue.length) {
            // All words done!
            onGradeComplete();
            return;
        }

        currentWord = wordQueue[currentWordIndex];
        categoryLabel.textContent = currentWord.category || '';
        renderGame(currentWord);
        updateProgress();
        hintBtn.classList.remove('disabled');
    }

    // ─── Render ───
    function renderGame(wordData) {
        targetContainer.innerHTML = '';
        lettersContainer.innerHTML = '';

        const wordText = wordData.word.replace(/\s/g, ''); // Remove spaces for games like "НОВИ САД"
        const displayWord = wordData.word;

        // Show emoji or image
        const showVisual = imgToggle.checked;
        const hasImage = wordData.image && wordData.image.length > 0;
        const hasEmoji = wordData.emoji && wordData.emoji.length > 0;

        if (showVisual && (hasImage || hasEmoji)) {
            imgContainer.style.display = 'flex';

            if (hasImage) {
                wordImage.src = wordData.image;
                wordImage.style.display = 'block';
                wordEmoji.style.display = 'none';
                wordImage.onerror = () => {
                    // Fallback to emoji if image fails
                    wordImage.style.display = 'none';
                    if (hasEmoji) {
                        wordEmoji.textContent = wordData.emoji;
                        wordEmoji.style.display = 'block';
                    } else {
                        imgContainer.style.display = 'none';
                    }
                };
            } else {
                wordImage.style.display = 'none';
                wordEmoji.textContent = wordData.emoji;
                wordEmoji.style.display = 'block';
            }
        } else {
            imgContainer.style.display = 'none';
        }

        // Target slots — use displayWord to handle spaces
        const chars = displayWord.split('');
        chars.forEach((char, i) => {
            if (char === ' ') {
                const spacer = document.createElement('div');
                spacer.classList.add('letter-slot-spacer');
                spacer.style.width = '20px';
                targetContainer.appendChild(spacer);
            } else {
                const slot = document.createElement('div');
                slot.classList.add('letter-slot');
                slot.dataset.index = i;
                slot.dataset.expected = char;

                // Drop events
                slot.addEventListener('dragover', e => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    slot.classList.add('highlight');
                });
                slot.addEventListener('dragleave', () => slot.classList.remove('highlight'));
                slot.addEventListener('drop', e => handleSlotDrop(e, slot));

                targetContainer.appendChild(slot);
            }
        });

        // Scrambled letters — only non-space chars
        const letterChars = wordText.split('');
        shuffleArray(letterChars);

        // Ensure letters aren't in the correct order
        const original = wordText.split('');
        let attempts = 0;
        while (letterChars.join('') === original.join('') && letterChars.length > 1 && attempts < 10) {
            shuffleArray(letterChars);
            attempts++;
        }

        letterChars.forEach((char, index) => {
            const letter = document.createElement('div');
            letter.classList.add('draggable-letter');
            letter.textContent = char;
            letter.draggable = true;
            letter.dataset.char = char;
            letter.id = `letter-${Date.now()}-${index}`;

            letter.addEventListener('dragstart', handleDragStart);
            letter.addEventListener('dragend', handleDragEnd);
            letter.addEventListener('touchstart', handleTouchStart, { passive: false });
            letter.addEventListener('touchmove', handleTouchMove, { passive: false });
            letter.addEventListener('touchend', handleTouchEnd);

            // Click-to-place: clicking a letter places it in next available slot
            letter.addEventListener('click', () => handleLetterClick(letter));

            lettersContainer.appendChild(letter);
        });
    }

    // ─── Click-to-place (for kids who find drag hard) ───
    function handleLetterClick(letterEl) {
        // If letter is in pool, place in first empty slot
        if (letterEl.parentElement === lettersContainer) {
            const emptySlot = targetContainer.querySelector('.letter-slot:not(.filled):not(.hint-filled)');
            if (emptySlot) {
                emptySlot.appendChild(letterEl);
                emptySlot.classList.add('filled');
                playDrop();
                checkWinCondition();
            }
        }
        // If letter is in a slot, return to pool
        else if (letterEl.parentElement.classList.contains('letter-slot')) {
            const slot = letterEl.parentElement;
            if (slot.classList.contains('hint-filled')) return; // Don't move hint letters
            slot.classList.remove('filled');
            lettersContainer.appendChild(letterEl);
            playReturn();
        }
    }

    // ─── Drag & Drop ───
    let draggedItem = null;

    function handleDragStart(e) {
        if (this.parentElement.classList.contains('hint-filled')) {
            e.preventDefault();
            return;
        }
        draggedItem = this;
        e.dataTransfer.setData('text/plain', this.dataset.char);
        e.dataTransfer.effectAllowed = 'move';
        requestAnimationFrame(() => this.style.opacity = '0.4');
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        draggedItem = null;
        // Remove all highlights
        targetContainer.querySelectorAll('.letter-slot').forEach(s => s.classList.remove('highlight'));
    }

    function handleSlotDrop(e, slot) {
        e.preventDefault();
        slot.classList.remove('highlight');

        if (!draggedItem) return;

        if (!slot.classList.contains('filled') && !slot.classList.contains('hint-filled')) {
            // Place letter
            const sourceSlot = draggedItem.parentElement;
            if (sourceSlot.classList.contains('letter-slot')) {
                sourceSlot.classList.remove('filled');
            }
            slot.appendChild(draggedItem);
            slot.classList.add('filled');
            draggedItem.style.opacity = '1';
            playDrop();
            draggedItem = null;
            checkWinCondition();
        } else if (slot.classList.contains('filled') && !slot.classList.contains('hint-filled')) {
            // Swap letters
            const existingLetter = slot.firstChild;
            const sourceSlot = draggedItem.parentElement;

            if (sourceSlot.classList.contains('letter-slot')) {
                sourceSlot.appendChild(existingLetter);
                sourceSlot.classList.add('filled');
            } else {
                lettersContainer.appendChild(existingLetter);
            }

            slot.appendChild(draggedItem);
            slot.classList.add('filled');
            draggedItem.style.opacity = '1';
            playDrop();
            draggedItem = null;
            checkWinCondition();
        }
    }

    // Return to pool
    lettersContainer.addEventListener('dragover', e => e.preventDefault());
    lettersContainer.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedItem) {
            const sourceSlot = draggedItem.parentElement;
            if (sourceSlot.classList.contains('letter-slot') && !sourceSlot.classList.contains('hint-filled')) {
                sourceSlot.classList.remove('filled');
            }
            lettersContainer.appendChild(draggedItem);
            draggedItem.style.opacity = '1';
            playReturn();
            draggedItem = null;
        }
    });

    // ─── Touch Logic ───
    let touchTarget = null;

    function handleTouchStart(e) {
        if (this.parentElement.classList.contains('hint-filled')) return;
        e.preventDefault();
        touchTarget = this;
        const touch = e.touches[0];
        document.body.appendChild(this);
        this.style.position = 'fixed';
        this.style.zIndex = '1000';
        this.style.opacity = '0.85';
        this.style.transition = 'none';
        moveAt(touch.clientX, touch.clientY, this);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        if (!touchTarget) return;
        const touch = e.touches[0];
        moveAt(touch.clientX, touch.clientY, touchTarget);

        // Highlight drop target
        touchTarget.style.display = 'none';
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        touchTarget.style.display = 'flex';

        targetContainer.querySelectorAll('.letter-slot').forEach(s => s.classList.remove('highlight'));
        if (elementBelow) {
            const slot = elementBelow.closest('.letter-slot');
            if (slot && !slot.classList.contains('hint-filled')) {
                slot.classList.add('highlight');
            }
        }
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        if (!touchTarget) return;

        touchTarget.style.display = 'none';
        const changedTouch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
        touchTarget.style.display = 'flex';

        let dropped = false;

        if (elementBelow) {
            const slot = elementBelow.closest('.letter-slot');
            const pool = elementBelow.closest('.scrambled-letters-container');

            if (slot && !slot.classList.contains('hint-filled')) {
                if (!slot.classList.contains('filled')) {
                    resetTouchStyles(touchTarget);
                    slot.appendChild(touchTarget);
                    slot.classList.add('filled');
                    playDrop();
                    dropped = true;
                } else {
                    // Swap
                    const existing = slot.firstChild;
                    resetTouchStyles(touchTarget);
                    lettersContainer.appendChild(existing);
                    slot.appendChild(touchTarget);
                    slot.classList.add('filled');
                    playDrop();
                    dropped = true;
                }
            } else if (pool) {
                resetTouchStyles(touchTarget);
                pool.appendChild(touchTarget);
                playReturn();
                dropped = true;
            }
        }

        if (!dropped) {
            resetTouchStyles(touchTarget);
            lettersContainer.appendChild(touchTarget);
            playReturn();
        }

        targetContainer.querySelectorAll('.letter-slot').forEach(s => s.classList.remove('highlight'));
        touchTarget = null;
        checkWinCondition();
    }

    function moveAt(x, y, el) {
        el.style.left = (x - el.offsetWidth / 2) + 'px';
        el.style.top = (y - el.offsetHeight / 2) + 'px';
    }

    function resetTouchStyles(el) {
        el.style.position = '';
        el.style.zIndex = '';
        el.style.left = '';
        el.style.top = '';
        el.style.opacity = '';
        el.style.transition = '';
        el.style.transform = '';
    }

    // ─── Win Check ───
    function checkWinCondition() {
        const slots = targetContainer.querySelectorAll('.letter-slot');
        let correctCount = 0;
        let filledCount = 0;

        slots.forEach(slot => {
            if (slot.children.length > 0) {
                filledCount++;
                if (slot.children[0].dataset.char === slot.dataset.expected) {
                    correctCount++;
                }
            }
        });

        if (filledCount === slots.length) {
            if (correctCount === slots.length) {
                onWin();
            } else {
                onWrongAnswer(slots);
            }
        }
    }

    function onWin() {
        const slots = targetContainer.querySelectorAll('.letter-slot');

        // Animate correct letters with stagger
        slots.forEach((slot, i) => {
            setTimeout(() => {
                if (slot.firstChild) slot.firstChild.classList.add('correct');
            }, i * 60);
        });

        // Score: base 10 + streak bonus
        streak++;
        if (streak > bestStreak) bestStreak = streak;
        const bonus = Math.min(streak - 1, 5) * 2; // Max +10 bonus
        const points = 10 + bonus;
        score += points;
        wordsCompleted++;

        scoreEl.textContent = score;
        scoreEl.classList.remove('score-pump');
        void scoreEl.offsetWidth;
        scoreEl.classList.add('score-pump');

        updateStreak();
        updateProgress();
        playCorrect();
        fireConfetti();

        // Save high score
        const key = `anagram-highscore-${currentGrade}`;
        const prev = parseInt(localStorage.getItem(key) || '0');
        if (score > prev) localStorage.setItem(key, score);

        // Auto-advance after delay
        setTimeout(() => {
            showFeedback(
                streak >= 3 ? "Невероватно! 🔥" : "Браво! 👏",
                currentWord.word + (bonus > 0 ? ` (+${bonus} бонус!)` : ''),
                () => {
                    currentWordIndex++;
                    loadNextWord();
                },
                "Даље ➜"
            );
        }, 400);
    }

    function onWrongAnswer(slots) {
        wrongAttempts++;
        streak = 0;
        updateStreak();
        playWrong();

        // Mark wrong letters
        slots.forEach(slot => {
            if (slot.children.length > 0) {
                const letter = slot.children[0];
                if (letter.dataset.char !== slot.dataset.expected) {
                    letter.classList.add('wrong');
                    setTimeout(() => letter.classList.remove('wrong'), 400);
                }
            }
        });

        // Track difficult word for spaced repetition
        if (currentWord && !currentWord.isRetry) {
            const already = difficultWords.find(w => w.word === currentWord.word);
            if (!already) {
                difficultWords.push({ ...currentWord });
            }
        }

        setTimeout(() => {
            showFeedback("Покушај поново! 💪", "Неке слове нису на правом месту.", () => {
                // Return all letters to pool (keep hints)
                slots.forEach(slot => {
                    if (!slot.classList.contains('hint-filled') && slot.children.length > 0) {
                        lettersContainer.appendChild(slot.children[0]);
                        slot.classList.remove('filled');
                    }
                });
            });
        }, 300);
    }

    // ─── Hint System ───
    hintBtn.addEventListener('click', () => {
        if (!currentWord) return;

        const slots = targetContainer.querySelectorAll('.letter-slot:not(.hint-filled):not(.filled)');
        if (slots.length === 0) return;

        // Find a random unfilled slot
        const slot = slots[Math.floor(Math.random() * slots.length)];
        const expectedChar = slot.dataset.expected;

        // Find the matching letter in the pool
        const poolLetters = lettersContainer.querySelectorAll('.draggable-letter');
        let matchingLetter = null;
        for (const l of poolLetters) {
            if (l.dataset.char === expectedChar) {
                matchingLetter = l;
                break;
            }
        }

        // Also check letters in wrong slots
        if (!matchingLetter) {
            const allSlots = targetContainer.querySelectorAll('.letter-slot.filled:not(.hint-filled)');
            for (const s of allSlots) {
                if (s.children[0] && s.children[0].dataset.char === expectedChar) {
                    matchingLetter = s.children[0];
                    s.classList.remove('filled');
                    break;
                }
            }
        }

        if (matchingLetter) {
            slot.appendChild(matchingLetter);
            slot.classList.add('hint-filled');
            hintsUsed++;
            playHint();

            // Deduct points for hint
            score = Math.max(0, score - 3);
            scoreEl.textContent = score;

            // Disable if no more slots
            const remaining = targetContainer.querySelectorAll('.letter-slot:not(.hint-filled):not(.filled)');
            if (remaining.length <= 1) {
                hintBtn.classList.add('disabled');
            }

            checkWinCondition();
        }
    });

    // ─── Grade Complete ───
    function onGradeComplete() {
        playLevelComplete();
        fireConfetti();

        const statsEl = $('complete-stats');
        statsEl.innerHTML = `
            <div class="stat-item"><div class="stat-value">${score}</div><div class="stat-label">Поена</div></div>
            <div class="stat-item"><div class="stat-value">${wordsCompleted}</div><div class="stat-label">Речи</div></div>
            <div class="stat-item"><div class="stat-value">${bestStreak}</div><div class="stat-label">Најбољи низ</div></div>
            <div class="stat-item"><div class="stat-value">${hintsUsed}</div><div class="stat-label">Помоћи</div></div>
        `;

        const completeModal = $('complete-modal');
        completeModal.classList.add('active');
    }

    $('complete-btn').addEventListener('click', () => {
        $('complete-modal').classList.remove('active');
        startNewGame();
    });

    // ─── UI Updates ───
    function updateStreak() {
        if (streak >= 2) {
            streakBadge.classList.remove('hidden');
            streakCount.textContent = streak;
        } else {
            streakBadge.classList.add('hidden');
        }
    }

    function updateProgress() {
        const pct = totalWordsInGrade > 0 ? (wordsCompleted / totalWordsInGrade * 100) : 0;
        progressBar.style.width = pct + '%';
        progressText.textContent = `${wordsCompleted} / ${totalWordsInGrade}`;
    }

    // ─── Modals ───
    const feedbackModal = $('feedback-modal');
    const feedbackTitle = $('feedback-title');
    const feedbackMsg = $('feedback-message');
    const feedbackBtn = $('feedback-btn');
    let feedbackCallback = null;

    function showFeedback(title, message, callback = null, btnText = "ОК") {
        feedbackTitle.textContent = title;
        feedbackMsg.textContent = message;
        feedbackBtn.textContent = btnText;
        feedbackCallback = callback;
        feedbackModal.classList.add('active');
    }

    feedbackBtn.addEventListener('click', () => {
        feedbackModal.classList.remove('active');
        if (feedbackCallback) feedbackCallback();
    });

    // Confirm modal
    const confirmModal = $('confirm-modal');
    let confirmCallback = null;

    $('confirm-yes').addEventListener('click', () => {
        confirmModal.classList.remove('active');
        if (confirmCallback) confirmCallback();
    });

    $('confirm-no').addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });

    resetBtn.addEventListener('click', () => {
        confirmCallback = () => startNewGame();
        confirmModal.classList.add('active');
    });

    // ─── Grade Buttons ───
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGrade = btn.dataset.grade;
            startNewGame();
        });
    });

    // ─── Toggles ───
    imgToggle.addEventListener('change', e => {
        localStorage.setItem('img-toggle', e.target.checked);
        if (currentWord) renderGame(currentWord);
    });

    if (localStorage.getItem('img-toggle') === null) {
        localStorage.setItem('img-toggle', 'true');
        imgToggle.checked = true;
    } else {
        imgToggle.checked = localStorage.getItem('img-toggle') === 'true';
    }

    nightToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const isNight = document.body.classList.contains('night-mode');
        localStorage.setItem('night-mode', isNight);
        nightToggle.textContent = isNight ? '☀️' : '🌙';
    });

    // Restore night mode
    if (localStorage.getItem('night-mode') === 'true') {
        document.body.classList.add('night-mode');
        nightToggle.textContent = '☀️';
    }

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('sound', soundEnabled);
        soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
        soundToggle.classList.toggle('muted', !soundEnabled);
    });

    if (localStorage.getItem('sound') === 'false') {
        soundEnabled = false;
        soundToggle.textContent = '🔇';
        soundToggle.classList.add('muted');
    }

    // ─── Start ───
    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        // Initialize audio context on user gesture
        getAudioCtx();
    });

    // Show high score on start screen
    const hs = parseInt(localStorage.getItem(`anagram-highscore-${currentGrade}`) || '0');
    if (hs > 0) {
        startHighscore.textContent = `Рекорд: ${hs} поена`;
    }

    // ─── Confetti System ───
    let confettiParticles = [];
    let confettiAnimating = false;

    function resizeConfettiCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }

    function fireConfetti() {
        resizeConfettiCanvas();
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#01a3a4', '#f368e0'];
        const w = confettiCanvas.width;
        const h = confettiCanvas.height;

        for (let i = 0; i < 60; i++) {
            confettiParticles.push({
                x: w / 2 + (Math.random() - 0.5) * 100,
                y: h / 2,
                vx: (Math.random() - 0.5) * 12,
                vy: -Math.random() * 10 - 3,
                w: Math.random() * 8 + 4,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 15,
                life: 1
            });
        }

        if (!confettiAnimating) {
            confettiAnimating = true;
            animateConfetti();
        }
    }

    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiParticles.forEach(p => {
            p.x += p.vx;
            p.vy += 0.2; // gravity
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.life -= 0.012;

            if (p.life > 0) {
                confettiCtx.save();
                confettiCtx.translate(p.x, p.y);
                confettiCtx.rotate(p.rotation * Math.PI / 180);
                confettiCtx.globalAlpha = p.life;
                confettiCtx.fillStyle = p.color;
                confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                confettiCtx.restore();
            }
        });

        confettiParticles = confettiParticles.filter(p => p.life > 0);

        if (confettiParticles.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            confettiAnimating = false;
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }

    // ─── Keyboard support (for desktop/older kids) ───
    document.addEventListener('keydown', e => {
        if (feedbackModal.classList.contains('active')) {
            if (e.key === 'Enter' || e.key === ' ') {
                feedbackBtn.click();
            }
            return;
        }

        if (confirmModal.classList.contains('active')) {
            if (e.key === 'Enter') $('confirm-yes').click();
            if (e.key === 'Escape') $('confirm-no').click();
            return;
        }

        // Type letter to place it
        const typedChar = e.key.toUpperCase();
        // Check if it's a Cyrillic letter
        if (/^[\u0400-\u04FF]$/.test(typedChar)) {
            // Find matching letter in pool
            const poolLetters = lettersContainer.querySelectorAll('.draggable-letter');
            for (const l of poolLetters) {
                if (l.dataset.char === typedChar) {
                    handleLetterClick(l);
                    break;
                }
            }
        }

        // Backspace: return last placed letter
        if (e.key === 'Backspace') {
            const filledSlots = targetContainer.querySelectorAll('.letter-slot.filled:not(.hint-filled)');
            if (filledSlots.length > 0) {
                const lastSlot = filledSlots[filledSlots.length - 1];
                if (lastSlot.children.length > 0) {
                    handleLetterClick(lastSlot.children[0]);
                }
            }
        }
    });

    // ─── Init ───
    try {
        startNewGame();
    } catch (e) {
        console.error('Init error:', e);
    }
});
