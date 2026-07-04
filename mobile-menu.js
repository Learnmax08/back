// ==========================================================================
// 📱 MOBILE RESPONSIVE RADIAL MENU FUNCTIONALITY (GLOBAL SCOPE)
// ==========================================================================
window.toggleMobileMenu = function() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const sideMenu = document.getElementById('sider__menu');
    
    if(toggleBtn && sideMenu) {
        toggleBtn.classList.toggle('active');
        sideMenu.classList.toggle('mobile-active');
    }
}

// මෙනු එකෙන් පිටත click කල විට auto-close වෙන්න
document.addEventListener('click', function(event) {
    const sideMenu = document.getElementById('sider__menu');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    
    if (window.innerWidth <= 991 && sideMenu && sideMenu.classList.contains('mobile-active')) {
        if (!sideMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
            window.toggleMobileMenu();
        }
    }
});