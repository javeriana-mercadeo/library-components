import './styles.scss'

import React from 'react'

const VideoHelp = () => {
  return (
    <section className="videoHelp">
      <div className="videoContainer">
        {/* Video de YouTube */}
        <div className="videoLocal">
          <iframe
            className="videoFrame"
            src="https://www.youtube.com/embed/oAO9wPSN0Gk"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
      </div>
    </section>
  )
}

export default VideoHelp
