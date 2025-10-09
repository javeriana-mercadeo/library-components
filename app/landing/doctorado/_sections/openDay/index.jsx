export default function OpenDay() {
  return (
    <div className='event-countdown'>
      <div id='countdown' className='countdown-container'>
        <div className='time-unit'>
          <div className='time-label'>Días</div>
          <div id='days' className='time-number'>
            05
          </div>
        </div>

        <div className='separator'>:</div>

        <div className='time-unit'>
          <div className='time-label'>Horas</div>
          <div id='hours' className='time-number'>
            28
          </div>
        </div>

        <div className='separator'>:</div>

        <div className='time-unit'>
          <div className='time-label'>Minutos</div>
          <div id='minutes' className='time-number'>
            35
          </div>
        </div>

        <div className='separator'>:</div>

        <div className='time-unit'>
          <div className='time-label'>Segundos</div>
          <div id='seconds' className='time-number'>
            40
          </div>
        </div>
      </div>
    </div>
  )
}
