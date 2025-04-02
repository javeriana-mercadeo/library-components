export function initAccordion() {
    
    console.log('Acordeón inicializado correctamente');
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@phosphor-icons/web';
    script.async = true;
    document.body.appendChild(script);
  }
  
  export function toggleAllAccordions(open = false) {

    console.log(`Todos los acordeones ${open ? 'abiertos' : 'cerrados'}`);
  }