/* ==========================================================================
   app_logic.js - Shared Header/Footer Injection, State & Page Controllers
   ========================================================================== */

// Format currency in LKR Millions
function formatLKR(amount) {
    const millions = amount / 1000000;
    return `LKR ${millions.toFixed(1)}M`;
}

function formatFullLKR(amount) {
    return "LKR " + Math.round(amount).toLocaleString("en-US");
}

// Get URL Query Parameter
function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

// Active Page tracking
window.auraActivePage = "home";
let auraAuthSuccessCallback = null;

// User Authentication State
function getCurrentUser() {
    try {
        const u = localStorage.getItem("aura_current_user");
        return u ? JSON.parse(u) : null;
    } catch (e) {
        return null;
    }
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem("aura_current_user", JSON.stringify(user));
    } else {
        localStorage.removeItem("aura_current_user");
    }
    window.dispatchEvent(new CustomEvent("aura-auth-changed", { detail: user }));
    renderSharedLayout(window.auraActivePage);
}

function getRegisteredUsers() {
    try {
        const raw = localStorage.getItem("aura_users_db");
        if (raw) {
            const list = JSON.parse(raw);
            if (Array.isArray(list) && list.length > 0) return list;
        }
    } catch (e) {}
    const defaults = [
        { name: "Kasun Perera", email: "kasun@aura.lk", phone: "+94 77 123 4567", password: "password123" },
        { name: "Dr. Dilini Silva", email: "dilini@aura.lk", phone: "+94 71 987 6543", password: "password123" }
    ];
    try {
        localStorage.setItem("aura_users_db", JSON.stringify(defaults));
    } catch (e) {}
    return defaults;
}

function handleSignOut() {
    setCurrentUser(null);
    if (typeof onAuthStatusChanged === "function") {
        onAuthStatusChanged(null);
    }
}

