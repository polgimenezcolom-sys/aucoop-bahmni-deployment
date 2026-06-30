Bahmni.Registration.customValidator = {
    "age.days": {
        method: function (name, value) {
            return value >= 0;
        },
        errorMessage: "REGISTRATION_AGE_ERROR_KEY"
    },
    "Telephone Number": {
        method: function (name, value, personAttributeDetails) {
            return value && value.length> 6;
        },
        errorMessage: "REGISTRATION_TELEPHONE_NUMBER_ERROR_KEY"
    },
    "caste": {
        method: function (name, value, personAttributeDetails) {
            return value.match(/^\w+$/);
        },
        errorMessage: "REGISTRATION_CASTE_TEXT_ERROR_KEY"
    }
};

// ============================================================================
// ST. JOHN OF GOD HOSPITAL (SJD) - REGISTRATION APP CUSTOM ACTIONS & POLLERS
//
// THE DOM POLLER PARADIGM:
// Because Bahmni is a Single Page Application (SPA) driven by AngularJS, navigation
// does not trigger full page reloads. AngularJS dynamically destroys and recreates
// DOM templates when switching views (e.g., searching for a patient vs. viewing
// patient details).
//
// Since we cannot hook into AngularJS's internal routing without modifying compiled
// source code, we use a DOM Polling approach (runPoller executed via setInterval every 1s).
// This poller detects the current URL state (hash route) and safely injects custom UI
// controls (like the 'Close Visit' and 'Show All Patients' buttons) whenever their target
// parent container elements appear in the DOM.
// ============================================================================
(function() {
    var activeVisit = null;

    function handleCloseVisit(visitUuid) {
        if (!confirm("Are you sure you want to close this patient's active visit?")) {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/openmrs/ws/rest/v1/visit/" + visitUuid, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 204) {
                    window.location.href = "/bahmni/home/index.html#/dashboard";
                } else {
                    alert("Failed to close visit. Error: " + xhr.responseText);
                }
            }
        };
        xhr.send(JSON.stringify({ stopDatetime: new Date().toISOString() }));
    }

    function checkActiveVisit(patientUuid) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/openmrs/ws/rest/v1/visit?patient=" + patientUuid + "&includeInactive=false", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    var res = JSON.parse(xhr.responseText);
                    if (res && res.results && res.results.length > 0) {
                        activeVisit = res.results[0];
                        injectCloseVisitButton(activeVisit.uuid);
                    }
                } catch (e) {
                    console.error("Error parsing active visit response:", e);
                }
            }
        };
        xhr.send();
    }

    function injectCloseVisitButton(visitUuid) {
        var enterVisitBtn = Array.from(document.querySelectorAll('a, button, span')).find(function(el) {
            return el.textContent.trim() === 'Enter Visit Details';
        });
        
        if (enterVisitBtn && !document.getElementById('sjd-close-visit-btn')) {
            var container = enterVisitBtn.parentNode;
            var closeBtn = document.createElement('button');
            closeBtn.id = 'sjd-close-visit-btn';
            closeBtn.type = 'button';
            closeBtn.textContent = 'Close Visit';
            closeBtn.style.backgroundColor = '#d32f2f'; // Material red
            closeBtn.style.color = '#ffffff';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '4px';
            closeBtn.style.padding = '8px 16px';
            closeBtn.style.marginLeft = '10px';
            closeBtn.style.fontWeight = 'bold';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.transition = 'background-color 0.2s';
            
            closeBtn.addEventListener('mouseover', function() {
                closeBtn.style.backgroundColor = '#b71c1c';
            });
            closeBtn.addEventListener('mouseout', function() {
                closeBtn.style.backgroundColor = '#d32f2f';
            });
            
            closeBtn.onclick = function() {
                handleCloseVisit(visitUuid);
            };
            
            container.insertBefore(closeBtn, enterVisitBtn); // Place it next to Enter Visit Details
        }
    }

    function injectShowAllBtn() {
        if (window.location.hash.indexOf('/search') !== -1) {
            var nameInput = document.getElementById('name');
            if (nameInput) {
                var form = nameInput.form || nameInput.closest('form');
                var searchBtn = form ? form.querySelector('button[type="submit"]') : null;
                
                if (searchBtn && !document.getElementById('sjd-show-all-btn')) {
                    var btnContainer = searchBtn.parentNode;
                    var showAllBtn = document.createElement('button');
                    showAllBtn.id = 'sjd-show-all-btn';
                    showAllBtn.type = 'button';
                    showAllBtn.textContent = 'Show All Patients';
                    showAllBtn.style.backgroundColor = '#0b3583'; // SJD Blue
                    showAllBtn.style.color = '#ffffff';
                    showAllBtn.style.border = 'none';
                    showAllBtn.style.borderRadius = '4px';
                    showAllBtn.style.padding = '8px 16px';
                    showAllBtn.style.marginLeft = '10px';
                    showAllBtn.style.fontWeight = 'bold';
                    showAllBtn.style.cursor = 'pointer';
                    showAllBtn.style.transition = 'background-color 0.2s';
                    
                    showAllBtn.addEventListener('mouseover', function() {
                        showAllBtn.style.backgroundColor = '#07245c';
                    });
                    showAllBtn.addEventListener('mouseout', function() {
                        showAllBtn.style.backgroundColor = '#0b3583';
                    });
                    
                    showAllBtn.onclick = function() {
                        nameInput.value = '%';
                        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
                        nameInput.dispatchEvent(new Event('change', { bubbles: true }));
                        setTimeout(function() {
                            searchBtn.click();
                        }, 50);
                    };
                    
                    btnContainer.appendChild(showAllBtn);
                }
            }
        }
    }

    function runPoller() {
        // 1. Check patient page (edit/view)
        var match = window.location.hash.match(/\/patient\/([a-f0-9\-]{36})/i);
        if (match) {
            var patientUuid = match[1];
            if (!document.getElementById('sjd-close-visit-btn')) {
                checkActiveVisit(patientUuid);
            }
        } else {
            var oldBtn = document.getElementById('sjd-close-visit-btn');
            if (oldBtn) oldBtn.remove();
        }

        // 2. Check search page
        injectShowAllBtn();

        // 3. Inject SJD Styles and Branding
        injectSJDStyleAndBranding();
    }

    function injectSJDStyleAndBranding() {
        // CSS Style Injection
        if (!document.getElementById('sjd-phase1-cleanup')) {
            var style = document.createElement('style');
            style.id = 'sjd-phase1-cleanup';
            style.textContent = 
                "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); " +
                "body, input, button, select, textarea, .opd-header, .patient-dashboard, .patient-name, .form-field { " +
                "  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; " +
                "} " +
                "header, .opd-header, .opd-header-top, .reg-header, .opd-header-bottom, .header { " +
                "  background-color: #0b3583 !important; " +
                "  background-image: none !important; " +
                "  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important; " +
                "} " +
                "header a:not(.btn):not(.button):not(.confirm), " +
                "header span:not(.btn):not(.button):not(.confirm), " +
                "header i, " +
                ".opd-header a:not(.btn):not(.button):not(.confirm), " +
                ".opd-header span:not(.btn):not(.button):not(.confirm), " +
                ".opd-header i, " +
                ".reg-header a:not(.btn):not(.button):not(.confirm), " +
                ".reg-header span:not(.btn):not(.button):not(.confirm), " +
                ".reg-header i { " +
                "  color: #ffffff !important; " +
                "} " +
                "header a:not(.btn):not(.button):not(.confirm):hover, " +
                ".opd-header a:not(.btn):not(.button):not(.confirm):hover, " +
                ".reg-header a:not(.btn):not(.button):not(.confirm):hover { " +
                "  color: #cbd5e1 !important; " +
                "} " +
                ".opd-header-bottom button, .opd-header-bottom a.back-btn, .reg-header button, .reg-header a.back-btn { " +
                "  background: rgba(255, 255, 255, 0.15) !important; " +
                "  border: 1px solid rgba(255, 255, 255, 0.25) !important; " +
                "  border-radius: 6px !important; " +
                "  color: #ffffff !important; " +
                "} " +
                ".opd-header-bottom button:hover, .opd-header-bottom a.back-btn:hover, .reg-header button:hover, .reg-header a.back-btn:hover { " +
                "  background: rgba(255, 255, 255, 0.25) !important; " +
                "} " +
                "button, .button, input[type='button'], input[type='submit'] { " +
                "  border-radius: 6px !important; " +
                "  padding: 8px 16px !important; " +
                "  font-weight: 500 !important; " +
                "  transition: all 0.2s ease !important; " +
                "} " +
                "button.confirm, .button.confirm, input[type='submit'], button.save-btn { " +
                "  background-color: #2e7d32 !important; " +
                "  color: #ffffff !important; " +
                "  border: none !important; " +
                "} " +
                "button.confirm:hover, .button.confirm:hover, button.save-btn:hover { " +
                "  background-color: #1b5e20 !important; " +
                "}";
            document.head.appendChild(style);
        }

        // Branding logo injection
        var header = document.querySelector('.opd-header-top') || document.querySelector('.reg-header') || document.querySelector('#consultation-header') || document.querySelector('header');
        if (header && !document.getElementById('sjd-header-brand')) {
            var brandDiv = document.createElement('div');
            brandDiv.id = 'sjd-header-brand';
            brandDiv.style.display = 'inline-flex';
            brandDiv.style.alignItems = 'center';
            brandDiv.style.marginRight = '20px';
            brandDiv.style.float = 'left';
            brandDiv.style.height = '100%';
            brandDiv.style.padding = '5px 15px';
            
            var homeLink = document.createElement('a');
            homeLink.href = '/';
            homeLink.style.display = 'inline-flex';
            homeLink.style.alignItems = 'center';
            homeLink.style.textDecoration = 'none';
            
            var logoImg = document.createElement('img');
            logoImg.src = '/bahmni/images/sjd-logo.svg';
            logoImg.style.height = '32px';
            logoImg.style.marginRight = '12px';
            logoImg.style.verticalAlign = 'middle';
            
            var textSpan = document.createElement('span');
            textSpan.innerHTML = 'St John of God Hospital <small style="color: #cbd5e1; font-size: 11px; font-weight: 500; margin-left: 6px;">Sierra Leone</small>';
            textSpan.style.color = '#ffffff';
            textSpan.style.fontWeight = '700';
            textSpan.style.fontSize = '16px';
            textSpan.style.fontFamily = "'Inter', sans-serif";
            textSpan.style.verticalAlign = 'middle';
            textSpan.style.whiteSpace = 'nowrap';
            
            homeLink.appendChild(logoImg);
            homeLink.appendChild(textSpan);
            brandDiv.appendChild(homeLink);
            
            header.insertBefore(brandDiv, header.firstChild);
        }
    }

    setInterval(runPoller, 1000);
})();
