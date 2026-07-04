// 📄 presence.js - පොදු Online Tracking කෝඩ් එක
document.addEventListener("DOMContentLoaded", function () {
    // Firebase දැනටමත් ලෝඩ් වෙලාද කියලා චෙක් කිරීම
    if (typeof firebase !== 'undefined' && firebase.database) {
        const database = firebase.database();
        
        // LocalStorage එකෙන් ළමයාගේ නම සහ ID එක ගැනීම
        const studentName = localStorage.getItem("studentName") || "Anonymous Student";
        const studentId = localStorage.getItem("studentId") || "ID_" + Date.now();

        const myPresenceRef = database.ref(`online_users/${studentId}`);

        // 💓 Heartbeat සිග්නල් එක යවන Function එක
        function sendHeartbeat() {
            myPresenceRef.set({
                name: studentName,
                last_active: firebase.database.ServerValue.TIMESTAMP
            });
        }

        // මුලින්ම පේජ් එකට ආපු ගමන් සිග්නල් එකක් යවනවා
        sendHeartbeat();

        // හැම තත්පර 10කට සැරයක්ම ඔටෝමැටිකව සිග්නල් එක යවනවා
        const heartbeatInterval = setInterval(sendHeartbeat, 10000);

        // Tab එක වැහුවොත් ඩේටාබේස් එකෙන් මැකෙන්න දාන එක
        myPresenceRef.onDisconnect().remove();
    }
});