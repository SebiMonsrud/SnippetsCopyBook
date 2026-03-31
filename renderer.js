// Data Structure Ensurences
let appData = {
    categories: [],
    snippets: [],
    builderItems: [],
    settings: {
        theme: 'dark',
        templates: []
    }
};
let activeView = 'category'; // 'category', 'settings', or 'builder'
let activeCategoryId = null;

// DOM Elements
const categoriesList = document.getElementById('categories-list');
const snippetsGrid = document.getElementById('snippets-grid');
const currentCategoryTitle = document.getElementById('current-category-title');
const addSnippetBtn = document.getElementById('add-snippet-btn');
const toast = document.getElementById('toast');

const mainPanel = document.getElementById('main-panel');
const settingsPanel = document.getElementById('settings-panel');
const settingsBtn = document.getElementById('settings-btn');
const themeInputs = document.querySelectorAll('input[name="theme"]');
const templatesList = document.getElementById('templates-list');

// Builder Elements
const builderPanel = document.getElementById('builder-panel');
const builderBtn = document.getElementById('builder-btn');
const builderList = document.getElementById('builder-list');
const copyBuilderBtn = document.getElementById('copy-builder-btn');
const addBuilderBtn = document.getElementById('add-builder-btn');
const newBuilderInput = document.getElementById('new-builder-input');

// Pin & Search
const pinBtn = document.getElementById('pin-btn');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');

// Modals
const categoryModal = document.getElementById('category-modal');
const categoryNameInput = document.getElementById('category-name-input');
const snippetModal = document.getElementById('snippet-modal');
const snippetTitleInput = document.getElementById('snippet-title-input');
const snippetTextInput = document.getElementById('snippet-text-input');
const snippetModalTitle = document.getElementById('snippet-modal-title');
const editingSnippetId = document.getElementById('editing-snippet-id');

// Sortable Instance
let sortableInstance = null;

// Utilities
const generateId = () => Math.random().toString(36).substring(2, 9);
const padZero = (n) => n < 10 ? '0' + n : n;

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Load data initially
async function initApp() {
    const platform = await window.electronAPI.getPlatform();
    document.body.classList.add(`platform-${platform}`);

    const data = await window.electronAPI.getData();
    if (data) {
        if (!data.settings) data.settings = { theme: 'dark', templates: [] };
        if (!data.settings.templates) data.settings.templates = [];
        
        // Oppsett av tomme builderItems hvis de mangler (hindrer feil)
        if (!data.builderItems) {
            data.builderItems = [];
        }
        
        // Migrate old snippets to have a title
        if (data.snippets) {
            data.snippets.forEach(s => {
                if (!s.title) s.title = "Uten Tittel"; 
            });
        }
        
        appData = data;
    }

    applyTheme(appData.settings.theme);

    if (appData.categories.length > 0) {
        activeCategoryId = appData.categories[0].id;
    }

    renderUI();
}

async function saveData() {
    await window.electronAPI.saveData(appData);
}

// Navigation & Theming
function setView(view) {
    activeView = view;
    
    // Nullstill alle view highlights
    settingsBtn.classList.remove('active');
    builderBtn.classList.remove('active');
    mainPanel.style.display = 'none';
    settingsPanel.style.display = 'none';
    builderPanel.style.display = 'none';
    
    if (view === 'settings') {
        settingsBtn.classList.add('active');
        settingsPanel.style.display = 'flex';
        renderSettings();
    } else if (view === 'builder') {
        builderBtn.classList.add('active');
        builderPanel.style.display = 'flex';
        renderBuilder();
    } else {
        mainPanel.style.display = 'flex';
    }
    
    // Oppdater kategorilistens farger for å fjerne highlight hvis vi ikke ser på kategori
    renderCategoriesSidebar();
}

settingsBtn.onclick = () => setView('settings');
builderBtn.onclick = () => setView('builder');

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('theme-light');
    } else {
        document.body.classList.remove('theme-light');
    }
    themeInputs.forEach(input => {
        input.checked = input.value === theme;
    });
}

themeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        const t = e.target.value;
        appData.settings.theme = t;
        applyTheme(t);
        saveData();
    });
});

// Pin Feature
pinBtn.onclick = async () => {
    const isAlwaysOnTop = await window.electronAPI.toggleAlwaysOnTop();
    pinBtn.classList.toggle('active', isAlwaysOnTop);
};

