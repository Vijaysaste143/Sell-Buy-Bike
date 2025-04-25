document.addEventListener('DOMContentLoaded', () => {
    const statusIndicator = document.querySelector('.status-indicator');
    const steps = document.querySelectorAll('.step');

    let currentStep = 0;
    const updateStatus = () => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('completed');
            statusIndicator.style.width = `${(currentStep + 1) / steps.length * 100}%`;
            currentStep++;
            setTimeout(updateStatus, 2000); 
        }
    };

    updateStatus();
});
