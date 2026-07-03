// ==========================================
// 1. APEXCHARTS GRAPH (ප්‍රස්තාරය) සකස් කිරීම
// ==========================================
var chartOptions = {
    series: [{
        name: 'Work Hours : ',
        data: [0, 0, 0, 0, 0, 0, 0] 
    }],
    chart: {
        type: 'area',
        height: 215,
        toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] }
    },
    labels: ['08, Jun', '09, Jun', '10, Jun', '11, Jun', '12, Jun', '13, Jun', '14, Jun'],
    colors: ['#1a9fff']
};

var workChart = new ApexCharts(document.getElementById("worktime-chart"), chartOptions);
workChart.render();


// ==========================================
// 2. පිටුව LOAD වෙද්දී PROFILE දත්ත DASHBOARD එකට ගැනීම
// ==========================================
window.addEventListener('load', function() {
    
    // 🔗 ඔයාගේ profile.html එකෙන් සේව් කරන Keys ම මෙතනට ගත්තා
    var savedName = localStorage.getItem('student_name') || "Nimsara Damsith";
    var savedYear = localStorage.getItem('student_exam_year') || "2027";

    var nameElement = document.getElementById('dash_student_name');
    var yearElement = document.getElementById('dash_exam_year');

    // Dashboard එකේ HTML එකට දත්ත දමනවා
    if(nameElement) nameElement.innerText = "Hi, " + savedName;
    
    if(yearElement) {
        // අවුරුද්ද අගට " A/L" කැබැල්ල එකතු කර ලස්සනට පෙන්වීමට
        yearElement.innerText = savedYear + " A/L"; 
    }


    // ---- WORK HOURS පෙන්වීම ----
    var savedTotalHours = localStorage.getItem('total_work_hours') || "0 Hours";
    var hoursDisplay = document.querySelector('.card-body h2'); 
    
    if(hoursDisplay && localStorage.getItem('total_work_hours')) {
        hoursDisplay.innerText = savedTotalHours;
    }
    
    var savedChartData = localStorage.getItem('chart_work_data');
    if(savedChartData) {
        workChart.updateSeries([{ data: JSON.parse(savedChartData) }]);
    }
});


// ==========================================
// 3. TODAY WORK TIME RECORD කිරීම
// ==========================================
var recordBtn = document.getElementById('submit_today_work_time_btn');

if(recordBtn) {
    recordBtn.addEventListener('click', function() {
        var selectedRadio = document.querySelector('input[name="work_time"]:checked');
        
        if(!selectedRadio) {
            alert('කරුණාකර වැඩ කරපු පැය ගණනක් තෝරන්න!');
            return;
        }

        var workValue = selectedRadio.value;
        var hoursToAdd = 0;
        var labelText = "0 Hours";

        switch(workValue) {
            case '3low': hoursToAdd = 2; labelText = "2 Hours"; break;
            case '3to5': hoursToAdd = 4; labelText = "4 Hours"; break;
            case '5to7': hoursToAdd = 6; labelText = "6 Hours"; break;
            case '7to9': hoursToAdd = 8; labelText = "8 Hours"; break;
            case '9to11': hoursToAdd = 10; labelText = "10 Hours"; break;
            case '11to13': hoursToAdd = 12; labelText = "12 Hours"; break;
            case '13plus': hoursToAdd = 14; labelText = "14 Hours"; break;
        }

        var hoursDisplay = document.querySelector('.card-body h2');
        if(hoursDisplay) {
            hoursDisplay.innerText = labelText;
            localStorage.setItem('total_work_hours', labelText);
        }

        var currentData = [0, 0, 0, 0, 0, 0, hoursToAdd]; 
        workChart.updateSeries([{ data: currentData }]);
        localStorage.setItem('chart_work_data', JSON.stringify(currentData));

        document.querySelector('.today_worktime_selections').style.display = 'none';
        document.getElementById('today_work_submit_anim').style.display = 'block';
        document.getElementById('today_work_submit_alert').innerText = "ඔබේ දත්ත සාර්ථකව සටහන් කරගන්නා ලදී! ❤️";

        setTimeout(function() {
            var myModalEl = document.getElementById('today_works-model');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            if(modal) modal.hide();
            
            document.querySelector('.today_worktime_selections').style.display = 'block';
            document.getElementById('today_work_submit_anim').style.display = 'none';
        }, 2000);
    });
}