// Global Auth Modal Logic
function ensureAuthModal() {
    if (document.getElementById("aura-auth-modal")) return;

    const modal = document.createElement("div");
    modal.id = "aura-auth-modal";
    modal.className = "fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 hidden";
    modal.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white animate-fadeIn">
            <!-- Modal Header -->
            <div class="p-6 pb-4 border-b border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow">
                        A
                    </div>
                    <div>
                        <h3 class="font-serif-luxury text-lg font-bold text-white">AURA Member Access</h3>
                        <p class="text-[11px] text-amber-400 font-medium">Slot Reservation & VIP Inspection Pass</p>
                    </div>
                </div>
                <button type="button" onclick="closeAuthModal()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <!-- Informational Notice -->
            <div id="auth-modal-notice" class="mx-6 mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 leading-relaxed">
                <i class="fa-solid fa-shield-halved text-amber-400 mt-0.5 shrink-0 text-sm"></i>
                <span>Browsing properties, specs & pricing is open to all visitors. Sign-in is required to reserve an inspection slot and receive your verified VIP Gate Pass.</span>
            </div>

            <!-- Tab Switcher -->
            <div class="px-6 pt-4 flex gap-2">
                <button type="button" id="tab-btn-signin" onclick="switchAuthTab('signin')" class="flex-1 py-2.5 text-xs font-bold rounded-xl transition bg-amber-500 text-slate-950 shadow">
                    Sign In
                </button>
                <button type="button" id="tab-btn-signup" onclick="switchAuthTab('signup')" class="flex-1 py-2.5 text-xs font-semibold rounded-xl transition bg-slate-800 hover:bg-slate-700 text-slate-300">
                    Create Free Account
                </button>
            </div>

            <div class="p-6 pt-4">
                <!-- Sign In Form -->
                <form id="form-auth-signin" onsubmit="handleAuthSignIn(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-400 mb-1.5">Email Address</label>
                        <input type="email" id="signin-email" required placeholder="kasun@aura.lk"
                            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-400 mb-1.5">Password</label>
                        <input type="password" id="signin-password" required placeholder="••••••••"
                            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500">
                    </div>

                    <!-- 1-Click Demo Login -->
                    <button type="button" onclick="fillDemoAndLogin()" class="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition">
                        <i class="fa-solid fa-bolt text-amber-400"></i>
                        <span>⚡ 1-Click Instant Demo Login (Kasun Perera)</span>
                    </button>

                    <div id="signin-error" class="hidden text-xs text-rose-300 bg-rose-950/60 p-3 rounded-xl border border-rose-800/60"></div>

                    <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow">
                        <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        <span>Sign In to Continue</span>
                    </button>
                </form>

                <!-- Sign Up Form -->
                <form id="form-auth-signup" onsubmit="handleAuthSignUp(event)" class="space-y-3.5 hidden">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name</label>
                        <input type="text" id="signup-name" required placeholder="e.g. Kasun Perera"
                            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address</label>
                        <input type="email" id="signup-email" required placeholder="e.g. kasun@example.com"
                            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Mobile / WhatsApp (+94)</label>
                        <input type="tel" id="signup-phone" required placeholder="+94 77 123 4567"
                            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Create Password</label>
                        <input type="password" id="signup-password" required placeholder="Minimum 4 characters"
                            class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500">
                    </div>

                    <div id="signup-error" class="hidden text-xs text-rose-300 bg-rose-950/60 p-3 rounded-xl border border-rose-800/60"></div>

                    <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow mt-2">
                        <i class="fa-solid fa-user-plus"></i>
                        <span>Create VIP Account & Continue</span>
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function openAuthModal(initialTab = "signin", callback = null, customNotice = null) {
    ensureAuthModal();
    auraAuthSuccessCallback = callback;
    const modal = document.getElementById("aura-auth-modal");
    const noticeEl = document.getElementById("auth-modal-notice");
    if (customNotice) {
        noticeEl.innerHTML = `<i class="fa-solid fa-shield-halved text-amber-400 mt-0.5 shrink-0 text-sm"></i><span>${customNotice}</span>`;
    } else {
        noticeEl.innerHTML = `<i class="fa-solid fa-shield-halved text-amber-400 mt-0.5 shrink-0 text-sm"></i><span>Browsing properties, specs & pricing is open to all visitors. Sign-in is required to reserve an inspection slot and receive your verified VIP Gate Pass.</span>`;
    }
    switchAuthTab(initialTab);
    modal.classList.remove("hidden");
}

function closeAuthModal() {
    const modal = document.getElementById("aura-auth-modal");
    if (modal) modal.classList.add("hidden");
    const errIn = document.getElementById("signin-error");
    if (errIn) errIn.classList.add("hidden");
    const errUp = document.getElementById("signup-error");
    if (errUp) errUp.classList.add("hidden");
}

function switchAuthTab(tab) {
    const signinForm = document.getElementById("form-auth-signin");
    const signupForm = document.getElementById("form-auth-signup");
    const btnIn = document.getElementById("tab-btn-signin");
    const btnUp = document.getElementById("tab-btn-signup");

    if (tab === "signin") {
        signinForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        btnIn.className = "flex-1 py-2.5 text-xs font-bold rounded-xl transition bg-amber-500 text-slate-950 shadow";
        btnUp.className = "flex-1 py-2.5 text-xs font-semibold rounded-xl transition bg-slate-800 hover:bg-slate-700 text-slate-300";
    } else {
        signinForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        btnUp.className = "flex-1 py-2.5 text-xs font-bold rounded-xl transition bg-amber-500 text-slate-950 shadow";
        btnIn.className = "flex-1 py-2.5 text-xs font-semibold rounded-xl transition bg-slate-800 hover:bg-slate-700 text-slate-300";
    }
}

function fillDemoAndLogin() {
    document.getElementById("signin-email").value = "kasun@aura.lk";
    document.getElementById("signin-password").value = "password123";
    const users = getRegisteredUsers();
    const user = users.find(u => u.email.toLowerCase() === "kasun@aura.lk");
    if (user) {
        completeAuthSuccess(user);
    }
}

function handleAuthSignIn(e) {
    e.preventDefault();
    const email = document.getElementById("signin-email").value.trim().toLowerCase();
    const pass = document.getElementById("signin-password").value;
    const users = getRegisteredUsers();
    const user = users.find(u => u.email.toLowerCase() === email && u.password === pass);
    const errEl = document.getElementById("signin-error");

    if (!user) {
        errEl.textContent = "Invalid email or password. Please try demo login or create a free account.";
        errEl.classList.remove("hidden");
        return;
    }
    errEl.classList.add("hidden");
    completeAuthSuccess(user);
}

function handleAuthSignUp(e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim().toLowerCase();
    const phone = document.getElementById("signup-phone").value.trim();
    const pass = document.getElementById("signup-password").value;
    const errEl = document.getElementById("signup-error");

    if (pass.length < 4) {
        errEl.textContent = "Password must be at least 4 characters long.";
        errEl.classList.remove("hidden");
        return;
    }

    const users = getRegisteredUsers();
    if (users.some(u => u.email.toLowerCase() === email)) {
        errEl.textContent = "An account with this email already exists. Please sign in.";
        errEl.classList.remove("hidden");
        return;
    }

    const newUser = { name, email, phone, password: pass };
    users.push(newUser);
    localStorage.setItem("aura_users_db", JSON.stringify(users));
    errEl.classList.add("hidden");
    completeAuthSuccess(newUser);
}

function completeAuthSuccess(user) {
    setCurrentUser(user);
    closeAuthModal();
    if (typeof auraAuthSuccessCallback === "function") {
        auraAuthSuccessCallback(user);
        auraAuthSuccessCallback = null;
    }
    if (typeof onAuthStatusChanged === "function") {
        onAuthStatusChanged(user);
    }
}

// Shared Navigation & Footer Renderer
function renderSharedLayout(activePage) {
    window.auraActivePage = activePage || "home";
    const user = getCurrentUser();

    const navItems = [
        { id: "home", label: "Home", href: "index.html", icon: "fa-house" },
        { id: "projects", label: "Projects", href: "projects.html", icon: "fa-building" },
        { id: "slots", label: "Available Slots", href: "available-slots.html", icon: "fa-layer-group" },
        { id: "calculator", label: "EMI & Payment Plans", href: "financial-calculator.html", icon: "fa-calculator" },
        { id: "book", label: "Book a Tour", href: "book-tour.html", icon: "fa-calendar-check" }
    ];

    const headerEl = document.getElementById("shared-header");
    if (headerEl) {
        headerEl.innerHTML = `
        <header class="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <a href="index.html" class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-md">
                        A
                    </div>
                    <div>
                        <span class="font-serif-luxury text-xl tracking-wider font-bold text-white block leading-none">AURA</span>
                        <span class="text-[10px] uppercase tracking-[0.25em] text-amber-400 block mt-1">Developments PLC</span>
                    </div>
                </a>

                <nav class="hidden lg:flex items-center gap-6">
                    ${navItems.map(item => `
                        <a href="${item.href}" class="py-2 text-sm font-medium transition flex items-center gap-2 ${activePage === item.id ? 'nav-link-active text-amber-400' : 'text-slate-300 hover:text-white'}">
                            <i class="fa-solid ${item.icon} text-xs opacity-75"></i> ${item.label}
                        </a>
                    `).join("")}
                </nav>

                <div class="flex items-center gap-2 sm:gap-3">
                    ${user ? `
                        <div class="flex items-center gap-2 bg-slate-900 border border-slate-700/80 pl-2 pr-3 py-1.5 rounded-xl text-xs">
                            <div class="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                                ${user.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="hidden sm:block text-left">
                                <span class="font-semibold text-white block leading-none text-xs">${user.name}</span>
                                <span class="text-[9px] text-amber-400 block mt-0.5 font-medium">VIP Member</span>
                            </div>
                            <button type="button" onclick="handleSignOut()" class="ml-1 text-slate-400 hover:text-rose-400 transition p-1" title="Sign Out">
                                <i class="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                            </button>
                        </div>
                    ` : `
                        <button type="button" onclick="openAuthModal('signin')" class="text-xs font-semibold text-slate-200 hover:text-white px-3 sm:px-3.5 py-2 rounded-lg border border-slate-700 hover:border-amber-500/60 transition flex items-center gap-1.5 bg-slate-900/60">
                            <i class="fa-solid fa-arrow-right-to-bracket text-amber-400"></i>
                            <span>Sign In</span>
                        </button>
                    `}

                    <a href="book-tour.html" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg transition shadow-sm flex items-center gap-2">
                        <i class="fa-regular fa-calendar-check"></i>
                        <span>Schedule Visit</span>
                    </a>
                </div>
            </div>
            <!-- Mobile Scrollable Sub-Nav -->
            <div class="lg:hidden flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800 text-xs">
                <div class="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
                    ${navItems.map(item => `
                        <a href="${item.href}" class="px-2.5 py-1 rounded ${activePage === item.id ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}">
                            <i class="fa-solid ${item.icon} mr-1"></i>${item.label}
                        </a>
                    `).join("")}
                </div>
                ${!user ? `
                    <button type="button" onclick="openAuthModal('signin')" class="ml-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold shrink-0">
                        Sign In
                    </button>
                ` : `
                    <button type="button" onclick="handleSignOut()" class="ml-2 px-2 py-1 text-slate-400 hover:text-rose-400 shrink-0" title="Sign Out">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                `}
            </div>
        </header>`;
    }

    ensureAuthModal();

    const footerEl = document.getElementById("shared-footer");
    if (footerEl) {
        footerEl.innerHTML = `
        <footer class="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-9 h-9 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">A</div>
                        <span class="font-serif-luxury text-lg text-white font-bold">AURA DEVELOPMENTS</span>
                    </div>
                    <p class="text-sm text-slate-400 leading-relaxed">
                        Grade-A CIDA registered luxury apartment & gated housing scheme developer delivering architectural landmarks since 2008.
                    </p>
                </div>
                <div>
                    <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Navigation</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="projects.html" class="hover:text-amber-400 transition">Completed & Ongoing Projects</a></li>
                        <li><a href="available-slots.html" class="hover:text-amber-400 transition">Interactive Available Slots</a></li>
                        <li><a href="financial-calculator.html" class="hover:text-amber-400 transition">EMI & Milestone Payment Plans</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Developments</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="available-slots.html?project=aura-sky" class="hover:text-amber-400 transition">Aura Sky Residences (Completed)</a></li>
                        <li><a href="available-slots.html?project=marina-crest" class="hover:text-amber-400 transition">Marina One Crest (Ongoing)</a></li>
                        <li><a href="available-slots.html?project=emerald-villas" class="hover:text-amber-400 transition">Emerald Sanctuary Villas (Completed)</a></li>
                        <li><a href="available-slots.html?project=botanica-golf" class="hover:text-amber-400 transition">Aura Botanica Golf Homes (Ongoing)</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Experience Center</h4>
                    <p class="text-sm mb-2"><i class="fa-solid fa-location-dot text-amber-400 mr-2"></i>Level 14, Aura Tower, Colombo 03</p>
                    <p class="text-sm mb-2"><i class="fa-solid fa-phone text-amber-400 mr-2"></i>+94 11 234 5678</p>
                    <p class="text-sm mb-4"><i class="fa-solid fa-clock text-amber-400 mr-2"></i>Daily: 9:00 AM – 6:30 PM</p>
                    <a href="book-tour.html" class="inline-block bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-semibold px-4 py-2 rounded transition">
                        Book Physical or Model Visit →
                    </a>
                </div>
            </div>
            <div class="border-t border-slate-900 py-5 text-center text-xs text-slate-500">
                © 2026 Aura Developments PLC. All projects approved by UDA & Condominium Management Authority.
            </div>
        </footer>`;
    }
}