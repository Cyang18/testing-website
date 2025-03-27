import { useState } from "react";
import { Button } from "react-bootstrap";

const FullScreenInfo = ({
  location,
  isOpen,
  onClose,
}: {
  location: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (location === null || isOpen === false) return null;

  const [showVideo, setShowVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);

  const handleImageClick = () => {
    if (location.videoUrl) {
      setShowVideo(true);
    }
  };

  const toggleAudio = () => {
    setPlayAudio((prev) => !prev);
  };

  const getYouTubeEmbedUrl = (videoUrl: string) => {
    const videoId = videoUrl.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0`;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh", 
        width: "100vw",
        backgroundColor: "#2C3930",
        color: "#DCD7C9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        overflowY: "auto", 
        padding: "20px", 
        zIndex: 1000,
      }}
    >
      <h1>{location.title}</h1>
      <h2>
        {location.denainaName ?? "No Dena'ina Name available."} -{" "}
        {location.denainaMeaning ?? "No Dena'ina Meaning available."}
        {location.videoUrl && (
          <button
            onClick={toggleAudio}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              fontSize: "16px",
              backgroundColor: "#66785F",
              color: "White",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {playAudio ? "Pause Audio" : "Play Audio"}
          </button>
        )}
      </h2>

      <p style={{ marginLeft: "5%", marginRight: "5%", marginTop: "1%" }}>
        {location.description ?? "No description found."} <br></br>
        <br></br> {location.culture ?? "No cultural description found."}
      </p>

      {playAudio && location.audioUrl && (
        <iframe
          width="0"
          height="0"
          src={getYouTubeEmbedUrl(location.audioUrl)}
          title={`${location.title} Audio`}
          frameBorder="0"
          allow="autoplay"
          style={{ display: "none" }}
        />
      )}

      {showVideo ? (
        <iframe
          width="80%"
          height="300"
          src={getYouTubeEmbedUrl(location.videoUrl)}
          title={location.title}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : location.imageUrl ? (
        <img
          src={location.imageUrl}
          alt={location.title}
          style={{
            width: "80%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            cursor: location.videoUrl ? "pointer" : "default",
          }}
          onClick={handleImageClick}
        />
      ) : (
        <p>No media available.</p>
      )}

      <Button
        variant="success"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10pt",
          backgroundColor: "grey",
          borderColor: "grey",
        }}
      >
        &#x2715;
      </Button>
    </div>
  );
};

export default FullScreenInfo;