// Template Mechanism
function parseSnippet(text) {
    if (!text) return "";
    let result = text;
    const now = new Date();
    const dateStr = `${padZero(now.getDate())}/${padZero(now.getMonth() + 1)}-${now.getFullYear().toString().substring(2)}`;
    result = result.replace(/<dato>/gi, dateStr);

    appData.settings.templates.forEach(t => {
        const regex = new RegExp(`<${escapeRegExp(t.key)}>`, 'gi');
        result = result.replace(regex, t.value);
    });

    return result;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

// Builder Panel Rendering
function renderBuilder() {
    builderList.innerHTML = '';
    
    appData.builderItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'builder-item';
        div.innerHTML = `
            <label>
                <input type="checkbox" value="${item.id}" class="builder-checkbox">
                <span>${escapeHTML(item.text)}</span>
            </label>
            <button class="card-action-btn delete-btn" title="Slett valg" style="border: none; background: transparent; padding: 4px;">
                <i class="ph ph-trash"></i>
            </button>
        `;
        
        div.querySelector('.delete-btn').onclick = (e) => {
            e.stopPropagation();
            if (confirm(`Er du sikker på at du vil fjerne "${item.text}" fra byggeren?`)) {
                appData.builderItems = appData.builderItems.filter(b => b.id !== item.id);
                saveData().then(renderBuilder);
            }
        };

        builderList.appendChild(div);
    });

    if (appData.builderItems.length === 0) {
        builderList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Ingen sjekkliste-valg enda. Legg til en under!</p>';
    }
}

addBuilderBtn.onclick = () => {
    const text = newBuilderInput.value.trim();
    if (text) {
        appData.builderItems.push({ id: generateId(), text });
        saveData().then(() => {
            newBuilderInput.value = '';
            renderBuilder();
        });
    }
};

newBuilderInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addBuilderBtn.click();
});

copyBuilderBtn.onclick = () => {
    const checkedBoxes = document.querySelectorAll('.builder-checkbox:checked');
    if (checkedBoxes.length === 0) {
        alert("Du må velge minst én service for å kopiere!");
        return;
    }
    
    // Finn teksten for de valgte boksene
    const selectedTexts = Array.from(checkedBoxes).map(cb => {
        const item = appData.builderItems.find(b => b.id === cb.value);
        return item ? item.text : '';
    }).filter(t => t);
    
    // Header format
    let header = "<navn>, <dato>";
    header = parseSnippet(header); 
    
    // Full tekst med bindestreker
    const fullText = header + "\n- " + selectedTexts.join("\n- ");
    
    window.electronAPI.copyToClipboard(fullText);
    showToast();
    
    // Fjern avkrysninger automatisk (klar for neste bil)
    checkedBoxes.forEach(cb => cb.checked = false);
};

// Settings Panel Rendering
function renderSettings() {
    renderTemplatesList();
}

