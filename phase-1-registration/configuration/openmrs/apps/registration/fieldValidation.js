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

// ============================================================
// SJD HOSPITAL - Custom Actions & DOM Pollers
// ============================================================
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
                    alert("Visit closed successfully!");
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
            
            closeBtn.onclick = function() {
                handleCloseVisit(visitUuid);
            };
            
            container.insertBefore(closeBtn, enterVisitBtn); // Place it next to Enter Visit Details
        }
    }

    function injectShowAllBtn() {
        if (window.location.hash.indexOf('/search') !== -1) {
            var nameForm = document.querySelector('form[name="searchByNameForm"]');
            if (nameForm) {
                var nameInput = nameForm.querySelector('#name');
                var searchBtn = nameForm.querySelector('button[type="submit"]');
                
                if (nameInput && searchBtn && !document.getElementById('sjd-show-all-btn')) {
                    var showAllBtn = document.createElement('button');
                    showAllBtn.id = 'sjd-show-all-btn';
                    showAllBtn.type = 'button';
                    showAllBtn.textContent = 'Show All Patients';
                    
                    showAllBtn.onclick = function() {
                        nameInput.value = '%';
                        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
                        nameInput.dispatchEvent(new Event('change', { bubbles: true }));
                        setTimeout(function() {
                            searchBtn.click();
                        }, 50);
                    };
                    
                    searchBtn.parentNode.appendChild(showAllBtn);
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
                /* 0. Import Google Font */
                "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); " +

                /* 1. Global Font Override */
                "body, input, button, select, textarea, .opd-header, .patient-dashboard, .patient-name, .form-field { " +
                "  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; " +
                "} " +

                "#sjd-close-visit-btn { " +
                "  background: #d32f2f !important; " +
                "  color: #ffffff !important; " +
                "  border: none !important; " +
                "  border-radius: 6px !important; " +
                "  padding: 8px 16px !important; " +
                "  font-weight: bold !important; " +
                "  transition: background 0.2s ease !important; " +
                "} " +
                "#sjd-close-visit-btn:hover { " +
                "  background: #b71c1c !important; " +
                "} " +
                "#sjd-show-all-btn { " +
                "  background: #0b3583 !important; " +
                "  color: #ffffff !important; " +
                "  border: none !important; " +
                "  border-radius: 6px !important; " +
                "  padding: 8px 16px !important; " +
                "  font-weight: bold !important; " +
                "  margin-left: 10px !important; " +
                "  transition: background 0.2s ease !important; " +
                "} " +
                "#sjd-show-all-btn:hover { " +
                "  background: #07245c !important; " +
                "} " +
                "#sjd-header-brand img { " +
                "  filter: brightness(0) invert(1) !important; " +
                "  display: inline-block !important; " +
                "  vertical-align: middle !important; " +
                "} " +
                ".clint-logo-wrapper { " +
                "  text-align: center !important; " +
                "  display: block !important; " +
                "  float: none !important; " +
                "} " +
                ".clint-logo-wrapper .implementor-logo { " +
                "  display: inline-block !important; " +
                "  float: none !important; " +
                "  margin: 0 auto !important; " +
                "} " +
                ".clint-logo-wrapper .title_text, .clint-logo-wrapper .title-text, .title_text, .title-text { " +
                "  display: none !important; " +
                "} " +

                /* 3. Dashboard Layout Cards */
                ".dashboard-section, .patient-dashboard .section-container, .section, .visit-page .section-container { " +
                "  background: #ffffff !important; " +
                "  border-radius: 8px !important; " +
                "  border: 1px solid #eef2f7 !important; " +
                "  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important; " +
                "  padding: 16px !important; " +
                "  margin-bottom: 16px !important; " +
                "  transition: transform 0.2s ease, box-shadow 0.2s ease !important; " +
                "} " +
                ".dashboard-section:hover { " +
                "  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06) !important; " +
                "} " +

                /* 4. Rounded and Glowing Form Inputs */
                "input[type='text'], input[type='password'], input[type='number'], select, textarea { " +
                "  padding: 8px 12px !important; " +
                "  border: 1px solid #dcdfe6 !important; " +
                "  border-radius: 6px !important; " +
                "  font-size: 14px !important; " +
                "  transition: all 0.2s ease !important; " +
                "} " +
                "input[type='text']:focus, input[type='password']:focus, input[type='number']:focus, select:focus, textarea:focus { " +
                "  outline: none !important; " +
                "  border-color: #0b3583 !important; " +
                "  box-shadow: 0 0 0 3px rgba(11, 53, 131, 0.15) !important; " +
                "} " +

                /* 5. Modern Button Theme */
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
                "} " +

                /* 6. Clean Table Styling */
                "table { " +
                "  border-collapse: separate !important; " +
                "  border-spacing: 0 !important; " +
                "  width: 100% !important; " +
                "} " +
                "th { " +
                "  background-color: #f5f7fa !important; " +
                "  color: #4a5568 !important; " +
                "  font-weight: 600 !important; " +
                "  text-transform: uppercase !important; " +
                "  font-size: 11px !important; " +
                "  letter-spacing: 0.5px !important; " +
                "  padding: 12px 16px !important; " +
                "  border-bottom: 2px solid #e2e8f0 !important; " +
                "} " +
                "td { " +
                "  padding: 12px 16px !important; " +
                "  border-bottom: 1px solid #edf2f7 !important; " +
                "  color: #2d3748 !important; " +
                "} " +
                "tr:hover td { " +
                "  background-color: #f7fafc !important; " +
                "} " +

                /* 7. Hide print button, print list, bed management, teleconsult, patient doc, and retro date */
                ".print-list-wrapper," +
                "button.dialog-button-group.print," +
                ".dashboard-header-right-wrapper button.dialog-button-group[accesskey] { display: none !important; } " +
                ".opd-header-bottom a.back-btn[title*='Bed']," +
                ".opd-header-bottom a.back-btn .fa-bed," +
                "a.back-btn:has(.fa-bed) { display: none !important; } " +
                "a.btn--right.btn--success { display: none !important; } " +
                ".start-tele-consultation { display: none !important; } " +
                ".btn-patient-doc { display: none !important; } " +
                ".retro-date-widget-wrapper, .dashboard-date-picker { display: none !important; } " +
                ".power-by { display: none !important; } " +
                ".header-tabs li:nth-child(2), .header-tabs li:nth-child(3), .header-tabs li.new-tab { display: none !important; } " +
                ".header-scrollable-tabs li:nth-child(2), .header-scrollable-tabs li:nth-child(3) { display: none !important; }";
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
            logoImg.style.width = '34px';
            logoImg.style.marginRight = '0px';
            logoImg.style.verticalAlign = 'middle';
            
            homeLink.appendChild(logoImg);
            brandDiv.appendChild(homeLink);
            
            header.insertBefore(brandDiv, header.firstChild);
        }
    }

    setInterval(runPoller, 1000);

    // Redirect to dashboard on "Start xxx Visit" click
    document.addEventListener('click', function(e) {
        var target = e.target;
        while (target && target !== document.body) {
            if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                var text = target.textContent || '';
                if (text.trim().match(/^Start .* Visit$/i)) {
                    window._sjdStartingVisit = true;
                    // Auto-reset flag after 5 seconds in case the request fails
                    setTimeout(function() {
                        window._sjdStartingVisit = false;
                    }, 5000);
                }
                break;
            }
            target = target.parentNode;
        }
    }, true);

    (function() {
        var open = XMLHttpRequest.prototype.open;
        var send = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url) {
            this._method = method;
            this._url = url;
            return open.apply(this, arguments);
        };
        
        XMLHttpRequest.prototype.send = function() {
            var self = this;
            var onreadystatechange = this.onreadystatechange;
            this.onreadystatechange = function() {
                if (self.readyState === 4) {
                    if (self.status >= 200 && self.status < 300) {
                        if (window._sjdStartingVisit && self._method === 'POST' && 
                            (self._url.indexOf('/ws/rest/v1/visit') !== -1 || self._url.indexOf('/ws/rest/v1/bahmnicore/visit') !== -1)) {
                            
                            window._sjdStartingVisit = false;
                            setTimeout(function() {
                                window.location.href = "/bahmni/home/index.html#/dashboard";
                            }, 500);
                        }
                    }
                }
                if (onreadystatechange) {
                    return onreadystatechange.apply(this, arguments);
                }
            };
            return send.apply(this, arguments);
        };
    })();
})();
