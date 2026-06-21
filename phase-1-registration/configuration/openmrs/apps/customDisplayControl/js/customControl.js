// ============================================================
// SJD HOSPITAL - Phase 1 Custom UI
// Header Cleanup & Branding ONLY (no CSS theme)
// ============================================================

// 1. PAGE TITLE OVERRIDES
(function() {
    var titles = {
        '/bahmni/home': 'SJD Hospital',
        '/bahmni/clinical': 'SJD Hospital — Clinical',
        '/bahmni/registration': 'SJD Hospital — Registration',
        '/bahmni/admin': 'SJD Hospital — Admin'
    };
    var path = window.location.pathname;
    for (var key in titles) {
        if (path.indexOf(key) === 0) {
            document.title = titles[key];
            break;
        }
    }
})();

// 2. HIDE UNNECESSARY UI ELEMENTS
(function() {
    var style = document.createElement('style');
    style.id = 'sjd-phase1-cleanup';
    style.textContent = 
        /* 0. Import Google Font */
        "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'); " +

        /* 1. Global Font Override */
        "body, input, button, select, textarea, .opd-header, .patient-dashboard, .patient-name, .form-field { " +
        "  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; " +
        "} " +

        /* 2. Top Header Branding (SJD Dark Blue) */
        "header, .opd-header, .opd-header-top, .registration-header { " +
        "  background-color: #0b3583 !important; " +
        "  background-image: none !important; " +
        "  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important; " +
        "} " +
        ".opd-header-top a, .opd-header-bottom a, header a, .registration-header a, .opd-header-top span, .opd-header-bottom span { " +
        "  color: #ffffff !important; " +
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
        ".opd-header-bottom button, .opd-header-bottom a.back-btn { " +
        "  background: rgba(255, 255, 255, 0.15) !important; " +
        "  border: 1px solid rgba(255, 255, 255, 0.25) !important; " +
        "  border-radius: 6px !important; " +
        "  color: #ffffff !important; " +
        "} " +
        ".opd-header-bottom button:hover, .opd-header-bottom a.back-btn:hover { " +
        "  background: rgba(255, 255, 255, 0.25) !important; " +
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

    if (!document.getElementById('sjd-phase1-cleanup')) {
        document.head.appendChild(style);
    }
})();

// 3. REPLACE "POWERED BY BAHMNI" WITH HOSPITAL FOOTER
(function() {
    function replaceFooter() {
        var pwrBy = document.querySelector('.power-by');
        if (pwrBy && pwrBy.innerHTML.indexOf('St John of God') === -1) {
            pwrBy.innerHTML = '<span style="color:#888;font-size:12px;">St John of God Hospital &mdash; Lunsar, Sierra Leone</span>';
            pwrBy.style.display = 'block';
            pwrBy.style.textAlign = 'center';
            pwrBy.style.padding = '10px';
        }
    }
    // Poll to handle dynamic DOM changes in Single Page App (SPA)
    setInterval(replaceFooter, 1000);
    replaceFooter();
})();

// 4. DYNAMIC FAVICON OVERRIDE
(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = '/bahmni/images/sjd-logo.svg';
    document.getElementsByTagName('head')[0].appendChild(link);
})();