function renderTemplatesList() {
    templatesList.innerHTML = '';
    appData.settings.templates.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${escapeHTML(t.key)}</code></td>
            <td>${escapeHTML(t.value)}</td>
            <td>
                <button class="card-action-btn delete-btn" style="padding: 4px; font-size: 14px;" title="Slett">
                    <i class="ph ph-trash"></i>
                </button>
            </td>
        `;

        tr.querySelector('.delete-btn').onclick = () => {
             if (confirm(`Vil du slette malen <${t.key}>?`)) {
                 appData.settings.templates = appData.settings.templates.filter(x => x.id !== t.id);
                 saveData().then(renderTemplatesList);
             }
        };

        templatesList.appendChild(tr);
    });

    if (appData.settings.templates.length === 0) {
        templatesList.innerHTML = '<tr><td colspan="3" style="text-align:center; color: var(--text-secondary); padding: 20px;">Ingen maler opprettet enda. Legg til en under!</td></tr>';
    }
}

document.getElementById('add-template-btn').onclick = () => {
    const keyInput = document.getElementById('new-template-key');
    const valueInput = document.getElementById('new-template-value');
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    if (key && valueInput.value !== undefined) {
        if (appData.settings.templates.find(t => t.key.toLowerCase() === key.toLowerCase())) {
            alert('En mal med denne koden eksisterer allerede!');
            return;
        }
        appData.settings.templates.push({ id: generateId(), key, value });
        saveData().then(() => {
            keyInput.value = '';
            valueInput.value = '';
            renderTemplatesList();
        });
    } else {
        alert('Vennligst fyll ut kode for malen.');
    }
};

// Main UI Rendering
function renderUI() {
    renderCategoriesSidebar();
    if (activeView === 'category') {
        renderSnippets();
        updateHeader();
    }
}

function updateHeader() {
    if (activeCategoryId) {
        const category = appData.categories.find(c => c.id === activeCategoryId);
        if (category) {
            currentCategoryTitle.textContent = category.name;
            addSnippetBtn.disabled = false;
            searchContainer.style.display = 'flex';
        }
    } else {
        currentCategoryTitle.textContent = "Velg en kategori";
        addSnippetBtn.disabled = true;
        searchContainer.style.display = 'none';
    }
}

function renderCategoriesSidebar() {
    categoriesList.innerHTML = '';
    
    appData.categories.forEach(cat => {
        const li = document.createElement('li');
        const isActive = activeView === 'category' && cat.id === activeCategoryId;
        li.className = `category-item ${isActive ? 'active' : ''}`;
        li.innerHTML = `
            <i class="ph ph-folder"></i>
            <span>${escapeHTML(cat.name)}</span>
        `;
        li.onclick = () => {
            activeCategoryId = cat.id;
            searchInput.value = ''; // Nullstill søk ved bytte av kategori
            setView('category');
            renderUI();
        };
        categoriesList.appendChild(li);
    });

    if (appData.categories.length === 0) {
        categoriesList.innerHTML = '<li style="padding: 10px 14px; color: var(--text-secondary); font-size: 13px;">Ingen kategorier enda</li>';
    }
}

function renderSnippets() {
    snippetsGrid.innerHTML = '';
    
    if (sortableInstance) {
        sortableInstance.destroy();
        sortableInstance = null;
    }
    
    if (!activeCategoryId) return;

    let filteredSnippets = appData.snippets.filter(s => s.categoryId === activeCategoryId);
    
    // Live Search Logic
    const query = searchInput.value.trim().toLowerCase();
    const isSearching = query !== '';

    if (isSearching) {
        filteredSnippets = filteredSnippets.filter(s => 
            (s.title && s.title.toLowerCase().includes(query)) || 
            (s.text && s.text.toLowerCase().includes(query))
        );
    }

    if (filteredSnippets.length === 0) {
        const emptyMsg = isSearching ? 'Ingen treff på søket ditt.' : 'Ingen paragrafer i denne kategorien enda. <br/><br/><span style="font-size: 13px; opacity: 0.7;">Trykk på Ny Paragraf for å legge til.</span>';
        snippetsGrid.innerHTML = `
            <div class="empty-state">
                <i class="ph ph-note-blank"></i>
                <p>${emptyMsg}</p>
            </div>
        `;
        return;
    }

    filteredSnippets.forEach(snippet => {
        const card = document.createElement('div');
        card.className = 'snippet-card';
        card.dataset.id = snippet.id;
        
        // Show handle if not filtering
        if (!isSearching) {
            card.innerHTML = `
                <div class="drag-handle" title="Dra for å flytte"><i class="ph ph-dots-six-vertical"></i></div>
            `;
        } else {
            card.innerHTML = ``;
        }

        card.innerHTML += `
            <div class="snippet-title">${escapeHTML(snippet.title || 'Uten Tittel')}</div>
            <div class="snippet-text">${escapeHTML(snippet.text)}</div>
            <div class="snippet-actions">
                <button class="card-action-btn edit-btn" title="Rediger"><i class="ph ph-pencil"></i></button>
                <button class="card-action-btn delete-btn" title="Slett"><i class="ph ph-trash"></i></button>
            </div>
        `;
        
        // Copy to clipboard on full card click
        card.onclick = (e) => {
            // Prevent copy if clicking on action buttons or drag handle
            if (e.target.closest('.snippet-actions') || e.target.closest('.drag-handle')) return;
            const parsedText = parseSnippet(snippet.text);
            window.electronAPI.copyToClipboard(parsedText);
            showToast();
        };

        // Rediger
        card.querySelector('.edit-btn').onclick = (e) => {
            e.stopPropagation();
            snippetModalTitle.textContent = 'Rediger Paragraf';
            editingSnippetId.value = snippet.id;
            snippetTitleInput.value = snippet.title || '';
            snippetTextInput.value = snippet.text;
            snippetModal.classList.add('active');
            snippetTitleInput.focus();
        };

        // Slett
        card.querySelector('.delete-btn').onclick = (e) => {
            e.stopPropagation(); 
            if (confirm(`Er du sikker på at du vil slette "${snippet.title}"?`)) {
                appData.snippets = appData.snippets.filter(s => s.id !== snippet.id);
                saveData().then(() => renderSnippets());
            }
        };

        snippetsGrid.appendChild(card);
    });
    
    // Aktiver drag-and-drop frihet hvis man ikke søker
    if (!isSearching) {
        sortableInstance = new Sortable(snippetsGrid, {
            animation: 150,
            ghostClass: 'dragging',
            handle: '.drag-handle',
            onEnd: function () {
                // Hent ny rekkefølge av ID'er fra skjermen
                const newOrder = Array.from(snippetsGrid.children).map(c => c.dataset.id);
                if (newOrder.length === 0) return;
                
                // Finn kort for aktiv kategori (disse skal sorteres) og de som tilhører andre kategorier (disse skal stå i ro bak sceneteppet)
                const activeSnippets = appData.snippets.filter(s => s.categoryId === activeCategoryId);
                const otherSnippets = appData.snippets.filter(s => s.categoryId !== activeCategoryId);
                
                // Sorter aktive kort basert på ID'enes plassering i interfacet
                activeSnippets.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
                
                // Lagre ny universal rekkefølge
                appData.snippets = [...otherSnippets, ...activeSnippets];
                
                saveData(); // Lydløs lagring (trenger ikke rendre, skjermen er allerede riktig)
            }
        });
    }
}

// Live Search Event Listener
searchInput.addEventListener('input', () => {
    if (activeView === 'category') renderSnippets();
});

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Event Listeners for Modals
document.getElementById('add-category-btn').onclick = () => {
    categoryModal.classList.add('active');
    categoryNameInput.focus();
};

document.getElementById('cancel-category-btn').onclick = () => {
    categoryModal.classList.remove('active');
    categoryNameInput.value = '';
};

document.getElementById('save-category-btn').onclick = () => {
    const name = categoryNameInput.value.trim();
    if (name) {
        const newCat = { id: generateId(), name };
        appData.categories.push(newCat);
        activeCategoryId = newCat.id; // Switch to new category
        searchInput.value = '';
        setView('category');
        saveData().then(() => {
            renderUI();
            categoryModal.classList.remove('active');
            categoryNameInput.value = '';
        });
    }
};

document.getElementById('add-snippet-btn').onclick = () => {
    if (!activeCategoryId) return;
    snippetModalTitle.textContent = 'Ny Paragraf';
    editingSnippetId.value = '';
    snippetTitleInput.value = '';
    snippetTextInput.value = '';
    snippetModal.classList.add('active');
    snippetTitleInput.focus();
};

document.getElementById('cancel-snippet-btn').onclick = () => {
    snippetModal.classList.remove('active');
    snippetTitleInput.value = '';
    snippetTextInput.value = '';
    editingSnippetId.value = '';
};

document.getElementById('save-snippet-btn').onclick = () => {
    const title = snippetTitleInput.value.trim() || 'Uten Tittel';
    const text = snippetTextInput.value;
    
    if (text.trim() && activeCategoryId) {
        const editId = editingSnippetId.value;
        if (editId) {
            // Edit existing
            const snippet = appData.snippets.find(s => s.id === editId);
            if (snippet) {
                snippet.title = title;
                snippet.text = text;
            }
        } else {
            // Add new
            const newSnippet = { id: generateId(), categoryId: activeCategoryId, title, text };
            appData.snippets.push(newSnippet);
        }
        
        saveData().then(() => {
            renderSnippets();
            snippetModal.classList.remove('active');
            snippetTitleInput.value = '';
            snippetTextInput.value = '';
            editingSnippetId.value = '';
        });
    } else {
        alert("Tekstfeltet kan ikke være helt tomt.");
    }
};

categoryNameInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') document.getElementById('save-category-btn').click();
});

// Initialize
initApp();
