import React, { useEffect, useRef } from "react";

// Same Client View approach as the host side, joined as attendee (role 0).
// Renders the full native Zoom UI, staying on OUR domain the whole time.
const ZoomViewerEmbed = ({ meetingConfig, displayName }) => {
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const joinMeeting = async () => {
      const { ZoomMtg } = await import("@zoom/meetingsdk");

      await import("@zoom/meetingsdk/dist/css/bootstrap.css");
      await import("@zoom/meetingsdk/dist/css/react-select.css");

      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.9.0/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      ZoomMtg.i18n.load("en-US");
      ZoomMtg.i18n.reload("en-US");

      const zmmtgRoot = document.getElementById("zmmtg-root");
      if (zmmtgRoot) zmmtgRoot.style.display = "block";

      ZoomMtg.init({
        leaveUrl: window.location.href,
        patchJsMedia: true,
        success: () => {
          ZoomMtg.join({
            sdkKey: meetingConfig.sdkKey,
            signature: meetingConfig.signature,
            meetingNumber: meetingConfig.meetingNumber,
            passWord: meetingConfig.password,
            userName: displayName || "Viewer",
            success: () => console.log("Joined as viewer successfully"),
            error: (err) => console.error("Zoom join error:", err),
          });
        },
        error: (err) => console.error("Zoom init error:", err),
      });
    };

    joinMeeting();
  }, [meetingConfig, displayName]);

  return null;
};

export default ZoomViewerEmbed;