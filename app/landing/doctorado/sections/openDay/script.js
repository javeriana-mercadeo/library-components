class EventCountdown {
    constructor(targetDate, containerId = 'countdown') {
        this.targetDate = new Date(targetDate).getTime();
        this.container = document.getElementById(containerId);
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.interval = null;
        this.init();
    }

    init() {
        if (isNaN(this.targetDate)) {
            console.error('Fecha de evento no válida');
            return;
        }
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.showEventEnded();
            return;
        }

        const timeLeft = this.calculateTimeLeft(distance);
        this.updateDisplay(timeLeft);
    }

    calculateTimeLeft(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }

    updateDisplay(timeLeft) {
        Object.keys(timeLeft).forEach(unit => {
            const element = this.elements[unit];
            const newValue = timeLeft[unit].toString().padStart(2, '0');
            
            // Añade animación de pulso solo cuando el valor cambia
            if (element.textContent !== newValue) {
                element.textContent = newValue;
                element.classList.add('pulse');
                setTimeout(() => element.classList.remove('pulse'), 500);
            }
        });
    }

    showEventEnded() {
        clearInterval(this.interval);
        this.container.innerHTML = '<div class="event-ended">¡El evento ha comenzado!</div>';
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    updateTargetDate(newDate) {
        this.targetDate = new Date(newDate).getTime();
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.init();
    }
}

// Inicializar el contador con fecha de ejemplo
const eventDate = '2025-12-31 23:59:59';
const countdown = new EventCountdown(eventDate);

// Función global para actualizar desde Liferay
window.updateEventCountdown = function(newDate) {
    countdown.updateTargetDate(newDate);
};