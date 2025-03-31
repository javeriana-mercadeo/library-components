import React from "react";
import "./styles.scss"; 

const VideoHelp = () => {
  return (
    <section className="videoHelp">
      <div className="videoContainer">
        {/* Video de YouTube */}
        <div className="videoLocal">
        <iframe 
          className="videoFrame"
          src="https://www.youtube.com/embed/oAO9wPSN0Gk?autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
      ></iframe>

        </div>

      </div>
    </section>
  );
};

export default VideoHelp;
