import React, { useEffect, useRef } from "react";

// Same embedded approach as the influencer's host view, but joins with
// role 0 (attendee/viewer). Renders fully inside our own page.
const ZoomViewerEmbed = ({ meetingConfig, displayName }) => {
  const containerRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const joinMeeting = async () => {
      const { default: ZoomMtgEmbedded } = await import("@zoom/meetingsdk/embedded");

      const client = ZoomMtgEmbedded.createClient();
      clientRef.current = client;

      if (!isMounted || !containerRef.current) return;

      await client.init({
        zoomAppRoot: containerRef.current,
        language: "en-US",
        customize: {
          video: { isResizable: true, viewSizes: { default: { width: 1000, height: 600 } } },
        },
      });

      await client.join({
        sdkKey: meetingConfig.sdkKey,
        signature: meetingConfig.signature,
        meetingNumber: meetingConfig.meetingNumber,
        password: meetingConfig.password,
        userName: displayName || "Viewer",
      });
    };

    joinMeeting().catch((err) => {
      console.error("Failed to join live stream:", err);
    });

    return () => {
      isMounted = false;
      if (clientRef.current) {
        clientRef.current.leaveMeeting().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingConfig]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-black">
      <div ref={containerRef} id="zmmtg-root-container" className="w-full h-full" />
    </div>
  );
};

export default ZoomViewerEmbed;
